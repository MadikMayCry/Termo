$(document).ready(function() {
    var qp = 45200;
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
                    "userInput1": qp,
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

    function generateRandom() {
        pbo = Math.floor(Math.random() * 30000) + 20000;
        h2o = Math.floor(Math.random() * 30000) + 20000;
        pbo2 = Math.floor(Math.random() * 40000) + 20000;
        qp = pbo + h2o - pbo2;
        initalize();

    }

    function initalize() {
        $(".pbo").html(pbo);
        $(".h2o").html(h2o);
        $(".pbo2").html(pbo2);
        $(".qp").html(qp);
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


    $("#show_solution").click(show_answers);

    $("#generateRandom").click(generateRandom);

    // generateRandom();
    // initalize();
});
