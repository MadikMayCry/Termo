$(document).ready(function() {
    //Variables
    var temp1, temp2b, temp2a, nta, ntb, bigT1, bigT2b, bigT2a, answer = 4.16;

    $("#userForms").submit(function(event) {
        event.preventDefault();

        var isValid = true;
        $('.user_input_field.active input[type="text"]').each(function() {
            if (!$.isNumeric($(this).val())) {
                isValid = false;
                wrongInput($(this));
            } else {
                var input = $(this);
                var inputId = $(this).attr("id");
                var inputVal = $(this).val();
                var values = {
                    "userInput1": answer
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


    //Generate random variables
    function generateRandom() {
        temp1 = 1500 + Math.floor(Math.random() * 1000);
        temp2a = 150 + Math.floor(Math.random() * 250);
        temp2b = 50 + Math.floor(Math.random() * 125);


        bigT1 = temp1 + 273;
        bigT2a = temp2a + 273;
        bigT2b = temp2b + 273;

        nta = Math.round((1.0 - (bigT2a / bigT1)) * 100)/100;
        ntb = Math.round((1.0 - (bigT2b / bigT1)) * 100)/100;
        answer = Math.round(( ((ntb - nta) / ntb) * 100) * 100) / 100;
        initalize();
    }

    function initalize() {
        $(".temp1").html(temp1);
        $(".temp2a").html(temp2a);
        $(".temp2b").html(temp2b);

        $(".bigT1").html(bigT1);
        $(".bigT2b").html(bigT2b);
        $(".bigT2a").html(bigT2a);

        $(".nta").html(nta);
        $(".ntb").html(ntb);
        $(".answer").html((answer));

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
        $(argument).parent().nextAll(".user_input_field").slideDown().addClass("active");
    }

    function show_answers(argument) {
        $(".answers").slideDown();
        $('html, body').animate({
            scrollTop: $("#solution").offset().top
        }, 1000);
    }

});