$(document).ready(function() {
    var t1 = 20,
        t3 = 700,
        p1 = 1,
        beta = 6,
        k = 1.4,
        cp = 2 * Math.pow(10, 5),
        D = 8.314 * 7 / (2 * 28.96 * 3600),
        ntoi = 0.87,
        nkoi = 0.85,
        t2 = 215.87,
        t4 = 310.16,
        nt = 0.4,
        nt0 = 21761.73,
        nk0 = 10933.9,
        ngtk0 = 10827.83,
        t5 = 250.44,
        t6 = 360.84,
        ngtki = 0.24,
        ntd = 18932.66,
        nkd = 12863.67,
        ngtud = 6068.99;
    var correctCount = 0;
    var correctArrays = [];
    var sum = 0;
    var allnonactiveCorrect = $('.user_input_field input[type="text"]').length;
    var allactiveCorrect;
    $("#userForms").submit(function(event) {
        //Take length off all inputs and active inputs
        allnonactiveCorrect = $('.user_input_field input[type="text"]').length;
        allactiveCorrect = $('.user_input_field.active input[type="text"]').length;

        //Take length of all activve inputs
        correctArrays = new Array(allactiveCorrect);

        //Fill array with zero
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
                    "userInput1": t2,
                    "userInput2": t4,
                    "userInput3": nt,
                    "userInput4": nt0,
                    "userInput5": nk0,
                    "userInput6": ngtk0,
                    "userInput7": t5,
                    "userInput8": t6,
                    "userInput9": ngtki,
                    "userInput10": ntd,
                    "userInput11": nkd,
                    "userInput12": ngtud

                };
                //Check if key is equal to Input id attribute
                $.each(values, function(key, value) {
                    if ((inputId == key) && (inputVal == value)) {
                        correctInput(input);
                        correctArrays[correctCount] = 1;

                        sum = correctArrays.reduce((a, b) => a + b, 0);

                        if (correctArrays.every(allCorrectCheck)) {
                            console.log("all correct");
                            $(input).parent().parent().next(".user_input_field").slideDown().addClass("active");



                            console.log("Sum of corrects = " + sum);

                            if (allnonactiveCorrect == allactiveCorrect) {
                                mark(sum, allnonactiveCorrect);
                            }

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
        t1 = Math.floor(Math.random() * 10) + 10;
        t3 = Math.floor(Math.random() * 250) + 650;

        p1 = Math.round(((Math.random() * 2) + 0.5) * 100) / 100;
        beta = Math.floor(Math.random() * 4) + 2;
        p2 = beta;

        ktemp1 = t1 + 273;
        ktemp3 = t3 + 273;

        ktemp2 = Math.round(ktemp1 * Math.pow(p2 / p1, (k - 1) / k) * 100) / 100;
        ktemp4 = Math.round(ktemp3 * ktemp1 / ktemp2 * 100) / 100;
        t4 = Math.round((ktemp4 - 273) * 100) / 100;
        t2 = Math.round((ktemp2 - 273) * 100) / 100;

        nt = Math.round((1 - (1 / Math.pow(beta, (k - 1) / k))) * 100) / 100;

        nt0 = Math.round(D * cp * (t3 - t4) * 100) / 100;
        nk0 = Math.round(D * cp * (t2 - t1) * 100) / 100;
        ngtk0 = Math.round((nt0 - nk0) * 100) / 100;

        t5 = Math.round(((t2 - t1) / nkoi + 20) * 100) / 100;
        t6 = Math.round((t3 - ntoi * (t3 - t4)) * 100) / 100;
        ktemp5 = t5 + 273;
        ktemp6 = t5 + 273;

        ngtki = Math.round(((t3 - t6) - (t5 - t1)) / (t3 - t5) * 100) / 100;
        ntd = Math.round(D * cp * (t3 - t6) * 100) / 100;
        nkd = Math.round(D * cp * (t5 - t1) * 100) / 100;

        ngtud = Math.round((ntd - nkd) * 100) / 100;
        console.log(t1, t3);
        console.log("t_2 = " + t2, "t_4 = " + t4);
        console.log("nt = " + nt);
        console.log("nt0 = " + nt0, "nk0 = " + nk0, "ngtk0 = " + ngtk0);
        console.log("t5 = " + t5, "t6 = " + t6);
        console.log("ngtki = " + ngtki, "ntd = " + ntd, "nkd = " + nkd);
        console.log("ngtud = " + ngtud);
        initalize();

    }

    function initalize() {
        $(".t1").html(t1);
        $(".t3").html(t3);
        $(".p1").html(p1);
        $(".p2").html(p2);
        $(".beta").html(beta);

        $(".t2").html(t2);
        $(".t4").html(t4);

        $(".nt").html(nt);

        $(".nt0").html(nt0);
        $(".nk0").html(nk0);
        $(".ngtk0").html(ngtk0);

        $(".t5").html(t5);
        $(".t6").html(t6);

        $(".ngtki").html(ngtki);
        $(".ntd").html(ntd);
        $(".nkd").html(nkd);
        $(".ngtud").html(ngtud);
    }

    function mark(sum, marks) {
        $("#mark").show();
        console.log(sum + " sum");
        sum = Math.round((sum / marks) * 100 * 100) / 100;
        $("#markValue").html(sum);
        $("#markSend").html('<a href="problem' + sum + '">Завершить задачу</a>');
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
        $("#generateRandom").prop("disabled", true);
        $("button:submit").prop("disabled", true);

        $(".answers").slideDown();
        $('html, body').animate({
            scrollTop: $("#solution").offset().top
        }, 1000);

        mark(sum, allnonactiveCorrect);
    }

    //Return 1 if all active inputs are correct
    function allCorrectCheck(argument) {
        return argument == 1;
    }

    // generateRandom();
    // initalize();
});
