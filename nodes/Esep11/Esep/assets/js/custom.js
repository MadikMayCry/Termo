$(document).ready(function() {

    //Variables
    var
        randomValsOne = {
            0.02: [1777.211, 73.45],
            0.03: [1800.656, 101],
            0.04: [1818.096, 121.4],
            0.05: [1832.109, 137.77],
            0.06: [1843.883, 151.5],
        },
        randomValsTwo = {
            7: [450, 3288.169],
            8: [550, 3521.772],
            8.5: [512, 3423.282],
            9: [500, 3387.310],
            11: [475, 3295.64]
        },
        p1 = 9,
        t1 = 500,
        p2 = 0.04,
        i1 = 3387.31,
        i2 = 1818.096,
        i22 = 121.4,
        N = 50,
        nt = 0.48,
        d0 = 2.29,
        D0 = 114.5;

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
                    "userInput1": nt,
                    "userInput2": d0,
                    "userInput3": D0
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
        i2 = randomValsOne[randKey][0];
        i22 = randomValsOne[randKey][1];
        p2 = randKey;

        randKey2 = randomKey(randomValsTwo);
        t1 = randomValsTwo[randKey2][0];
        i1 = randomValsTwo[randKey2][1];
        p1 = randKey2;

        nt = Math.round(((i1 - i2) / (i1 - i22)) * 100) / 100;
        d0 = Math.round(3600 / (i1 - i2) * 100) / 100;
        D0 = Math.round(d0 * N * 100) / 100;
        console.log(p1, p2);
        console.log(nt, d0, D0);

        initalize();
    }

    function initalize() {
        $(".p1").html(p1);
        $(".p2").html(p2);

        $(".t1").html(t1);
        $(".i1").html(i1);

        $(".i2").html(i2);
        $(".i22").html(i22);

        $(".nt").html(nt);
        $(".d0").html(d0);
        $(".D0").html(D0);

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

});
