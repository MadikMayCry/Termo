$(document).ready(function() {

    //Variables
    var
        randomValsOne = {
            .1: [2257.51, 0.001043, 1.694, 417.436, 2674.95, 1.30279, 7.36],
            .4: [2132.95, 0.001084, 0.4624, 604.723, 2738.06, 1.777, 6.896],
            .5: [2108.23, 0.001093, 0.3748, 640.185, 2748.11, 1.8611, 6.822],
            .6: [2085.98, 0.001101, 0.31558, 670.501, 2756.14, 1.9316, 6.76]
        },
        randomValsTwo = {
            1: [2014.4, 0.001127, 0.1943, 762.6, 2777, 2.1382, 6.585],
            2: [1890.03, 0.001177, 0.09958, 908.72, 2798.75, 2.45, 6.34],
            2.5: [1840.23, 0.001197, 0.07994, 962.007, 2802.24, 2.55, 6.25],
            3: [1794.97, 0.001217, 0.06666, 1008.37, 2803.26, 2.64548, 6.1856],
            5: [1639.54, 0.001286, 0.03945, 1154.23, 2793.77, 2.92, 5.97]
        },

        r1, v11, v12, i11, i12, s11, s12, x1 = 0.0015,
        r2, v21, v22, i21, i22, s21, s22, m = 8250,
        i1 = 607.9224,
        i2 = 769.6504,
        vx = 0.0018,
        x2 = 0.0035,
        qv = 1334247.09,
        time = 74.1248,
        qt = 18;

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
                    "userInput1": vx,
                    "userInput2": x2,
                    "userInput3": i1,
                    "userInput4": i2,
                    "userInput5": qv,
                    "userInput6": time,
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
        r1 = randomValsOne[randKey][0];
        v11 = randomValsOne[randKey][1];
        v12 = randomValsOne[randKey][2];
        i11 = randomValsOne[randKey][3];
        i12 = randomValsOne[randKey][4];
        s11 = randomValsOne[randKey][5];
        s12 = randomValsOne[randKey][6];

        randKey2 = randomKey(randomValsTwo);
        r2 = randomValsTwo[randKey2][0];
        v21 = randomValsTwo[randKey2][1];
        v22 = randomValsTwo[randKey2][2];
        i21 = randomValsTwo[randKey2][3];
        i22 = randomValsTwo[randKey2][4];
        s21 = randomValsTwo[randKey2][5];
        s22 = randomValsTwo[randKey2][6];


        p1 = randKey;
        p2 = randKey2;

        console.log(p1);
        console.log(p2);

        qt = Math.floor(Math.random() * 10) + 10;
        vx = Math.round((v12 * x1 + (1 - x1) * v11) * 10000) / 10000;
        x2 = Math.round((vx - v21) / (v22 - v21) * 10000) / 10000;

        i1 = Math.round((i11 + r1 * x1) * 10000) / 10000;
        i2 = Math.round((i21 + r2 * x2) * 10000) / 10000;

        qv = Math.round((m * [(i2 - p2 * vx) - (i1 - p1 * vx)]) * 10000) / 10000;

        time = Math.round(qv / qt * 10) / 10000;


        initalize();
    }

    function initalize() {
        $(".p1").html(p1);
        $(".p2").html(p2);
        $(".r1").html(r1);
        $(".r2").html(r2);
        $(".v11").html(v11);
        $(".v12").html(v12);

        $(".v21").html(v21);
        $(".v22").html(v22);
        $(".qt").html(qt);


        $(".i11").html(i11);
        $(".i12").html(i12);
        $(".i21").html(i21);
        $(".i22").html(i22);

        //answers
        $(".vx").html(vx);
        $(".x2").html(x2);
        $(".i1").html(i1);
        $(".i2").html(i2);
        $(".qv").html(qv);
        $(".time").html(time);

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
        });
    }

    function allCorrectCheck(argument) {
        return argument == 1;
    }

});
