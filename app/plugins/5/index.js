const { defaultMenuSection } = require("../../config/management");


module.exports = {

    render: async function (conn, keys = [], myId = 0) {
        const values = await defaultMenuSection(keys);
        return `        
        <div class="container">
        ${values.map(value =>
            `<a href="${value.url}" title="${value.title}" class="d-inline-block text-primary">${value.title}</a>`
        ).join('')}                    
        </div>
        `;
    },


    getMetaData: function () {
        return {
            id: 5,
            thumb: '123men.png',
            keys: ['MEN'],
            version: '1.0',
            weight: 1, // 1 - 10,
            keysPositions: [
                { left: '0px', top: '0px', width: '60px', height: '60px' },
            ]
        };
    }

}