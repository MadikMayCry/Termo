$(document).ready(function() {
    var randomVals = [2, 2.5, 5],
        rand, vx, ix, px, sx;
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

                break;
            case 2.5:
                console.log("random is 2.5");

                break;
            case 5:
                console.log("random is 5");

                break;
        }


        initalize();
    }

    function initalize() {
        $(".p").html(p);
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
