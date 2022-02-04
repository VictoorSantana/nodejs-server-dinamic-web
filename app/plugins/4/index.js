const { defaultArticlesFromSection, getPluginClassNames, setPluginClassNames } = require("../../config/management");

const defaultClassNames = {
    divColImage: {
        description: "Tamanho da área no desktop da imagem",
        className: "col-md-4"
    },
    divColParag: {
        description: "Tamanho da área no desktop da texto",
        className: "col-md-8",
    },
    headingText: {
        description: "Variante do texto de titulo",
        className: "h5 text-primary"
    }, 
    paragText: {
        description: "Variante do texto do sub-titulo",
        className: "p text-dark"
    }
};


module.exports = {
    render: async function (conn, keys = [], myId = 0) {
        const values = await defaultArticlesFromSection(keys[0], 3);
        let { classNames } = await getPluginClassNames(myId);

        
        if(!classNames) {
            setPluginClassNames(myId, defaultClassNames);
            classNames = defaultClassNames;
        }

        return `
       ${values.map(value => `
                <div class="row mb-2">
                    <div class="${classNames.divColImage.className}">
                        <a href="${value.url}" class="d-inline-block w-100">
                            <img src="${value.image}" class="d-inline-block w-100" alt="articleimage"> 
                        </a>
                    </div>
                    <div class="${classNames.divColParag.className}">
                        <a href="${value.url}" class="d-inline-block w-100">
                            <h5 class="${classNames.headingText.className}">${value.title}</h5>
                            <p class="${classNames.paragText.className}">
                                ${value.complement}
                            </p>
                        </a>
                    </div>
                </div>
       `).join('')}
        `;
    },


    getMetaData: function () {
        return {
            id: 4,
            thumb: 'lcon4.png',
            keys: ['LCON'],
            version: '1.0',
            weight: 4, // 1 - 10,
            keysPositions: [
                { left: '0px', top: '0px', width: '60px', height: '60px' },
            ]
        };
    },


    getDefaultClassNames: function () {
        return defaultClassNames;
    }
}