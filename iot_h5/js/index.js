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
    var timer;
    window.onresize = function () {
        clearTimeout(timer);
        timer = setTimeout(a, 300);
    }



    $('#register ').click(function () {
        window.location.href = "./register.html?id=1";
    })
    $('#forgotPassword').click(function () {
        window.location.href = "./register.html?id=2";
    })

    //登录成功， 进入首页
    $("#login").click(function () {
        var password = $('#password').val()
        var mobile = $('#userName').val()
        console.log(password)
        // if (validatemobile(mobile) && checkPassword(password)) {
        $('.error').html('').hide()
        var transdata = {
            mobile: mobile,
            password: hex_md5(password).toUpperCase(),
        };
        console.log(transdata)
     
        var res = ajaxMethod('logon', transdata);
        console.log(res)
        if (res.code == '1') {
            $('.error').html(res.msg).show()
        } else {
            $('.error').html('').hide()
            console.log(res.userToken)
            window.localStorage.userToken = res.userToken
            window.location.href = "./cardList.html";
        }

        // }
    })

    function validatemobile(mobile) {
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












})();