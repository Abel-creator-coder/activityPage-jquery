$(function() {
    var General_Market = [];
    var General = [];
    _PAGE.data.General_Market.forEach(function(item) {
        General_Market.push(item["count"]);
    });
    _PAGE.data.General.forEach(function(item) {
        General.push(item["count"]);
    });

    $('#container').highcharts({
        chart: {
            polar: true,
            type: 'area',
            animation: false,
            tooltip: false
        },
        plotOptions: {
            series: {
                animation: false
            }
        },
        tooltip: {
            enabled: false
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        pane: {
            size: '80%'
        },
        xAxis: {
            labels: {
                rotation: 0,
                align: 'center',
                distance: 26,
                style: {
                    font: 'normal 11px Verdana, sans-serif',
                    color: 'blank'
                }
            },
            categories: ['与BOSS沟通情况', '学历', '与该职位匹配度', '工作经验'],
            tickmarkPlacement: 'on',
            lineWidth: 0,
            gridLineWidth: 3,
            gridLineDashStyle: 'ShortDot',
            gridLineColor: 'green',
            gridZIndex: 40
        },
        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            y: 0,
            x: 90,
            layout: 'vertical',
            squareSymbol: false,
            symbolWidth: 40,
            symbolHeight: 10,
            symbolRadius: 0,
            itemStyle: {
                fontSize: '11px',
                fontWeight: 'normal'
            }
        },
        animation: false,
        series: [{
            name: '市场水平',
            data: General_Market,
            pointPlacement: 'on',
            color: 'rgb(188,249,232)'
        }, {
            name: '您的情况',
            data: General,
            pointPlacement: 'on',
            color: 'rgb(103,148,248)'
        }]
    });
});
$(document).ready(function() {
    var ration = _PAGE.position / _PAGE.commNum;
    var position = [];
    if (ration <= 0.25) {
        position = [340, 340];
        $('.competitive_text').html("极好");
    } else if (ration > 0.25 && ration <= 0.5) {
        position = [260, 260];
        $('.competitive_text').html("优秀");

    } else if (ration > 0.5 && ration <= 0.75) {
        position = [160, 160];
        $('.competitive_text').html("良好");
    } else if (ration > 0.75) {
        position = [88, 88];
        $('.competitive_text').html("一般");
    }
    var W, H,
        canvas1 = document.getElementById('canvas'),
        ctx1 = canvas1.getContext('2d'),
        angle = 1,
        copacity = 0,
        rad = 0;
    W = $(".competition_show_chart img").width();
    H = $(".competition_show_chart img").height();
    var num = 0;

    var canvas2 = document.getElementById('canvas1'),
        ctx2 = canvas2.getContext('2d');
    var time = 0; //定义运动的执行次数

    function paint() {
        num++;
        time++;
        angle += 0.01;
        var s = -Math.sin(angle);
        var c = Math.cos(angle);

        // copacity <= 1 ? copacity > 0.7 ? copacity += 1 / position[0] : copacity += 1 / (5 * position[0]) : copacity = 0;
        if (num < position[0]) {
            copacity < 1 ? (copacity > 0.03 ? copacity += 1 / (2 * position[0]) : copacity += 1 / (5 * position[0])) : copacity = 0;
            ctx1.save();
            if (num > 1) {
                ctx1.globalAlpha = 1;

            } else {
                ctx1.globalAlpha = 0;
            }
            ctx1.beginPath();
            ctx1.fillStyle = 'rgba(255,255,255,' + copacity + ')';
            ctx1.arc(W / 2 + (s * 125), H / 2 + (c * 125), 7, 0, 2 * Math.PI);
            ctx1.fill();
            ctx1.restore();
        }

        if (time > 10 && time < position[1]) {
            ctx2.clearRect(0, 0, W, H);
            ctx2.save(); //将当前以左上角坐标为(0,0)的上下文环境进行保存，这样是为了在接下来中要进行画布偏移后，可以进行还原当前的环境
            ctx2.translate(W / 2, H / 2);
            ctx2.rotate(time * Math.PI / 320); //设定每次旋转的度数
            ctx2.fillStyle = 'rgb(255,255,255)';
            ctx2.beginPath();
            ctx2.arc(-120, 75, 5, 0, 2 * Math.PI, true);
            ctx2.closePath();
            ctx2.fill();
            ctx2.restore();
        }
    }
    setInterval(paint, 10);
});
var text = {
    "Job_Hot_Min": "在一大波牛人到来之前，赶紧勾搭Boss，拿下这个职位！",
    "Job_Hot_Medium": "该职位备受牛人青睐，值得争取！",
    "Job_Hot_Max": "该职位备受牛人青睐，值得争取！",
    "Job_Hot_SuperMax": "该职位备受牛人青睐，值得争取！",
    "Comm_Boss_Ignore": "再向Boss详细介绍一下自己吧",
    "Comm_Comm": "在与Boss的沟通中，让Ta感受到你的认可与期待",
    "Comm_Deliver": "在与Boss的沟通中，让Ta感受到你的认可与期待",
    "Comm_Exchange": "在与Boss的沟通中，让Ta感受到你的认可与期待",
    "Comm_Interview": "Offer距你只有一步之遥！",
    "Boss_Active_Min": "多与Boss打招呼，让Ta看到优秀的你终于出现在了Ta的面前",
    "Boss_Active_Medium": "Boss对该职位的需求比较紧急，快去勾搭吧！",
    "Boss_Active_Max": "Boss对该职位的需求比较紧急，快去勾搭吧！",
    "Boss_Active_SuperMax": "Boss对该职位需求非常紧急，快去勾搭吧！",
    "CV_30": "简历并不代表全部，告诉Boss你的态度与实力！",
    "CV_50": "与Boss保持积极的沟通，才更有可能获得这个机会",
    "CV_80": "与Boss保持积极的沟通，才更有可能获得这个机会",
    "CV_80_Plus": "你有很大几率被Boss认可，积极展现你自己！"
};
$(document).ready(function() {
    window.ids = [{
        "id": "Comm_Interview",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Comm_Exchange",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Comm_Deliver",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Comm_Comm",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Comm_Boss_Ignore",
        "width": 0,
        "height": 0,
        "excute": false
    }, , {
        "id": "CV_30",
        "width": 0,
        "height": 0,
        "excute": false
    }, , {
        "id": "CV_50",
        "width": 0,
        "height": 0,
        "excute": false
    }, , {
        "id": "CV_80",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "CV_80_Plus",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Degree_HighScool_And_Below",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Degree_Junior",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Degree_Bachelor",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Degree_Master",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Degree_Phd",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Exp_Fresh",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Exp_Less_1",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Exp_1_3",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Exp_3_5",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Exp_5_10",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Exp_10_Plus",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Salary_NO",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Salary_Min",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Salary_Medium",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Salary_Max",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "Salary_SuperMax",
        "width": 0,
        "height": 0,
        "excute": false
    }, {
        "id": "container",
        "width": 0,
        "height": 0,
        "excute": false
    }];
    //检查可见性
    var isVisible = function(selectid) {
            var selectid = "#" + selectid;
            var o = $(selectid);
            var of = o.offset();
            var w = $(window);
            return !(w.scrollTop() > (of.top + o.outerHeight()) || (w.scrollTop() + w.height()) < of.top);
        }
        //去抖动
    var debounce = function(idle, action) {
        var last;
        return function() {
            var ctx = this,
                args = arguments
            clearTimeout(last)
            last = setTimeout(function() {
                action.apply(ctx, args)
            }, idle)
        }
    };
    //动画
    function animate() {
        window.ids.forEach(function(item) {
            if (isVisible(item.id) && !item.excute) {
                var id = "#" + item.id;
                item.excute = true;
                var w = 0,
                    h = 0;
                item.width > 0 ? requestAnimationFrame(function() {
                    w += 5;
                    $(id).width(w);
                    if (w < item.width) {
                        requestAnimationFrame(arguments.callee);
                    }
                }) : "";
                item.height > 0 ? requestAnimationFrame(function() {
                    h += 5;
                    $(id).height(h);
                    if (h < item.height) {
                        requestAnimationFrame(arguments.callee);
                    }
                }) : "";
            }
        });
    }
    //滚动事件
    $(window).scroll(debounce(200, animate));
    //沟通百分比
    _PAGE.data["Communicate"].forEach(function(item, index, arr) {

        var id = "#" + item.factor;
        var total = $('.hoz_bar').width();
        var width = item.rate * total / 100;
        var result = 0;
        ids.map(function(items) {
            if (items.id == item.factor) {
                items.width = width;
            }
        });
        $(id).find('.percent').html(item.rate + "%");
        if (item.isCur) {
            $(id).find('.work_exp').show();
            $("#contract + p").html(text[item.factor]);
        }
        if (item.isCur && index != 0) {
            for (var i = index - 1; i >= 0; i--) {
                result += arr[i].rate;
            }
            result == 0 ? $("#contract").html("与Boss沟通情况：超过了1%的竞聘者") : "";
            result < 50 && result > 0 ? $("#contract").html("与Boss沟通情况：超过了" + parseInt(result) + "%的竞聘者") : "";
            result >= 50 && (100 - result) != 0 ? $("#contract").html("与Boss沟通情况：排名前" + parseInt((100 - result)) + "%") : "";
        } else if (index == 0) {
            result = 100;
        }
        (100 - result) == 0 ? $("#contract").html("与Boss沟通情况：超过了1%的竞聘者") : "";

    });
    //匹配度百分比
    _PAGE.data["CVMatch"].forEach(function(item, index, arr) {

        var id = "#" + item.factor;
        var result = 0;
        // var total = $('.ver_bar').height();
        var total = $(".match_wrap").data("height") * parseInt($("html").css("fontSize"));
        height = item.rate * total / 100;
        // $(id).height(item.rate * total / 100);
        ids.map(function(items) {
            if (items.id == item.factor) {
                items.height = height;
            }
        });
        $(id).find('.percent').html(item.rate + "%");
        if (item.isCur) {
            $(id).find('.match').show();
            $("#CVMatch").siblings("p").html(text[item.factor]);
        }
        if (item.isCur && index != 0) {
            for (var i = index - 1; i >= 0; i--) {
                result += arr[i].rate;
            }
            result == 0 ? $("#CVMatch").html("简历匹配度：超过了1%的竞聘者") : "";
            result < 50 && result > 0 ? $("#CVMatch").html("简历匹配度：超过了" + parseInt(result) + "%的竞聘者") : "";
            result >= 50 && (100 - result) != 0 ? $("#CVMatch").html("简历匹配度：排名前" + parseInt((100 - result)) + "%") : "";
        } else if (index == 0) {
            result = 100;
        }
        (100 - result) == 0 ? $("#CVMatch").html("简历匹配度：超过了1%的竞聘者") : "";
    });
    //学历百分比
    _PAGE.data["Degree"].forEach(function(item, index, arr) {

        var id = "#" + item.factor;
        var result = 0;
        // var total = $('.ver_bar').height();
        var total = $(".qua_wrap").data("height") * parseInt($("html").css("fontSize"));
        var height = item.rate * total / 100;
        ids.map(function(items) {
            if (items.id == item.factor) {
                items.height = height;
            }
        });
        // $(id).height(item.rate * total / 100);
        $(id).find('.percent').html(item.rate + "%");
        if (item.isCur) {
            $(id).find('.match').show();
            $("#Degree + p").html(text[item.factor]);
        }
        if (item.isCur && index != 0) {
            for (var i = index - 1; i >= 0; i--) {
                result += arr[i].rate;
            }
            result == 0 ? $("#Degree").html("学历情况：超过了1%的竞聘者") : "";
            result < 50 && result > 0 ? $("#Degree").html("学历情况：超过了" + parseInt(result) + "%的竞聘者") : "";
            result >= 50 && (100 - result) != 0 ? $("#Degree").html("学历情况：排名前" + parseInt((100 - result)) + "%") : "";
        } else if (index == 0) {
            result = 100;
        }
        (100 - result) == 0 ? $("#Degree").html("学历情况：超过了1%的竞聘者") : "";
    });
    //工作经验百分比
    _PAGE.data["Experience"].forEach(function(item, index, arr) {

        var id = "#" + item.factor;
        var result = 0;
        var total = $('.hoz_bar').width();
        var width = item.rate * total / 100;
        ids.map(function(items) {
            if (items.id == item.factor) {
                items.width = width;
            }
        });
        // $(id).width(item.rate * total / 100);
        $(id).find('.percent').html(item.rate + "%");
        if (item.isCur) {
            $(id).find('.work_exp').show();
            $("#Experience + p").html(text[item.factor]);
        }
        if (item.isCur && index != 0) {
            for (var i = index - 1; i >= 0; i--) {
                result += arr[i].rate;
            }
            result == 0 ? $("#Experience").html("工作经验：超过了1%的竞聘者") : "";
            result < 50 && result > 0 ? $("#Experience").html("工作经验：超过了" + parseInt(result) + "%的竞聘者") : "";
            result >= 50 && (100 - result) != 0 ? $("#Experience").html("工作经验：排名前" + parseInt((100 - result)) + "%") : "";
        } else if (index == 0) {
            result = 100;
        }
        (100 - result) == 0 ? $("#Experience").html("工作经验：超过了1%的竞聘者") : "";
    });
    //期望百分比
    _PAGE.data["Salary_Dynamic"].forEach(function(item, index, arr) {

        var id = "#" + item.factor;
        var result = 0;
        // var total = $('.ver_bar').height();
        var total = $(".sal_wrap").data("height") * parseInt($("html").css("fontSize"));
        height = item.rate * total / 100;
        // $(id).height(item.rate * total / 100);
        ids.map(function(items) {
            if (items.id == item.factor) {
                items.height = height;
            }
        });
        // $(id).height(item.rate * total / 100);
        $(id).find('.percent').html(item.rate + "%");
        if (item.isCur) {
            $(id).find('.sal').show();
        }
        if (item.isCur && index != 0) {
            for (var i = index - 1; i >= 0; i--) {
                result += arr[i].rate;
            }
            result == 0 ? $("#Salary_Dynamic").html("期望薪酬：超过了1%的竞聘者") : "";
            result < 50 && result > 0 ? $("#Salary_Dynamic").html("期望薪酬：超过了" + parseInt(result) + "%的竞聘者") : "";
            result >= 50 && (100 - result) != 0 ? $("#Salary_Dynamic").html("期望薪酬：排名前" + parseInt((100 - result)) + "%") : "";
            $("#Salary_Dynamic + p").html(text[item.factor]);
        } else if (index == 0) {
            result = 100;
        }
        (100 - result) == 0 ? $("#Salary_Dynamic").html("期望薪酬：超过了1%的竞聘者") : "";
        item.isCur && item.factor == "Salary_NO" ? $("#Salary_Dynamic").html(item.rate + "%的人未填写期望薪资") : "";
    });
    //boss活跃情况
    var boss_active = _PAGE.url + "/images/peak_pink.png";
    var boss_no_active = _PAGE.url + "/images/peak_purple.png";
    _PAGE.data["Boss_Active"].forEach(function(item) {

        var id = "#" + item.factor;
        if (item.isCur) {
            $(id).attr('src', boss_active);
            $(id).hasClass('no_active') ? $(id).removeClass('no_active') : "";
            $(id).hasClass('active') ? "" : $(id).addClass("active");
            $('#Boss_Active').html("Boss活跃情况：" + item.name);
            $('#Boss_Active + p').html(text[item.factor]);

        } else {
            $(id).attr('src', boss_no_active);
            $(id).hasClass('no_active') ? "" : $(id).addClass('no_active');
            $(id).hasClass('active') ? $(id).removeClass("active") : "";
        }
    });
    //职位热度
    var boss_active = _PAGE.url + "/images/peak_red.png";
    var boss_no_active = _PAGE.url + "/images/peak_blue.png";
    _PAGE.data["Job_Hot_Degree"].forEach(function(item) {

        var id = "#" + item.factor;
        if (item.isCur) {
            $(id).attr('src', boss_active);
            $(id).hasClass('no_active') ? $(id).removeClass('no_active') : "";
            $(id).hasClass('active') ? "" : $(id).addClass("active");
            $('#Job_Hot_Degree').html("职位热度：" + item.name);
            $('#Job_Hot_Degree + p').html(text[item.factor]);

        } else {
            $(id).attr('src', boss_no_active);
            $(id).hasClass('no_active') ? "" : $(id).addClass('no_active');
            $(id).hasClass('active') ? $(id).removeClass("active") : "";
        }
    });
    //个人综合竞争力
    _PAGE.position / _PAGE.commNum > 0.5 && (1 - (_PAGE.position / _PAGE.commNum)) != 0 ? $("#rank").html("个人综合竞争力：超过了" + parseInt((1 - (_PAGE.position / _PAGE.commNum)) * 100) + "%") : "";
    _PAGE.position / _PAGE.commNum < 0.5 && _PAGE.position / _PAGE.commNum > 0 ? $("#rank").html("个人综合竞争力：排名前" + parseInt(_PAGE.position * 100 / _PAGE.commNum) + "%的人") : "";
    _PAGE.position / _PAGE.commNum == 0 || (1 - (_PAGE.position / _PAGE.commNum)) == 0 ? $("#rank").html("个人综合竞争力：超过了1%的人") : "";

    //产品卡片链接
    $(".work_card").click(function(e) {
        var url = $(this).data("url");
        if (url) {
            window.location.href = url;
        }
    });
    //立即开聊、立即沟通
    if (!_PAGE.isFriend) {
        $(".start_chat").show();
        $(".sub").html("立即沟通");
    }
    //设定评估时间
    $(".evaluate_time").html("评估时间：" + new Date().toISOString().slice(0, 10));
    //使用次数
    setTimeout(function() {
        $(".competition_show > p").hide();
    }, 2000);
    //匹配度提示
    $('.tip').click(function(e) {
        $(".tip span").show();
        stopPropagation(e);
    });
    //阻止冒泡
    function stopPropagation(e) {
        if (e.stopPropagation)
            e.stopPropagation();
        else
            e.cancelBubble = true;
    }
    //全局关闭tip提示框
    // $(document).click(function(e) {
    //     alert(123);
    //     $(".tip span").hide();
    // })
    $(document).on("click touchstart", function(e) {
        // alert(123);
        $(".tip span").hide();
    });
})
