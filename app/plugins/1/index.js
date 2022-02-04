const { defaultCoverArticles } = require("../../config/management");


module.exports = {

    render: async function (conn, keys = [], myId = 0) {
        const values = await defaultCoverArticles(keys);
        return `        
        <div class="container">
            <div class="row">
                ${values.map((value, index) => `
                <div class="col-md-3" key="${index}">
                    <a href="${value?.url || '#'}" class="d-block mb-1">
                        <img src="${value?.image}" ratio-height="1.5" class="ratio-height d-inline-block w-100" alt="image">
                        <h5> ${value.short} </h5>
                        <p class="text-dark">
                            ${value.title}
                        </p>
                    </a>
                </div>`).join('')
            }
            </div>
        </div>
        `;
    },


    getMetaData: function () {
        return {
            id: 1,
            thumb: '1642804503850.png',
            keys: ['CON', 'CON', 'CON'],
            version: '1.0',
            weight: 3, // 1 - 10,
            keysPositions: [
                { left: '0px', top: '0px', width: '60px', height: '60px' },
                { left: '60px', top: '0px', width: '60px', height: '60px' },
                { left: '120px', top: '0px', width: '60px', height: '60px' },
            ]
        };
    }

}