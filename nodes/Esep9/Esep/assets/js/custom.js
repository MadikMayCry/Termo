$(document).ready(function() {
    var p1 = 0.1, temp1 = 20, e = 12.7, k = 1.4, r = 287, volume1 = 0.84, volume2 = 0.07;
    var allCorrect = false;
    var correctCount = 0;
    var correctArrays = [];

    $("#userForms").submit(function(event) {
        //Variables
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
                var values = { "userInput1": volume1, "userInput2": volume2};

                

                $.each(values, function(key, value) {
                    if ((inputId == key) && (inputVal == value)) {
                        correctInput(input);
                        correctArrays[correctCount] = 1;
                        if(correctArrays.every(allCorrectCheck)){
                            console.log("all correct");
                            $(input).parent().parent().next(".user_input_field").slideDown().addClass("active");
                        }
                        return false;
                    } else {
                        wrongInput(input);
                        correctArrays[correctCount] = 0;
                    }
                });
                correctCount ++;
            }
            
        });
        console.log(correctArrays.toString());



        correctCount = 0;

        if (!isValid) {
            Materialize.toast('Неверный ввод данных', 4000);
        }
    });

    function generateRandom() {
        p1 = Math.round(((Math.random() * 1.5)) * 100) / 100; 
        temp1 = Math.floor((Math.random() * 200) + 250);
        ktemp1 = temp1 + 273;
        volume1 = Math.round(r * ktemp1 / (p1 * Math.pow(10, 6)) * 100) / 100;
        volume2 = Math.round( volume1 / e * 100) / 100;
        e = Math.round(((Math.random() * 5) + 10) * 100) / 100; 

        initalize();
    }

    function initalize() {
        $(".p1").html(p1);
        $(".temp1").html(temp1);
        $(".e").html(e);
        console.log(volume1, volume2);
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

    function allCorrectCheck(argument) {
        return argument == 1;
    }

    $("#show_solution").click(show_answers);

    $("#generateRandom").click(generateRandom);

    // generateRandom();
    // initalize();
});