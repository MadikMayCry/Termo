$(document).ready(function() {

    //Variables
    var
        p1 = 60,
        p2 = 36,
        t1 = 100,
        k = 1.4,
        r = 26.5,
        g = 9.81,
        f = 20 * Math.pow(10, -6),
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
                    "userInput1": vx
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

    function randomKey(obj) {
        var c = 0;
        for (var key in obj) {
            if (Math.random() < 1 / ++c)
                ret = key;
        }
        return ret;
    }

    function generateRandom() {
        beta = Math.round(p1 / p2 * 100) / 100;
        ktemp1 = t1 + 273;
        c2 = Math.sqrt(2 * g * k / (k - 1) * r * ktemp1 * Math.pow(1 - (p2 / p1), (k - 1) / k));
        nextp1 = p1 * Math.pow(10, 4);

        v1 = r * ktemp1 / (nextp1);
        G = f * Math.sqrt(2 * g * k / (k - 1) * (nextp1 / v1) * (Math.pow((p2 / p1), 2 / k) - Math.pow((p2 / p1), (k + 1) / k)));
        console.log(c2, v1, G);



        initalize();
    }

    function initalize() {
        // $(".p1").html(p1);
        // $(".p2").html(p2);
        // $(".r1").html(r1);
        // $(".r2").html(r2);
        // $(".v11").html(v11);
        // $(".v12").html(v12);
        //
        // $(".v21").html(v21);
        // $(".v22").html(v22);
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
