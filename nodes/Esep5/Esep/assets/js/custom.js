$(document).ready(function() {

    var randomVals = [2, 2.5, 5],
        rand, vx = 0.0799,
        ix = 2420.744,
        px = 12.51564,
        sx = 9.56809,
        th, r, v1, v2, i1, i2, s1, s2, x = 0.8;
    $("#userForms").submit(function(event) {
        //Variables
        event.preventDefault();
        var isValid = true;
        $('.user_input_field.active input[type="text"]').each(function() {
            if (!$.isNumeric($(this).val())) {
                isValid = false;
                wrongInput($(this));
            } else {
                var input = $(this);
                var inputId = input.attr("id");
                var inputVal = input.val();
                var values = {
                    "userInput1": vx,
                    "userInput2": ix,
                    "userInput3": px,
                    "userInput4": sx,
                };

                $.each(values, function(key, value) {
                    if ((inputId == key) && (inputVal == value)) {
                        correctInput(input);
                        return false;
                    } else {
                        wrongInput(input);
                    }
                });
            }
        });

        if (!isValid) {
            Materialize.toast('Неверный ввод данных', 4000);
        }
    });

    $("#show_solution").click(show_answers);

    $("#generateRandom").click(generateRandom);

    function generateRandom() {
        p = randomVals[Math.floor(Math.random() * randomVals.length)];
        console.log(p);

        switch (p) {
            case 2:
                console.log("random is 2");
                th = 212.42;
                r = 1890.03;
                v1 = 0.001177;
                v2 = 0.09958;
                i1 = 908.72;
                i2 = 2798.75;
                s1 = 2.45;
                s2 = 6.34;

                break;
            case 2.5:
                console.log("random is 2.5");
                th = 223.99;
                r = 1840.23;
                v1 = 0.011974;
                v2 = 0.07994;
                i1 = 962.007;
                i2 = 2802.24;
                s1 = 2.55;
                s2 = 6.25;

                break;

            case 5:
                console.log("random is 5");
                th = 263.98;
                r = 1639.54;
                v1 = 0.001286;
                v2 = 0.03945;
                i1 = 1154.23;
                i2 = 2793.77;
                s1 = 2.92;
                s2 = 5.97;

                break;
            default:
                break;
        }

        vx = Math.round(((v1 * (1 - x)) + v2 * x) * 100000) / 100000;
        ix = Math.round((i1 + r * x) * 100000) / 100000;
        px = Math.round(1 / vx * 100000) / 100000;
        sx = Math.round((s1 + (r * x) / th) * 100000) / 100000;


        initalize();
    }

    function initalize() {
        $(".p").html(p);
        $(".th").html(th);
        $(".r").html(r);
        $(".v1").html(v1);
        $(".v2").html(v2);
        $(".i1").html(i1);
        $(".i2").html(i2);
        $(".s1").html(s1);
        $(".s2").html(s2);


        $(".vx").html(vx);
        $(".ix").html(ix);
        $(".px").html(px);
        $(".sx").html(sx);

        console.log(vx, ix, px, sx);
    }

    function wrongInput(argument) {
        $(argument).removeClass("correct");
        $(argument).addClass("wrong");
        setTimeout(function() {
            $(argument).removeClass("wrong");
        }, 2000);
    }

    function correctInput(argument) {
        $(argument).removeClass("wrong");
        $(argument).addClass("correct");
        $(argument).parent().parent().next(".user_input_field").slideDown().addClass("active");
    }

    function show_answers(argument) {
        $(".answers").slideDown();
        $('html, body').animate({
            scrollTop: $("#solution").offset().top
        }, 1000);
    }

});
