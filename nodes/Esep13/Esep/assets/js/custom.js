$(document).ready(function() {

    var
        randomValsOne = {
            1: [833, 488, 653, 594, 152, 104, 29, 90, 5, 1.2, 0.04],
            2: [733, 358, 453, 494, 112, 83, 23, 75, 5, 1.2, 0.044],
            3: [654, 372, 389, 412, 89, 72, 20, 63, 5, 1.2, 0.056],
            4: [1024, 612, 712, 675, 190, 124, 32, 93, 5, 1.2, 0.09],
            5: [1243, 699, 705, 635, 184, 154, 45, 112, 13, 3.5, 0.1],
        };

    var correctCount = 0;
    var correctArrays = [];
    var sum = 0;
    var cons = 4.1868,
        constime = 3.6,
        ntp = 0.61,
        d1 = 2.82,
        nt = 0.43,
        d2 = 2.49,
        nnt = 41.86;
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
                    "userInput1": ntp,
                    "userInput2": d1,
                    "userInput3": nt,
                    "userInput4": d2,
                    "userInput5": nnt,
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
        i1 = randomValsOne[randKey][0];
        i2 = randomValsOne[randKey][1];
        i01 = randomValsOne[randKey][2];
        i02 = randomValsOne[randKey][3];
        i001 = randomValsOne[randKey][4];
        i002 = randomValsOne[randKey][5];
        i20 = randomValsOne[randKey][6];
        p1 = randomValsOne[randKey][7];
        p01 = randomValsOne[randKey][8];
        p02 = randomValsOne[randKey][9];
        p001 = randomValsOne[randKey][10];

        a1 = Math.round((i001 - i002) / (i01 - i001) * 100) / 100;
        a2 = Math.round((i002 - i20 - a1 * (i001 - i002)) / (i02 - i002) * 100) / 100;
        lc = Math.round((i1 - i2 - a1 * (i01 - i2) - a2 * (i01 - i2)) * 100) / 100;
        ntp = Math.round(lc / (i01 - i001) * 100) / 100;
        d1 = Math.round(Math.pow(10, 3) / (lc * cons) * constime * 100) / 100;
        nt = Math.round((i1 - i2) / (i1 - i20) * 100) / 100;
        lc2 = Math.round((i1 - i2) * 100) / 100;
        d2 = Math.round(Math.pow(10, 3) / (lc2 * cons) * constime * 100) / 100;
        nnt = Math.round((ntp - nt) / nt * 100 * 100) / 100;

        console.log(a1, a2, "NTP " + ntp, d1, "NT " + nt, d2, nnt);
        initalize();

    }

    function initalize() {
        $(".p1").html(p1);
        $(".p01").html(p01);
        $(".p02").html(p02);
        $(".p001").html(p001);


        $(".a1").html(a1);
        $(".a2").html(a2);


        $(".i1").html(i1);
        $(".i2").html(i2);
        $(".i01").html(i01);
        $(".i02").html(i02);
        $(".i001").html(i001);
        $(".i002").html(i002);
        $(".i20").html(i20);

        $(".ntp").html(ntp);
        $(".d1").html(d1);
        $(".nt").html(nt);
        $(".d2").html(d2);
        $(".nnt").html(nnt);

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
