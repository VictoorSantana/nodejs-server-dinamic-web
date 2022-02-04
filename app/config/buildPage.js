


module.exports = {

    wrapperDefault: function (
        title = '',
        headerHtml = '',
        leftBar = '',
        center = '',
        rightBar = '',
        footer = '',
        customScript = ''
    ) {

        return `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${title}</title>
                <link rel="stylesheet" href="/assets/css/theme.css">
                <link rel="stylesheet" href="/assets/css/custom.css">
            </head>
            <body>
                <!-- Header -->
                ${headerHtml}

                <div class="container">
                    <div class="row">

                        ${leftBar ? `
                        <div class="col-md-4">
                            <!-- Left Bar -->
                            ${leftBar}
                        </div>
                        ` : ''}

                        <div class="col-md-${leftBar && rightBar ? '4' : '8'}">
                            <!-- Center -->
                            ${center}
                        </div>

                        ${rightBar ? `
                        <div class="col-md-4">
                            <!-- Right Bar -->
                            ${rightBar}
                        </div>
                        ` : ''}
                    </div>
                </div>


                <!-- Footer -->
                ${footer}
            </body>
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
            integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
            integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s" crossorigin="anonymous"></script>
            <script src="/assets/scripts/general.js"></script>
            
            <script>
            ${customScript}
            </script>
            </html>
        `;
    }

}