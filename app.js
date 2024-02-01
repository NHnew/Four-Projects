"use strict";

$(document).ready(function () {

    $("#hamburgerMenuOpen").click(function (e) {
        e.preventDefault();

        if ($(this).attr('src') === 'assets/x2.png') {
            $("nav").css({
                "right": "-100%",
                "transition": "1s"
            });
            $(this).attr('src', 'assets/menuNEW.png');
        } else {
            $(this).attr('src', 'assets/x2.png');
            $("nav").css({
                "right": "0",
                "transition": "1s"
            });
        }
    });



    $(".homeLink, nav a").click(function () {
        $("nav").css({
            "right": "-100%",
            "transition": "0.5s"
        });
        $("#hamburgerMenuOpen").attr('src', 'assets/menuNEW.png');
    });



    let languageMappings;

    $.getJSON('translate.json', data => (languageMappings = data, changeLanguage('AZ')));

    function changeLanguage(code) {
        $('[data-translate]').each(function () {
            const key = $(this).data('translate');
            if (languageMappings && languageMappings[code] && languageMappings[code][key]) {
                $(this).text(languageMappings[code][key]);
            }

            if ($(this).is('input')) {
                $(this).attr("placeholder", languageMappings[code][key]);
            }
            if ($(this).is('textarea')) {
                $(this).attr("placeholder", languageMappings[code][key]);
                $(this).val('');
            }
            if ($(this).is('input[type="submit"]')) {
                $(this).val(languageMappings[code][key]);
            }
        });
    }


    $('#language').click(function (e) {
        e.preventDefault();
        const current = $(this).text();
        const next = current === 'AZ' ? 'EN' : 'AZ';
        $(this).text(next);
        changeLanguage(next);
        updateHomeH1();
    });


    let h1Text = $("#home .textbox h1").text();
    let index = 0;

    function writeText() {
        if (index < h1Text.length) {
            $("#home .textbox h1").text(h1Text.substring(0, index + 1));
            index++;
            setTimeout(writeText, 100);
        } else {
            setTimeout(eraseText, 1000);
        }
    }

    function eraseText() {
        if (index >= 0) {
            $("#home .textbox h1").text(h1Text.substring(0, index));
            index--;
            setTimeout(eraseText, 50);
        } else {
            index = 0;
            setTimeout(writeText, 500);
        }
    }


    function updateHomeH1() {
        let currentLanguage = $('#language').text();
        let translatedText = languageMappings[currentLanguage]['homeH1'];

        $("#home .textbox h1").text(translatedText);
        h1Text = translatedText;
    }

    writeText();
});






