$(document).ready(function() {
    var p = 2,
        p1 = 0.1,
        t1 = 20,
        e = 12.7,
        k = 1.4,
        r = 287,
        cp1 = 1.01174,
        cp2 = 0.7241,
        v1 = 0.84,
        v2 = 0.07,
        t2 = 518.66,
        p2 = 3.25,
        v3 = 0.14,
        t3 = 1310.32,
        p3 = 3.25,
        v4 = 0.84,
        t4 = 488.8,
        p4 = 0.26,
        q1 = 800.95,
        q2 = 339.46,
        nt = 0.58,
        l0 = 461.49,
        nt;
    var allCorrect = false;
    var correctCount = 0;
    var correctArrays = [];

    $("#userForms").submit(function(event) {
        //Variables
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
                    "userInput1": v1,
                    "userInput2": v2,
                    "userInput3": t2,
                    "userInput4": p2,
                    "userInput5": v3,
                    "userInput6": t3,
                    "userInput7": p3,
                    "userInput8": v4,
                    "userInput9": t4,
                    "userInput10": p4,
                    "userInput11": q1,
                    "userInput12": q2,
                    "userInput13": nt,
                    "userInput14": l0

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

    function generateRandom() {
        p1 = Math.round(((Math.random() * 1.5)) * 100) / 100;
        t1 = Math.floor((Math.random() * 200) + 250);
        e = Math.round(((Math.random() * 5) + 10) * 100) / 100;

        ktemp1 = t1 + 273;

        //1 nukte
        v1 = Math.round(r * ktemp1 / (p1 * Math.pow(10, 6)) * 100) / 100;

        //2 nukte
        v2 = Math.round(v1 / e * 100) / 100;

        ktemp2 = Math.round(ktemp1 * Math.pow(v1 / v2, k - 1) * 100) / 100;
        t2 = ktemp2 - 273;

        p2 = Math.round(r * ktemp2 / (v2 * Math.pow(10, 6)) * 100) / 100;

        //3 nukte
        v3 = Math.round(v2 * p * 100) / 100;

        ktemp3 = Math.round(ktemp2 * p * 100) / 100;
        t3 = ktemp3 - 273;

        p3 = p2;

        //4 nukte
        v4 = v1;

        p4 = Math.round(p3 / Math.pow(v4 / v3, k) * 100) / 100;

        ktemp4 = Math.round(ktemp1 * p4 / p1 * 100) / 100;
        t4 = Math.round((ktemp4 - 273) * 100) / 100;

        q1 = Math.round(cp1 * (t3 - t2) * 100) / 100;
        q2 = Math.round(cp2 * (t4 - t1) * 100) / 100;

        nt = Math.round((q1 - q2) / q1 * 100) / 100;
        l0 = Math.round((q1 - q2) * 100) / 100;

        console.log("v1 = " + v1, "v2 = " + v2, "t2 = " + t2, "p2 = " + p2);
        console.log("v3 = " + v3, "t3 = " + t3, "p3 = " + p3);
        console.log("v4 = " + v4, "p4 = " + p4, "t4 = " + t4);
        console.log("q1 = " + q1, "q2 = " + q2);
        console.log("nt = " + nt, "l0 = " + l0);

        initalize();
    }

    function initalize() {
        $(".p1").html(p1);
        $(".t1").html(t1);
        $(".e").html(e);
        $(".v1").html(v1);
        $(".v2").html(v2);
        $(".v3").html(v3);
        $(".v4").html(v4);
        $(".ktemp2").html(ktemp2);
        $(".t2").html(t2);
        $(".ktemp3").html(ktemp3);
        $(".t3").html(t3);
        $(".ktemp4").html(ktemp4);
        $(".t4").html(t4);
        $(".p2").html(p2);
        $(".p3").html(p3);
        $(".p4").html(p4);

        $(".q1").html(q1);
        $(".q2").html(q2);

        $(".nt").html(nt);
        $(".l0").html(l0);

        // console.log(v1, v2);
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
        }, 1000);
    }

    function allCorrectCheck(argument) {
        return argument == 1;
    }

    $("#show_solution").click(show_answers);

    $("#generateRandom").click(generateRandom);

    // generateRandom();
    // initalize();
});
