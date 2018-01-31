$(document).ready(function() {
    var temp1, temp2, ktemp1, ktemp2 = 585, p1, p2, k, v, r = 287, w;
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
                var values = { "userInput1": ktemp2, "userInput2": v, "userInput3": w };

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
        temp1 = 20 + Math.floor(Math.random() * 100);
        ktemp1 = temp1 + 273;

        p1 = Math.round(((Math.random() * 0.5) + 0.1 ) * 100) / 100; 
        p2 = Math.round(((Math.random() * 1.5) + 0.6 ) * 100) / 100; 
        k = 1.4;
        
        ktemp2 = Math.round(ktemp1 * Math.pow((p2/p1), ((k-1)/k)) * 100 ) / 100;
        v = Math.round((r * ktemp2)/(p2 * 1000000) * 100) / 100;
        w = Math.round(((r / (k-1) * (ktemp1 - ktemp2))/1000) * 100) / 100; 

        console.log(ktemp2, v, w);

        initalize();

    }

    function initalize() {
        $(".temp1").html(temp1);
        $(".ktemp1").html(ktemp1);
        $(".p1").html(p1);
        $(".p2").html(p2);

        $(".ktemp2").html(ktemp2);
        $(".v").html(v);
        $(".w").html(w);
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

    generateRandom();
    initalize();
});