$(document).ready(function() {
    var p1, temp1, lambda, k = 1.41,
        r = 287,
        ktemp1, volume1, e = 6,
        volume2v = 0.19,
        p2 = 1.25,
        ktemp2 = 833.88,
        volume3 = 0.19,
        p3 = 4.38,
        ktemp3 = 2921.92,
        volume4 = 1.15,
        ktemp4 = 1401.61,
        p4 = 0.35,
        cv = 20.9,
        q1 = 21820.02,
        q2 = 721.85,
        q0 = 21098.17,
        ut0 = 0.97,
        utkarno = 0.86;
    var allCorrect = false;
    var correctCount = 0;
    var correctArrays = [];

    $("#userForms").submit(function(event) {
        //Take length of all activve inputs
        correctArrays = new Array($('.user_input_field.active input[type="text"]').length);

        //Fill array with zero
        correctArrays.fill(0);

        //Prevent update of page
        event.preventDefault();
        //Bool to check if inputs are valid
        var isValid = true;

        //Check All inputs
        $('.user_input_field.active input[type="text"]').each(function() {
            //If input is not numerical
            if (!$.isNumeric($(this).val())) {
                isValid = false;
                wrongInput($(this));

            }
            //Else check
            else {
                var input = $(this);
                var inputId = input.attr("id");
                var inputVal = input.val();

                //Dictionary with correct values
                var values = {
                    "userInput1": volume2v,
                    "userInput2": p2,
                    "userInput3": ktemp2,
                    "userInput4": volume3,
                    "userInput5": p3,
                    "userInput6": ktemp3,
                    "userInput7": volume4,
                    "userInput8": ktemp4,
                    "userInput9": p4,
                    "userInput10": q1,
                    "userInput11": q2,
                    "userInput12": q0,
                    "userInput13": ut0,
                    "userInput14": utkarno
                };


                //Check if key is equal to Input id attribute
                $.each(values, function(key, value) {
                    if ((inputId == key) && (inputVal == value)) {
                        //If correct call correctInput()
                        correctInput(input);
                        //Fill Array index with 1
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

    function generateRandom() {
        p1 = Math.round(((Math.random() * 0.5) + 0.1) * 100) / 100;
        temp1 = Math.floor(Math.random() * 100) + 100;
        lambda = Math.round(((Math.random() * 5.5) + 1.5) * 10) / 10;

        // p1 = 0.1;
        // temp1 = 127;
        // lambda = 3.5;
        ktemp1 = temp1 + 273;

        //Step 1
        volume1 = Math.round(r * ktemp1 / Math.pow(10, 5) * 100) / 100;

        volume2v = Math.round(volume1 / e * 100) / 100;
        p2 = Math.round(p1 * Math.pow(e, k) * 100) / 100;
        ktemp2 = Math.round(ktemp1 * Math.pow(e, k - 1) * 100) / 100;

        //Step 2
        volume3 = volume2v;
        p3 = Math.round(p2 * lambda * 100) / 100;
        ktemp3 = Math.round(ktemp2 * p3 / p2 * 100) / 100;

        //Step 3
        volume4 = volume1;
        ktemp4 = Math.round(ktemp3 / Math.pow(e, k - 1) * 100) / 100;
        p4 = Math.round((r * ktemp4) / (volume4 * 1000000) * 100) / 100;

        //Step 4
        q1 = Math.round(cv * (ktemp3 - ktemp2) / 2 * 100) / 100;
        q2 = Math.round(cv * (ktemp4 - ktemp1) / 29 * 100) / 100;
        q0 = Math.round((q1 - q2) * 100) / 100;

        ut0 = Math.round(q0 / q1 * 100) / 100;

        utkarno = Math.round((1 - ktemp1 / ktemp3) * 100) / 100;

        initalize();
    }

    function initalize() {
        $(".p1").html(p1);
        $(".temp1").html(temp1);
        $(".lambda").html(lambda);

        $(".ktemp1").html(ktemp1);
        $(".volume1").html(volume1);

        $(".volume2v").html(volume2v);
        $(".p2").html(p2);
        $(".ktemp2").html(ktemp2);

        $(".volume3").html(volume3);
        $(".p3").html(p3);
        $(".ktemp3").html(ktemp3);

        $(".volume4").html(volume4);
        $(".ktemp4").html(ktemp4);
        $(".p4").html(p4);

        $(".q1").html(q1);
        $(".q2").html(q2);
        $(".q0").html(q0);

        $(".ut0").html(ut0);
        $(".utkarno").html(utkarno);


        console.log("Step 1 " + volume1, volume2v, p2, ktemp2);
        console.log("Step 2 " + "volume3 " + volume3, "p3 " + p3, "ktemp3 " + ktemp3);
        console.log("Step 3 " + "volume4 " + volume4, "ktemp4 " + ktemp4, "p4 " + p4);
        console.log("Step 4 " + "q1 " + q1, "q2 " + q2, "q0 " + q0, "ut0 " + ut0, "utkarno " + utkarno);
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
        }, 1000);
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
