var rebate = (function($, win) {
    this.activityOver = win._PAGE.activityStatus;
    this.activityOverAlert = function() {
        $('.finishToast p').text('充值返利活动已结束，请到Boss直聘app充值');
    };
    this.roleErrAlert = function() {
        $('.finishToast p').text('该活动仅限Boss身份充值，牛人身份暂无充值返利活动');
    };
    this.alert = function(type) {
        type();
        $('.finishToast,.layer').show();
        $('.finishToast span,.finishToast img').tap(function() {
            $(this).parent().hide().prev().hide();
        });
    };
    this.activityFinished = function() {
        $('.scroll').hide();
        $('.subWrap').css(' -webkit-filter', 'grayscale(1)');
        $('.chargeType li').css(' -webkit-filter', 'grayscale(0.98)');
        $('.layer,.finishToast').bind("touchmove", function(e) {
            e.preventDefault();
        });
    };
    this.rollHorn = function() {
        var html = win._PAGE.hornList.map(function(item) {
            return "<div class='swiper-slide'><span>" + item + "</span></div>";
        }).join('');
        $('.swiper-wrapper').append(html);
        var mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            loop: true,
            height: 100,
            autoplay: 2000,
            speed: 1000
        })
    };
    this.init = function() {
        var self = this;
        if (self.activityOver) {
            self.alert(activityOverAlert);
            self.activityFinished();
        } else if (win._PAGE.geek) {
            self.alert(roleErrAlert);
            self.rollHorn();
        } else {
            self.rollHorn();
        }
    };
    this.init();
    return {
        activityOver: this.activityOver,
        activityFinished: this.activityFinished,
        roleErrAlert: this.roleErrAlert,
        activityOverAlert: this.alert
    }
})($, window);

if (rebate.activityOver) {
    $('.chargeType li,.subWrap img').tap(function(e) {
        if (!window.charge.btnEnable1) {
            return false;
        }
        rebate.activityFinished();
        rebate.activityOverAlert(activityOverAlert);
        window.charge.btnEnable1 = true;
        e.preventDefault;
    });
}
if (_PAGE.geek) {
    $('.chargeType li,.subWrap img').tap(function(e) {
        rebate.activityOverAlert(roleErrAlert);
        e.preventDefault;
    });
}

$('.subWrap img').bind("tap", function(e) {
    if (!window.charge.btnEnable2) {
        return false;
    }
    window.charge.btnEnable2 = false;
    if (rebate.activityOver) {
        rebate.activityFinished();
        rebate.activityOverAlert(activityOverAlert);
        return false;
    } else if (_PAGE.geek) {
        rebate.activityOverAlert(roleErrAlert);
        return false;
    }
    if (e.target.nodeName.toUpperCase() == "IMG" && e.target.parentNode.nodeName.toUpperCase() != "LI") {
        window.location.href = $(this).data("url");
        setTimeout(function() {
            window.charge.btnEnable2 = true;
        }, 1000);
    }
    e.preventDefault;
});
var charge = {
    payUrl: '/weixin/official/pay.json',
    btnEnable: true,
    btnEnable1: true,
    btnEnable2: true,
    sendTime: 0,
    android: {
        url: "bosszp://bosszhipin.app/openwith?type=zdWallet",
        ua: navigator.userAgent.indexOf("Android") > -1 || navigator.userAgent.indexOf("Linux") > -1
    },
    ios: {
        url: "bosszp://bosszhipin.app/openwith?type=zdWallet&activity=1&beanCount=",
        ua: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    systemCheck: function(type, chargeNum) {
        type.map(function(item, index) {
            if (charge[item].ua) {
                var url = item == "ios" ? (charge[item].url + chargeNum) : charge[item].url;
                window.location = url;
                window.charge.btnEnable = true;
                return false;
            }
        });
    }
};

$('.chargeType').delegate('li', 'tap', function() {
    // window.alert(32323)
    var id = $(this).data('id'),
        charge = $(this).data('charge');
    data = { 'identity': 1, 'beanPackageId': id };

    if (!window.charge.btnEnable) {
        return false;
    }
    if (_PAGE.loginUrl) {
        window.location = _PAGE.loginUrl;
        return false;
    }
    if (rebate.activityOver) {
        rebate.activityFinished();
        rebate.activityOverAlert(activityOverAlert);
        return false;
    }
    if (_PAGE.geek) {
        rebate.activityOverAlert(roleErrAlert);
        return false;
    }
    if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
        $.post(window.charge.payUrl, data, function(res) {
            if (res.rescode == 1) {
                function getResult() { //查询接口
                    $.post('/boss/item/orderquery.json', {
                        'orderNo': res.data.orderNo,
                        'detailNo': res.data.detailNo
                    }, function(res) {
                        if (res.rescode) {
                            if (res.payStatus == 1) { //1:已支付 2:支付中 3:支付错误
                                //已经支付
                                window.location.href = '/weixin/official/payResult?type=1' //跳转支付成功页面

                            } else if (res.payStatus == 3) {
                                window.location.href = '/weixin/official/payResult?type=2' //跳转支付失败页面

                            } else {
                                window.charge.sendTime++;
                                if (window.charge.sendTime > 3) {
                                    window.charge.sendTime = 0;
                                    window.location.href = '/weixin/official/payResult?type=2' //跳转支付失败页面
                                    return false;
                                }
                                getResult();
                                return false;
                            }
                        }
                    })
                }
                onBridgeReady(res.data.appId, res.data.timeStamp, res.data.nonceStr, res.data.package, res.data.signType, res.data.paySign, getResult);
            }
        })
        return false;
    } else {
        window.charge.systemCheck(['android', 'ios'], charge);
    }
})
