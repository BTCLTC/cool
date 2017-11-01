var __mypicker = $.fn.datepicker;

$.fn.datepicker = function(options) {
    options.disableddates = options.disableddates || [];
    options.daterange = options.daterange || [];
    var oldOptions = jQuery.extend(true, {}, options);
    options.beforeShowDay= function(date, me){
        if (oldOptions.beforeShowDay){
            oldOptions.beforeShowDay(date, me);
        }
        var dd = options.disableddates.map( function(item) { return item.getTime(); } );
        var dr = options.daterange.map( function(item) { return item.getTime(); } );
        if($.inArray(date.getTime(), dd) != -1){
            return [false, '', ''];
        }
        if($.inArray(date.getTime(), dr) != -1){
            return [true, "ui-range-selected"];
        }
        return [true, '', ''];
    }
    options.onSelect = function(date, me){
        if (!options.dateFormat){
            options.dateFormat = "mm/dd/yy"
        }
        var d = $.datepicker.parseDate( options.dateFormat, date );
        if (oldOptions.onSelect){
            oldOptions.onSelect(date, me);
        }
        me.inline = true;
        var disabled = $.inArray(d.getTime(), options.disableddates.map( function(item) { return item.getTime(); } )) != -1;
        if (disabled){
            return;
        }
        if (options.ctrlKey){
            var result = $.grep(options.daterange, function(e){ return e.getTime() == d.getTime(); });
            if (result.length ==0){
                options.daterange.push(d);
            } else {
                options.daterange = $.grep(options.daterange, function(e){ return e.getTime() != d.getTime(); });
            }
        } else if(options.daterange.length == 0){
            options.daterange.push(d);
        } else {
            var nr = [];
            var max = new Date(Math.max.apply(Math, options.daterange));
            var min = new Date(Math.min.apply(Math, options.daterange));
            if (d > max){
                max = d;
            } else if (min > d) {
                max = min;
                min = d;
            } else {
                min = d;
            }
            for (var d1 = min; d1 <= max; d1.setDate(d1.getDate() + 1)) {
                if($.inArray(d1.getTime(), options.disableddates.map( function(item) { return item.getTime();})) == -1){
                    nr.push(new Date(d1));    
                }
            }
            options.daterange = nr;
        }
        var max = new Date(Math.max.apply(Math, options.daterange));
        var min = new Date(Math.min.apply(Math, options.daterange));
        $(this).val($.datepicker.formatDate( options.dateFormat, max, options ) + " - " + $.datepicker.formatDate( options.dateFormat, min, options ));
    }
    options.onClose = function(date, me){
        if (oldOptions.onClose){
            oldOptions.onClose(date, me);
        }
        me.inline = false;
    }
    
    __mypicker.apply(this, [options]);
    $(document).bind('keydown',function( event ){
        if (event.ctrlKey || event.metaKey){
            options.ctrlKey = event.ctrlKey || event.metaKey;
        }
    });
    $(document).bind('keyup',function( event ){
        options.ctrlKey = false;
    });

    //set the date range
    var $self = this;
    $self.getDateRange = function(){
        return options.daterange;
    }
    return this;
}