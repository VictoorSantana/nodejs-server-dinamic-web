const { defaultArticleWithContent } = require("../../config/management");



module.exports = {
    render: async function(conn, keys = [], myId = 0) {
        const values = await defaultArticleWithContent(keys[0]);

        return `
        <div class="row">
            <h4 class="text-primary">${values[0].short}</h4>
            <h2 class="text-dark">${values[0].title}</h2>
            <p class="text-dark">${values[0].complement}</p>
        </div>
        <br><br>
        <div class="row">
            ${values[0].content}
        </div>
        `;
    },

    getMetaData: function () {
        return {
            id: 3,
            thumb: 'lcon3.png',
            keys: ['CON'],
            version: '1.0',
            weight: 3, // 1 - 10,
            keysPositions: [
                { left: '0px', top: '0px', width: '60px', height: '60px' },
            ]
        };
    },
}