"use strict";

$(document).ready(function () {

    var sheet = window.document.styleSheets[0]
    sheet.insertRule('div.fader { opacity: 0.5; background: #000; width: 100%; height: 100%; z-index: 10; top: 0; left: 0; position: fixed; }');

    $('[data-toggle="popover"]').data("trigger", "manual");
    $('.navbar-toggle').click(function () {
        $('[data-toggle="popover"]').popover("destroy");
    });

    var showNextPopover = function (nextPopover) {
        $('[data-toggle="popover"]').popover("destroy");
        $('.helpButton').data("pos", nextPopover.data('help'));
        if (nextPopover.length == 0) {
            $('.helpButton').html("Help")
            $('.fader').remove();
            $('.helpButton').data("pos", 0);
        } else if (nextPopover.hasClass("disabled-popover")) {
            showNextPopover($('[data-help="' + (nextPopover.data('help') + 1) + '"]'))
        } else {
            nextPopover.popover("show");
            $(".popover").click(function () {
                showNextPopover($('[data-help="' + (nextPopover.data('help') + 1) + '"]'))
            })
        }
    }
    var helpClick = function (event) {
        $('.navbar-toggle[aria-expanded=true]').click()
        if (!$('.helpButton').data('pos')) {
            $('.helpButton').data("pos", 1);
            $('body').append($("<div>").addClass("fader"));
            $('.helpButton').html("Next hint")
        } else {
            $('.helpButton').data("pos", $('.helpButton').data('pos') + 1);
        }
        var nextPopover = $('[data-help="' + $('.helpButton').data('pos') + '"]');
        showNextPopover(nextPopover);
    }

    $('.helpButton').css('position', 'relative');
    $('.helpButton').css('z-index', 11);
    $('.helpButton').click(helpClick);
});
    