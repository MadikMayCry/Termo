$(document).ready(function() {

    //Variables
    var
        p1 = 60,
        p2 = 36,
        t1 = 100,
        k = 1.4,
        r1 = 26.5,
        r2 = 259.8125,
        g = 9.81,
        f = 20 * Math.pow(10, -6),
        c2 = 722.7903,
        v1 = 0.0165,
        G = 0.2557,
        c2b = 722.5782,
        v2 = 0.0238,
        m = 0.6072,
        beta;

    var allCorrect = false;
    var correctCount = 0;
    var correctArrays = [];

    $("#userForms").submit(function(event) {
        //Active inputs length
        correctArrays = new Array($('.user_input_field.active input[type="text"]').length);
        correctArrays.fill(0);

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
                    "userInput1": c2,
                    "userInput2": v1,
                    "userInput3": G,
                    "userInput4": c2b,
                    "userInput5": v2,
                    "userInput6": m
                };

                $.each(values, function(key, value) {
                    if ((inputId == key) && (inputVal == value)) {
                        correctInput(input);
                        correctArrays[correctCount] = 1;
                        if (correctArrays.every(allCorrectCheck)) {
                            console.log("all correct");
                            $(input).parent().parent().next(".user_input_field").slideDown().addClass("active");
                        }
                        return false;
                    } else {
                        wrongInput(input);
                        correctArrays[correctCount] = 0;
                    }
                });
                correctCount++;
            }
        });
        console.log(correctArrays.toString());
        correctCount = 0;

        if (!isValid) {
            Materialize.toast('Неверный ввод данных', 4000);
        }
    });

    $("#show_solution").click(show_answers);

    $("#generateRandom").click(generateRandom);


    function generateRandom() {

        t1 = Math.floor(Math.random() * 150);
        p1 = Math.round(Math.floor(Math.random() * 40) + 40);
        p2 = Math.round(Math.floor(Math.random() * 15) + 25);


        console.log(t1, p1, p2);
        beta = Math.round(p1 / p2 * 100) / 100;


        ktemp1 = t1 + 273;
        c2 = Math.round(Math.sqrt(2 * g * k / (k - 1) * r1 * ktemp1 * Math.pow(1 - (p2 / p1), (k - 1) / k)) * 10000) / 10000;
        nextp1 = p1 * Math.pow(10, 4);
        v1 = Math.round(r1 * ktemp1 / (nextp1) * 10000) / 10000;
        G = Math.round(f * Math.sqrt(2 * g * k / (k - 1) * (nextp1 / v1) * (Math.pow((p2 / p1), 2 / k) - Math.pow((p2 / p1), (k + 1) / k))) * 10000) / 10000;

        c2b = Math.round(Math.sqrt(2 * k / (k - 1) * r2 * ktemp1 * Math.pow(1 - (p2 / p1), (k - 1) / k)) * 10000) / 10000;
        v2 = Math.round(v1 * Math.pow((p1 / p2), 1 / k) * 10000) / 10000;
        m = Math.round(f * c2b / v2 * 10000) / 10000;
        console.log("T1 = " + ktemp1, c2, v1, G, c2b, v2, m);


        initalize();
    }

    function initalize() {
        $(".p1").html(p1);
        $(".p2").html(p2);
        $(".t1").html(t1);
        $(".c2").html(c2);
        $(".v1").html(v1);
        $(".G").html(G);
        $(".c2b").html(c2b);
        //
        // $(".qt").html(qt);
        //
        //
        // $(".i11").html(i11);
        // $(".i12").html(i12);
        // $(".i21").html(i21);
        // $(".i22").html(i22);
        //
        // //answers
        // $(".vx").html(vx);
        // $(".x2").html(x2);
        // $(".i1").html(i1);
        // $(".i2").html(i2);
        // $(".qv").html(qv);
        // $(".time").html(time);

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
    }

    function show_answers(argument) {
        $(".answers").slideDown();
        $('html, body').animate({
            scrollTop: $("#solution").offset().top
        });
    }

    function allCorrectCheck(argument) {
        return argument == 1;
    }

});
