const { defaultArticlesFromSection } = require("../../config/management");



module.exports = {
    render: async function(conn, keys = [], myId = 0) {
        const values = await defaultArticlesFromSection(keys[0], 3);

        return `
            <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <a href="${values[0].url}" class="d-block">
                        <img src="${values[0].image}" ratio-height="1.65" class="ratio-height d-inline-block w-100" alt="image">
                        <h5> ${values[0].short} </h5>
                        <p class="text-dark">
                            ${values[0].title}
                        </p>
                    </a>
                </div>
                <div class="col-md-4">
                    <div class="row">
                        <div class="col-md-12">
                            <a href="${values[1].url}" class="d-block">
                                <img src="${values[1].image}" ratio-height="2" class="ratio-height d-inline-block w-100" alt="image">
                                <h5> ${values[1].short} </h5>
                                <p class="text-dark">
                                    ${values[1].title}
                                </p>
                            </a>
                        </div>
                        <div class="col-md-12">
                            <a href="${values[2].url}" class="d-block">
                                <img src="${values[2].image}" ratio-height="2" class="ratio-height d-inline-block w-100" alt="image">
                                <h5> ${values[2].short} </h5>
                                <p class="text-dark">
                                    ${values[2].title}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    },


    getMetaData: function () {
        return {
            id: 2,
            thumb: 'lcon2.png',
            keys: ['LCON'],
            version: '1.0',
            weight: 3, // 1 - 10,
            keysPositions: [
                { left: '0px', top: '0px', width: '60px', height: '60px' },
            ]
        };
    }
}