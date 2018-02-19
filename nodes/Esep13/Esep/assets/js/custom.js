$(document).ready(function() {

    var
        randomValsOne = {
            .1: [2257.51, 0.001043, 1.694, 417.436, 2674.95, 1.30279, 7.36],
            .4: [2132.95, 0.001084, 0.4624, 604.723, 2738.06, 1.777, 6.896],
            .5: [2108.23, 0.001093, 0.3748, 640.185, 2748.11, 1.8611, 6.822],
            .6: [2085.98, 0.001101, 0.31558, 670.501, 2756.14, 1.9316, 6.76]
        };

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

    function randomKey(obj) {
        var c = 0;
        for (var key in obj) {
            if (Math.random() < 1 / ++c)
                ret = key;
        }
        return ret;
    }



    function generateRandom() {

        randKey = randomKey(randomValsOne);
        r1 = randomValsOne[randKey][0];
        v11 = randomValsOne[randKey][1];
        v12 = randomValsOne[randKey][2];
        i11 = randomValsOne[randKey][3];
        i12 = randomValsOne[randKey][4];
        s11 = randomValsOne[randKey][5];
        s12 = randomValsOne[randKey][6];

        a1 = Math.round((i001 - i002) / (i01 - i001) * 100) / 100;
        a2 = Math.round((i002 - i20 - a1 * (i001 - i002)) / (i02 - i002) * 100) / 100;
        ntp = Math.round((i1 - i2 - a1 * (i01 - i2) - a2 * (i01 - i2)) / (i01 - i001) * 100) / 100;

        // initalize();

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
