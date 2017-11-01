$(function() {
    //设置默认值
    var option = $("<option>").val("0").text("==请选择省份==");

    $("[name='province']").append(option);

    option = $("<option>").val("0").text("==请选择城市==");
    $("[name='city']").append(option);

    option = $("<option>").val("0").text("==请选择县区==");
    $("[name='county']").append(option);

    //绑定省份
    for (var i = 0; i < areas.length; i++) {
        if (parseInt(areas[i].level) == 1) {
            option = $("<option>").val(areas[i].code).text(areas[i].name);
            $("[name='province']").append(option);
        }
    }

    //城市联动
    $("[name='province']").bind("change", function() {
        var code = parseInt($(this).val());

        //加载城市
        if (code > 0) {
            $("[name='city'] option:gt(0)").remove();
            $("[name='county'] option:gt(0)").remove();
            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].parentCode) == code) {
                    option = $("<option>").val(areas[i].code).text(areas[i].name);
                    $("[name='city']").append(option);
                }
            }
        }else {


            $("[name='city'] option:gt(0)").remove();
            $("[name='county'] option:gt(0)").remove();
        }
        //绘制地图
        if (code > 0) {
            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].code) == code) {

                    var longitude = areas[i].longitude;
                    var latitude = areas[i].latitude;

                    loadPlace(longitude, latitude, 10);

                    break;
                }
            }
        }
    });

    //城市联动
    $("[name='city']").bind("change", function() {
        var code = parseInt($(this).val());

        //加载县区
        if (code > 0) {
            $("[name='county'] option:gt(0)").remove();

            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].parentCode) == code) {
                    option = $("<option>").val(areas[i].code).text(areas[i].name);
                    $("[name='county']").append(option);
                }
            }
        }else {

            $("[name='county'] option:gt(0)").remove();
        }

        //绘制地图
        if (code > 0) {
            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].code) == code) {

                    var longitude = areas[i].longitude;
                    var latitude = areas[i].latitude;

                    loadPlace(longitude, latitude, 12);

                    break;
                }
            }
        }

    });


    //县区联动
    $("[name='county']").bind("change", function() {
        var code = parseInt($(this).val());

        //绘制地图
        if (code > 0) {

            for (var i = 0; i < areas.length; i++) {
                if (parseInt(areas[i].code) == code) {

                    var longitude = areas[i].longitude;
                    var latitude = areas[i].latitude;

                    loadPlace(longitude, latitude);

                    break;
                }
            }
        }
    });
     
});

function cancel(){


}