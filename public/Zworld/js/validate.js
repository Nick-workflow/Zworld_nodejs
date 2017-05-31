/**
 * Created by Administrator on 2017/1/14.
 */
$(function(){

    /*login 验证用户手机号和邮箱*/
    function testUserName() {
        var $account = $("#account").val();
        var regPhone = /^1\d{10}$/g;
        var regEmail = /^\w+@\w{2,5}\.((com)|(com\.cn)|(cn))$/gi;

        if($account.length > 0){
            var testPhone = regPhone.test($account);
            var testEmail = regEmail.test($account);
            if(testPhone || testEmail){
                $(".userAccount .isNull").css("display","none");
                $(".userAccount .errorInfo").css("display","none");
                $("#account").removeClass("input-error");
            }else{
                $(".userAccount .isNull").css("display","none");
                $(".userAccount .errorInfo").css("display","block");
                $("#account").addClass("input-error");
            }
        }else{
            $(".userAccount .isNull").css("display","block");
            $(".userAccount .errorInfo").css("display","none");
            $("#account").addClass("input-error");
        }
    }
    $("#account").on('blur',testUserName);

    /*login 验证用户密码*/
    function testUserPwd(){
        var $pwd = $("#pwd").val();
        var regPwd = /^.{6,16}$/;
        var testPwd = regPwd.test($pwd);
        if($pwd.length > 0){
            if(testPwd){
                $(".userPwd .isNull").css("display","none");
                $(".userPwd .errorInfo").css("display","none");
                $("#pwd").removeClass("input-error");
            }else{
                $(".userPwd .isNull").css("display","none");
                $("#judgePwd").css("display","none");
                $(".userPwd .errorInfo").css("display","block");
                $("#pwd").addClass("input-error");
            }
        }else{
            $(".userPwd .isNull").css("display","block");
            $(".userPwd .errorInfo").css("display","none");
            $("#pwd").addClass("input-error");
        }
    }
    $("#pwd").on('blur',testUserPwd);

    /*register 验证注册手机号*/
    function testRegName(){
        var $registerName = $("#registerName").val();
        var regPhone = /^1\d{10}$/g;

        if($registerName.length > 0){
            var testPhone = regPhone.test($registerName);
            if(testPhone){
                $(".userRigester .isNull").css("display","none");
                $(".userRigester .errorInfo").css("display","none");
                $("#registerName").removeClass("input-error");
            }else{
                $(".userRigester .isNull").css("display","none");
                $(".userRigester .errorInfo").css("display","block");
                $("#registerName").addClass("input-error");
            }
        }else{
            $(".userRigester .isNull").css("display","block");
            $(".userRigester .errorInfo").css("display","none");
            $("#registerName").addClass("input-error");
        }
    }
    $("#registerName").on('blur',testRegName);

    /*register 验证验证码*/
    function testCheckCode(){
        var $checkCode = $("#checkCode").val();
        var regCode = /^[a-zA-Z0-9]{4}$/g;

        if($checkCode.length > 0){
            var testCode = regCode.test($checkCode);
            if(testCode){
                $(".checkCode .isNull").css("display","none");
                $(".checkCode .errorInfo").css("display","none");
                $("#checkCode").removeClass("input-error");
            }else{
                $(".checkCode .isNull").css("display","none");
                $(".checkCode .errorInfo").css("display","block");
                $("#checkCode").addClass("input-error");
            }
        }else{
            $(".checkCode .isNull").css("display","block");
            $(".checkCode .errorInfo").css("display","none");
            $("#checkCode").addClass("input-error");
        }
    }
    $("#checkCode").on('blur',testCheckCode);

    /*register 验证手机验证码*/
    function testValidateCode(){
        var $validateCode = $("#validateCode").val();
        var regValidate = /^\d{4}$/g;

        if($validateCode.length > 0){
            var testValidate = regValidate.test($validateCode);
            if(testValidate){
                $(".validateCode .isNull").css("display","none");
                $(".validateCode .errorInfo").css("display","none");
                $("#validateCode").removeClass("input-error");
            }else{
                $(".validateCode .isNull").css("display","none");
                $(".validateCode .errorInfo").css("display","block");
                $("#validateCode").addClass("input-error");
            }
        }else{
            $(".validateCode .isNull").css("display","block");
            $(".validateCode .errorInfo").css("display","none");
            $("#validateCode").addClass("input-error");
        }
    }
    $("#validateCode").on('blur',testValidateCode);
});