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
        ktemp2 = 488.87,
        t2 = 215.87,
        ktemp4 = 583.16,
        nt = 0.4,
        nt0 = 21761.73,
        nk0 = 10933.9,
        ngtk0 = 10827.83;

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
                    "userInput1": t2,
                    "userInput2": t4,
                    "userInput3": nt
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
        // t1 = Math.floor(Math.random() * 10) + 10;
        // t3 = Math.floor(Math.random() * 250) + 650;
        p2 = beta;

        ktemp1 = t1 + 273;
        ktemp3 = t3 + 273;

        ktemp2 = Math.round(ktemp1 * Math.pow(p2 / p1, (k - 1) / k) * 100) / 100;
        ktemp4 = Math.round(ktemp3 * ktemp1 / ktemp2 * 100) / 100;
        t2 = ktemp2 - 273;
        t4 = ktemp4 - 273;

        nt = Math.round((1 - (1 / Math.pow(beta, (k - 1) / k))) * 100) / 100;

        nt0 = Math.round(D * cp * (t3 - t4) * 100) / 100;
        nk0 = Math.round(D * cp * (t2 - t1) * 100) / 100;
        ngtk0 = nt0 - nk0;

        t5 = Math.round(((t2 - t1) / nkoi + 20) * 100) / 100;
        t6 = Math.round((t3 - ntoi * (t3 - t4)) * 100) / 100;
        ktemp5 = t5 + 273;
        ktemp6 = t5 + 273;

        ngtki = Math.round(((t3 - t6) - (t5 - t1)) / (t3 - t5) * 100) / 100;
        ntd = Math.round(D * cp * (t3 - t6) * 100) / 100;
        nkd = Math.round(D * cp * (t5 - t1) * 100) / 100;

        ngtud = ntd - nkd;
        console.log(t1,t3);
        console.log("t_2 = " + t2, "t_4 = " + t4);
        console.log("nt = " + nt);
        console.log("nt0 = " + nt0, "nk0 = " + nk0, "ngtk0 = " + ngtk0);
        console.log("t5 = " + t5, "t6 = " + t6);
        console.log("ngtki = " + ngtki, "ntd = " + ntd, "nkd = " + nkd);
        console.log("ngtud = " + ngtud);
        // initalize();

    }

    function initalize() {
        $(".t1").html(t1);
        $(".t3").html(t3);
        $(".p1").html(p1);
        $(".p2").html(p2);
        $(".volume1").html(volume1);

        $(".ktemp2").html(ktemp2);
        $(".volume").html(volume);
        $(".work").html(work);
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

    // generateRandom();
    // initalize();
});
