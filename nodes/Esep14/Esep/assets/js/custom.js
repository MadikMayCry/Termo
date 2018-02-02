$(document).ready(function() {
    var t1,
        t2,
        t3,
        t4,
        ktemp1,
        ktemp2 = 328.8,
        ktemp3,
        ktemp4 = 221.7,
        ik = 76.7,
        itd = 67.1,
        i0 = 9.6,
        q2 = 31.27,
        e = 3.29,
        ek = 7.2,
        k = 1.4,
        cp = 1.012;
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
                    "userInput1": ktemp4,
                    "userInput2": ktemp2,
                    "userInput3": ik,
                    "userInput4": itd,
                    "userInput5": i0,
                    "userInput6": q2,
                    "userInput7": e,
                    "userInput8": ek,
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
        p1 = Math.round(((Math.random() * 0.4)) * 100) / 100;
        p2 = Math.round(((Math.random() * 0.5) + 0.5) * 100) / 100;
        t1 = Math.floor((Math.random() < 0.5 ? -1 : 1) * Math.random() * 50);
        t3 = Math.floor(Math.random() * 50) + 50;

        ktemp1 = t1 + 273;
        ktemp3 = t3 + 273;
        console.log("ktemp1 " + ktemp1, "ktemp3 " + ktemp3);

        ktemp4 = Math.round(ktemp3 * Math.pow((p1 / p2), ((k - 1) / k)) * 10) / 10;
        ktemp2 = Math.round(ktemp1 * Math.pow((p2 / p1), ((k - 1) / k)) * 10) / 10;

        ik = Math.round(cp * (ktemp2 - ktemp1) * 10) / 10;
        itd = Math.round(cp * (ktemp3 - ktemp4) * 10) / 10;
        i0 = Math.round((ik - itd) * 10) / 10;

        q2 = Math.round(cp * (ktemp1 - ktemp4) * 10) / 10;
        e = Math.round(q2 / i0 * 10) / 10;
        ek = Math.round(ktemp1 / (ktemp3 - ktemp4) * 10) / 10;

        console.log(ktemp4, ktemp2);
        console.log(ik, itd, i0);
        console.log(q2, e, ek);
        console.log(" ");

        initalize();
    }

    function initalize() {
        $(".p1").html(p1);
        $(".p2").html(p2);
        $(".t1").html(t1);
        $(".t3").html(t3);

        $(".ktemp4").html(ktemp4);
        $(".ktemp2").html(ktemp2);

        $(".ik").html(ik);
        $(".itd").html(itd);
        $(".i0").html(i0);

        $(".q2").html(q2);
        $(".e").html(e);
        $(".ek").html(ek);
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
