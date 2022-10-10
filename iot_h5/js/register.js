!(function () {
    function a() {
        var html = document.documentElement;
        var w = html.getBoundingClientRect().width;
        if (w > 750) {
            w = 750;
        }
        var f = w / 7.5;
        html.style.fontSize = f + "px";
    }
    a();


    var url = location.search;
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        if (str == "id=1") {
            $('#register').text('注册')
            $('.logo-title').text('注册')
        } else {
            $('#register').text('修改密码')
            $('.logo-title').text('修改密码')
        }
    }

})()



var timer;
window.onresize = function () {
    clearTimeout(timer);
    timer = setTimeout(a, 300);
}
$("#send").click(function () {

    if (checkAll($("#userName").val())) {
        var phone = $("#userName").val()
        var sendobj = {
            mobilenumber: phone
        }
        // 发送手机号码到后台
        // $.ajax({
        //     url: "https://insure.meihualife.com/user/checkno.do",
        //     type: "post",
        //     async: true,
        //     data: sendobj,
        //     beforeSend: function () {
        //         // $(".loading").show();
        //     },
        //     success: function (data) {
        //         console.log(data)
        //     },
        //     error: function (data) {
        //         console.log(data)
        //     },
        //     complete: function () {

        //     }
        // });

        $("#send").attr("disabled", true);
        var time = 60; //倒计时5秒 
        var timer = setInterval(function () {
            time--;
            if (time >= 0) {
                $("#send").css('color', "#9c9c9c");
                $("#send").css('border', "1px solid #9c9c9c");
                $("#send").text(time + "s");
            } else {
                $("#send").text("重新发送");
                $("#send").css('color', "#409eff");
                $("#send").css('border', "1px solid #409eff");
                $("#send").attr("disabled", false);
                clearTimeout(timer); //清除定时器 
                time = 5; //设置循环重新开始条件 
            }
        }, 1000); //设置定时器 

    }
})




// 提交表单
$("#register").click(function () {
    if ($("#code").val().length == 0) {
        $('.error').html('请输入验证码').show()
    }
    // console.log(checkAll($("#userName").val()))
    // console.log(checkPassword($("#password").val()))

    if (checkAll($("#userName").val()) && checkPassword($("#password").val()) && $("#code").val().length > 0) {
        $('.error').html('').hide()
        var sendClickobj = {
            mobile: $('#userName').val(),
            checkno: $("#code").val(),
            password: hex_md5($('#password').val()).toUpperCase(),
        }

        if ($('#register').text() == '注册') {
            var res = ajaxMethod('registerin', sendClickobj);
            if (res.code == '1') {
                $('.error').html(res.msg).show()
            } else {
                $('.error').html('').hide()
                window.localStorage.userToken = res.userToken
                window.location.href = "./cardList.html";
            }

        } else {
            var res = ajaxMethod('forgetpsdin', sendClickobj);
            if (res.code == '1') {
                $('.error').html(res.msg).show()
            } else {
                $('.error').html('').hide()
                window.localStorage.userToken = res.userToken
                window.location.href = "./cardList.html";
            }
        }
    }


})













// 校验所有信息
function checkAll(mobile) {
    var that = this
    if (mobile == null || mobile == "") {
        $('.error').html('请输入手机号码').show()
        return false;
    }
    // .delay(3000).fadeOut();
    if (mobile.length == 0) {
        $('.error').html('请输入手机号码').show()
        return false;
    }

    if (mobile.length != 11) {
        $('.error').html('请输入有效的手机号码').show()
        return false;
    }
    var myreg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (!myreg.test(mobile)) {
        $('.error').html('请输入有效的手机号码').show()
        return false;
    }
    return true;
}
function checkPassword(password) {
    var that = this
    console.log(password)
    console.log(password == null || password == "")
    if (password == null || password == "") {
        $('.error').html('请输入密码').show()
        return false;
    }
    // .delay(3000).fadeOut();
    if (password.length == 0) {
        $('.error').html('请输入密码').show()
        return false;
    }

    if (password.length != 8) {
        $('.error').html('请输入8位数密码').show()
        return false;
    }
    // var myreg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    // if (!myreg.test(mobile)) {
    //     $('.error').html('请输入有效的手机号码').show()
    //     return false;
    // } else {
    //     $('.error').html('').hide()
    // }
    return true;
}