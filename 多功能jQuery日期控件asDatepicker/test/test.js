(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
     (value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
      */
    module('asDatepicker', {
        // This will run before each test in this module.
        setup: function() {
            this.$datepicker = $('.datepicker').asDatepicker();
            this.api = this.$datepicker.data('asDatepicker');
        }
    });

    test('method matchString', function(){

        this.api.update({
            min: '2013-10-1',
            max: '30'
        });

        equal(this.api._isSelectable('years', 2001), false, 'CHECK YEAR 2001');
        equal(this.api._isSelectable('years', 2013), true, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2014), true, 'CHECK YEAR 2014');
        equal(this.api._isSelectable('years', 2015), false, 'CHECK YEAR 2014');

        equal(this.api._isSelectable('months', 2013, 0), false, 'CHECK YEAR 2013 MONTH 1');
        equal(this.api._isSelectable('months', 2013, 9), true, 'CHECK YEAR 2013 MONTH 10');
        equal(this.api._isSelectable('months', 2014, 8), true, 'CHECK YEAR 2014 MONTH 9');
        equal(this.api._isSelectable('months', 2014, 11), false, 'CHECK YEAR 2014 MONTH 12');

        equal(this.api._isSelectable('days', 2013, 8, 1),false,'CHECK YEAR 2013 MONTH 9 DAY 1');
        equal(this.api._isSelectable('days', 2013, 10, 1),true,'CHECK YEAR 2013 MONTH 11 DAY 1');
        equal(this.api._isSelectable('days', 2014, 8, 20),true,'CHECK YEAR 2014 MONTH 9 DAY 20');
        equal(this.api._isSelectable('days', 2014, 10, 1),false,'CHECK YEAR 2014 MONTH 11 DAY 1');



        this.api.options = $.extend(this.api.options, {
            min: null,
            max: null,
            selectableDate: ['2014-2-1', {from: '2014-5-3', to: '2014-7-25'}, {from: 'today', to: 30}]
        });

        equal(this.api._isSelectable('years', 2013), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2014), true, 'CHECK YEAR 2014');
        equal(this.api._isSelectable('years', 2015), false, 'CHECK YEAR 2015');

        equal(this.api._isSelectable('months', 2013, 0), false, 'CHECK YEAR 2013 MONTH 1');
        equal(this.api._isSelectable('months', 2014, 1), true, 'CHECK YEAR 2014 MONTH 2');
        equal(this.api._isSelectable('months', 2014, 7), false, 'CHECK YEAR 2014 MONTH 8');
        equal(this.api._isSelectable('months', 2014, 9), true, 'CHECK YEAR 2014 MONTH 10');

        equal(this.api._isSelectable('days', 2013, 8, 1),false,'CHECK YEAR 2013 MONTH 9 DAY 1');
        equal(this.api._isSelectable('days', 2014, 1, 1),true,'CHECK YEAR 2014 MONTH 2 DAY 1');
        equal(this.api._isSelectable('days', 2014, 6, 20),true,'CHECK YEAR 2014 MONTH 7 DAY 20');
        equal(this.api._isSelectable('days', 2014, 8, 20),true,'CHECK YEAR 2014 MONTH 9 DAY 20');
        equal(this.api._isSelectable('days', 2014, 10, 1),false,'CHECK YEAR 2014 MONTH 11 DAY 1');


        this.api.options = $.extend(this.api.options, {
            selectableDate: [],
            selectableYear: [2010, {from: 2013, to: 2016}, 2020]
        });

        equal(this.api._isSelectable('years', 2001), false, 'CHECK YEAR 2001');
        equal(this.api._isSelectable('years', 2010), true, 'CHECK YEAR 2010');
        equal(this.api._isSelectable('years', 2015), true, 'CHECK YEAR 2015');
        equal(this.api._isSelectable('years', 2018), false, 'CHECK YEAR 2018');
        equal(this.api._isSelectable('years', 2020), true, 'CHECK YEAR 2020');


        this.api.options = $.extend(this.api.options, {
            selectableYear: [],
            selectableMonth: [0, {from: 3, to: 6}, 10]
        });

        equal(this.api._isSelectable('months', 2013, 0), true, 'CHECK YEAR 2013 MONTH 1');
        equal(this.api._isSelectable('months', 2014, 3), true, 'CHECK YEAR 2014 MONTH 4');
        equal(this.api._isSelectable('months', 2015, 6), true, 'CHECK YEAR 2015 MONTH 7');
        equal(this.api._isSelectable('months', 2016, 10), true, 'CHECK YEAR 2016 MONTH 11');

        equal(this.api._isSelectable('months', 2013, 1), false, 'CHECK YEAR 2013 MONTH 2');
        equal(this.api._isSelectable('months', 2014, 7), false, 'CHECK YEAR 2014 MONTH 8');
        equal(this.api._isSelectable('months', 2015, 9), false, 'CHECK YEAR 2015 MONTH 10');
        equal(this.api._isSelectable('months', 2016, 11), false, 'CHECK YEAR 2016 MONTH 12');


        this.api.options = $.extend(this.api.options, {
            selectableMonth: [],
            selectableDay: [1, {from: 10, to: 16}, 25]
        });

        equal(this.api._isSelectable('days', 2014, 8, 1),true,'CHECK YEAR 2014 MONTH 9 DAY 1');
        equal(this.api._isSelectable('days', 2014, 8, 10),true,'CHECK YEAR 2014 MONTH 9 DAY 10');
        equal(this.api._isSelectable('days', 2014, 8, 25),true,'CHECK YEAR 2014 MONTH 9 DAY 25');

        equal(this.api._isSelectable('days', 2014, 8, 2),false,'CHECK YEAR 2014 MONTH 9 DAY 2');
        equal(this.api._isSelectable('days', 2014, 8, 20),false,'CHECK YEAR 2014 MONTH 9 DAY 20');
        equal(this.api._isSelectable('days', 2014, 8, 28),false,'CHECK YEAR 2014 MONTH 9 DAY 28');

        equal(this.api._isSelectable('days', 2014, 9, 1),true,'CHECK YEAR 2014 MONTH 10 DAY 1');
        equal(this.api._isSelectable('days', 2014, 9, 10),true,'CHECK YEAR 2014 MONTH 10 DAY 10');
        equal(this.api._isSelectable('days', 2014, 9, 25),true,'CHECK YEAR 2014 MONTH 10 DAY 25');

        equal(this.api._isSelectable('days', 2014, 9, 2),false,'CHECK YEAR 2014 MONTH 10 DAY 2');
        equal(this.api._isSelectable('days', 2014, 9, 20),false,'CHECK YEAR 2014 MONTH 10 DAY 20');
        equal(this.api._isSelectable('days', 2014, 9, 28),false,'CHECK YEAR 2014 MONTH 10 DAY 28');



        this.api.options = $.extend(this.api.options, {
            selectableDay: [],
            selectableDayOfWeek: [1, 3, 5]
        });

        equal(this.api._isSelectable('days', 2014, 8, 1),true,'CHECK YEAR 2014 MONTH 9 DAY 1');
        equal(this.api._isSelectable('days', 2014, 8, 10),true,'CHECK YEAR 2014 MONTH 9 DAY 10');
        equal(this.api._isSelectable('days', 2014, 8, 19),true,'CHECK YEAR 2014 MONTH 9 DAY 19');

        equal(this.api._isSelectable('days', 2014, 8, 2),false,'CHECK YEAR 2014 MONTH 9 DAY 2');
        equal(this.api._isSelectable('days', 2014, 8, 11),false,'CHECK YEAR 2014 MONTH 9 DAY 11');
        equal(this.api._isSelectable('days', 2014, 8, 20),false,'CHECK YEAR 2014 MONTH 9 DAY 20');

        equal(this.api._isSelectable('days', 2013, 5, 3),true,'CHECK YEAR 2013 MONTH 6 DAY 3');
        equal(this.api._isSelectable('days', 2013, 5, 12),true,'CHECK YEAR 2013 MONTH 6 DAY 12');
        equal(this.api._isSelectable('days', 2013, 5, 21),true,'CHECK YEAR 2013 MONTH 6 DAY 21');

        equal(this.api._isSelectable('days', 2013, 5, 4),false,'CHECK YEAR 2013 MONTH 6 DAY 2');
        equal(this.api._isSelectable('days', 2013, 5, 13),false,'CHECK YEAR 2013 MONTH 6 DAY 11');
        equal(this.api._isSelectable('days', 2013, 5, 22),false,'CHECK YEAR 2013 MONTH 6 DAY 20');



        this.api.options = $.extend(this.api.options, {
            selectableDayOfWeek: [],
            min: '2013-1-1',
            max: '2014-12-31',
            selectableDate: ['2012-2-1', {from: '2012-5-1', to: '2013-7-1'}, {from: '2014-9-1', to: '2015-5-1'}]
        });

        equal(this.api._isSelectable('years', 2012), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2013), true, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2014), true, 'CHECK YEAR 2014');
        equal(this.api._isSelectable('years', 2015), false, 'CHECK YEAR 2015');

        equal(this.api._isSelectable('months', 2012, 1), false, 'CHECK YEAR 2011 MONTH 2');
        equal(this.api._isSelectable('months', 2013, 10), false, 'CHECK YEAR 2013 MONTH 11');
        equal(this.api._isSelectable('months', 2014, 7), false, 'CHECK YEAR 2014 MONTH 8');
        equal(this.api._isSelectable('months', 2015, 4), false, 'CHECK YEAR 2015 MONTH 5');

        equal(this.api._isSelectable('months', 2013, 4), true, 'CHECK YEAR 2013 MONTH 5');
        equal(this.api._isSelectable('months', 2014, 9), true, 'CHECK YEAR 2014 MONTH 10');

        equal(this.api._isSelectable('days', 2012, 5, 1),false,'CHECK YEAR 2012 MONTH 6 DAY 1');
        equal(this.api._isSelectable('days', 2013, 8, 1),false,'CHECK YEAR 2013 MONTH 9 DAY 1');
        equal(this.api._isSelectable('days', 2014, 7, 1),false,'CHECK YEAR 2014 MONTH 8 DAY 1');
        equal(this.api._isSelectable('days', 2015, 3, 1),false,'CHECK YEAR 2014 MONTH 4 DAY 1');

        equal(this.api._isSelectable('days', 2013, 4, 1),true,'CHECK YEAR 2013 MONTH 5 DAY 1');
        equal(this.api._isSelectable('days', 2014, 9, 1),true,'CHECK YEAR 2014 MONTH 10 DAY 1');

        this.api.options = $.extend(this.api.options, {
            selectableDayOfWeek: [],
            min: '2013-1-1',
            max: '2014-12-31',
            selectableDate: ['2012-2-1', {from: '2012-5-1', to: '2013-7-1'}, {from: '2014-5-1', to: '2015-5-1'}],
            selectableYear: [2014]
        });

        equal(this.api._isSelectable('years', 2012), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2013), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2014), true, 'CHECK YEAR 2014');
        equal(this.api._isSelectable('years', 2015), false, 'CHECK YEAR 2015');

        equal(this.api._isSelectable('months', 2012, 1), false, 'CHECK YEAR 2011 MONTH 2');
        equal(this.api._isSelectable('months', 2013, 10), false, 'CHECK YEAR 2013 MONTH 11');
        equal(this.api._isSelectable('months', 2014, 7), true, 'CHECK YEAR 2014 MONTH 8');
        equal(this.api._isSelectable('months', 2015, 4), false, 'CHECK YEAR 2015 MONTH 5');

        equal(this.api._isSelectable('months', 2013, 4), false, 'CHECK YEAR 2013 MONTH 5');
        equal(this.api._isSelectable('months', 2014, 9), true, 'CHECK YEAR 2014 MONTH 10');

        equal(this.api._isSelectable('days', 2012, 5, 1),false,'CHECK YEAR 2012 MONTH 6 DAY 1');
        equal(this.api._isSelectable('days', 2013, 8, 1),false,'CHECK YEAR 2013 MONTH 9 DAY 1');
        equal(this.api._isSelectable('days', 2014, 7, 1),true,'CHECK YEAR 2014 MONTH 8 DAY 1');
        equal(this.api._isSelectable('days', 2015, 3, 1),false,'CHECK YEAR 2014 MONTH 4 DAY 1');

        equal(this.api._isSelectable('days', 2013, 4, 1),false,'CHECK YEAR 2013 MONTH 5 DAY 1');
        equal(this.api._isSelectable('days', 2014, 9, 1),true,'CHECK YEAR 2014 MONTH 10 DAY 1');



        this.api.options = $.extend(this.api.options, {
            selectableDayOfWeek: [],
            min: '2013-1-1',
            max: '2014-12-31',
            selectableDate: ['2012-2-1', {from: '2012-5-1', to: '2013-7-1'}, {from: '2014-5-1', to: '2015-5-1'}],
            selectableYear: [2014],
            selectableMonth: [3, 4, 5, 6, 7]
        });

        equal(this.api._isSelectable('years', 2012), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2013), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2014), true, 'CHECK YEAR 2014');
        equal(this.api._isSelectable('years', 2015), false, 'CHECK YEAR 2015');

        equal(this.api._isSelectable('months', 2012, 1), false, 'CHECK YEAR 2011 MONTH 2');
        equal(this.api._isSelectable('months', 2013, 10), false, 'CHECK YEAR 2013 MONTH 11');
        equal(this.api._isSelectable('months', 2014, 7), true, 'CHECK YEAR 2014 MONTH 8');
        equal(this.api._isSelectable('months', 2014, 8), false, 'CHECK YEAR 2014 MONTH 9');
        equal(this.api._isSelectable('months', 2015, 4), false, 'CHECK YEAR 2015 MONTH 5');

        equal(this.api._isSelectable('months', 2013, 4), false, 'CHECK YEAR 2013 MONTH 5');
        equal(this.api._isSelectable('months', 2014, 5), true, 'CHECK YEAR 2014 MONTH 6');
        equal(this.api._isSelectable('months', 2014, 9), false, 'CHECK YEAR 2014 MONTH 10');

        equal(this.api._isSelectable('days', 2012, 5, 1),false,'CHECK YEAR 2012 MONTH 6 DAY 1');
        equal(this.api._isSelectable('days', 2013, 8, 1),false,'CHECK YEAR 2013 MONTH 9 DAY 1');
        equal(this.api._isSelectable('days', 2014, 7, 1),true,'CHECK YEAR 2014 MONTH 8 DAY 1');
        equal(this.api._isSelectable('days', 2015, 3, 1),false,'CHECK YEAR 2014 MONTH 4 DAY 1');

        equal(this.api._isSelectable('days', 2013, 4, 1),false,'CHECK YEAR 2013 MONTH 5 DAY 1');
        equal(this.api._isSelectable('days', 2014, 9, 1),false,'CHECK YEAR 2014 MONTH 10 DAY 1');

        this.api.options = $.extend(this.api.options, {
            selectableDayOfWeek: [],
            min: '2013-1-1',
            max: '2014-12-31',
            selectableDate: ['2012-2-1', {from: '2012-5-1', to: '2013-7-1'}, {from: '2014-5-1', to: '2015-5-1'}],
            selectableYear: [2014],
            selectableMonth: [3, 4, 5, 6, 7],
            selectableDay: [3, {from: 5, to: 25}]
        });

        equal(this.api._isSelectable('years', 2012), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2013), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2014), true, 'CHECK YEAR 2014');
        equal(this.api._isSelectable('years', 2015), false, 'CHECK YEAR 2015');

        equal(this.api._isSelectable('months', 2012, 1), false, 'CHECK YEAR 2011 MONTH 2');
        equal(this.api._isSelectable('months', 2013, 10), false, 'CHECK YEAR 2013 MONTH 11');
        equal(this.api._isSelectable('months', 2014, 7), true, 'CHECK YEAR 2014 MONTH 8');
        equal(this.api._isSelectable('months', 2014, 8), false, 'CHECK YEAR 2014 MONTH 9');
        equal(this.api._isSelectable('months', 2015, 4), false, 'CHECK YEAR 2015 MONTH 5');

        equal(this.api._isSelectable('months', 2013, 4), false, 'CHECK YEAR 2013 MONTH 5');
        equal(this.api._isSelectable('months', 2014, 5), true, 'CHECK YEAR 2014 MONTH 6');
        equal(this.api._isSelectable('months', 2014, 9), false, 'CHECK YEAR 2014 MONTH 10');

        equal(this.api._isSelectable('days', 2012, 5, 1),false,'CHECK YEAR 2012 MONTH 6 DAY 1');
        equal(this.api._isSelectable('days', 2013, 8, 1),false,'CHECK YEAR 2013 MONTH 9 DAY 1');
        equal(this.api._isSelectable('days', 2014, 7, 1),false,'CHECK YEAR 2014 MONTH 8 DAY 1');
        equal(this.api._isSelectable('days', 2015, 3, 1),false,'CHECK YEAR 2014 MONTH 4 DAY 1');

        equal(this.api._isSelectable('days', 2014, 7, 20),true,'CHECK YEAR 2014 MONTH 8 DAY 20');
        equal(this.api._isSelectable('days', 2014, 6, 3),true,'CHECK YEAR 2014 MONTH 7 DAY 3');


        this.api.options = $.extend(this.api.options, {
            selectableDayOfWeek: [],
            min: '2013-1-1',
            max: '2014-12-31',
            selectableDate: ['2012-2-1', {from: '2012-5-1', to: '2013-7-1'}, {from: '2014-5-1', to: '2015-5-1'}],
            selectableYear: [2014],
            selectableMonth: [3, 4, 5, 6, 7],
            selectableDay: [3, {from: 5, to: 25}],
            selectableDayOfWeek: [0, 2, 4, 6]
        });

        equal(this.api._isSelectable('years', 2012), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2013), false, 'CHECK YEAR 2013');
        equal(this.api._isSelectable('years', 2014), true, 'CHECK YEAR 2014');
        equal(this.api._isSelectable('years', 2015), false, 'CHECK YEAR 2015');

        equal(this.api._isSelectable('months', 2012, 1), false, 'CHECK YEAR 2011 MONTH 2');
        equal(this.api._isSelectable('months', 2013, 10), false, 'CHECK YEAR 2013 MONTH 11');
        equal(this.api._isSelectable('months', 2014, 7), true, 'CHECK YEAR 2014 MONTH 8');
        equal(this.api._isSelectable('months', 2014, 8), false, 'CHECK YEAR 2014 MONTH 9');
        equal(this.api._isSelectable('months', 2015, 4), false, 'CHECK YEAR 2015 MONTH 5');

        equal(this.api._isSelectable('months', 2013, 4), false, 'CHECK YEAR 2013 MONTH 5');
        equal(this.api._isSelectable('months', 2014, 5), true, 'CHECK YEAR 2014 MONTH 6');
        equal(this.api._isSelectable('months', 2014, 9), false, 'CHECK YEAR 2014 MONTH 10');

        equal(this.api._isSelectable('days', 2012, 5, 1),false,'CHECK YEAR 2012 MONTH 6 DAY 1');
        equal(this.api._isSelectable('days', 2013, 8, 1),false,'CHECK YEAR 2013 MONTH 9 DAY 1');
        equal(this.api._isSelectable('days', 2014, 7, 1),false,'CHECK YEAR 2014 MONTH 8 DAY 1');
        equal(this.api._isSelectable('days', 2015, 3, 1),false,'CHECK YEAR 2014 MONTH 4 DAY 1');

        equal(this.api._isSelectable('days', 2014, 7, 20),false,'CHECK YEAR 2014 MONTH 8 DAY 20');
        equal(this.api._isSelectable('days', 2014, 6, 3),true,'CHECK YEAR 2014 MONTH 7 DAY 3');

    });
}(jQuery));
