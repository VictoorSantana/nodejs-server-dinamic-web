

$(document).ready(function () {
    $('.same-height').each(function () {
        $(this).css("height", $(this).width());
    });

    $('.ratio-height').each(function () {
        const width = $(this).css("width");
        const ratio = $(this).attr("ratio-height");

        if (width) {
            let result = width.replace('px', '');
            $(this).css("height", `${Number(result) / Number(ratio)}px`);
        }
    });
});
