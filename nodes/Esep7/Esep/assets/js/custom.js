$(document).ready(function() {
    var temp1, temp2, ktemp1, p1, p2, k = 1.2,
        velocity, volume1, volume = 39.6,
        ktemp2 = 401.09,
        r, work = 456;

    var correctCount = 0;
    var correctArrays = [];
    var sum = 0;
    var allnonactiveCorrect = $('.user_input_field input[type="text"]').length;
    var allactiveCorrect;

    $("#userForms").submit(function(event) {

        allnonactiveCorrect = $('.user_input_field input[type="text"]').length;
        allactiveCorrect = $('.user_input_field.active input[type="text"]').length;


        correctArrays = new Array(allactiveCorrect);


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
                    "userInput1": ktemp2,
                    "userInput2": volume,
                    "userInput3": work
                };

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
        temp1 = 20 + Math.floor(Math.random() * 100);
        ktemp1 = temp1 + 273;

        p1 = Math.round(((Math.random() * 0.5) + 0.1) * 100) / 100;
        p2 = Math.round(((Math.random() * 1.5) + 0.6) * 100) / 100;
        volume1 = Math.floor(Math.random() * 100) + 100;
        console.log(p1, p2, volume1);

        ktemp2 = Math.round(ktemp1 * Math.pow((p2 / p1), ((k - 1) / k)) * 100) / 100;
        volume = Math.round(volume1 / (Math.pow(p2 / p1, (1 / 1.2))) * 100) / 100;

        work = Math.round(k / (k - 1) * p1 * 10 * volume1 * (Math.pow(p2 / p1, (k - 1 / k)) - 1) * 100) / 100;

        console.log(ktemp2, volume);

        initalize();

    }

    function initalize() {
        $(".temp1").html(temp1);
        $(".ktemp1").html(ktemp1);
        $(".p1").html(p1);
        $(".p2").html(p2);
        $(".volume1").html(volume1);

        $(".ktemp2").html(ktemp2);
        $(".volume").html(volume);
        $(".work").html(work);
    }

    function mark(sum, marks) {
        $("#mark").show();
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

    function allCorrectCheck(argument) {
        return argument == 1;
    }
});
