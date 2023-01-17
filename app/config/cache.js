


const fs = require('fs');

module.exports = {

    exist: function (folderName = '', query = '') {
        try {
            const tes = require(`../../public/cache/${folderName}/${query}.json`);
            return tes;
        } catch (ex) {
            return null;
        }
    },


    save: function (values = {}, folderName = '', query = '') {

        if (!fs.existsSync(`${__dirname}/../../public/cache/${folderName}/`)) {
            fs.mkdirSync(`${__dirname}/../../public/cache/${folderName}/`, { recursive: true });
        }

        fs.writeFile(`${__dirname}/../../public/cache/${folderName}/${query}.json`, JSON.stringify(values), (err) => {
            if (err) { console.error(err); return; };
            console.log("Cache JSON has been created");
        });
    },


    delete(folderName = '') {
        fs.rmdirSync(`${__dirname}/../../public/cache/${folderName}/`, { recursive: true });
    },


    existHtml: function (folderName = '') {
        try {
            const tes = require(`../../public${folderName}/index.html`);
            return tes;
        } catch (ex) {
            return null;
        }
    },

    saveHtml: function (values = '', folderName = '') {
        if(process.env.CLIENT_CACHE === 'true') {
            if (!fs.existsSync(`${__dirname}/../../public${folderName}/`)) {
                fs.mkdirSync(`${__dirname}/../../public${folderName}/`, { recursive: true });
            }
    
            fs.writeFile(`${__dirname}/../../public${folderName}/index.html`, values, (err) => {
                if (err) { console.error(err); return; };
                console.log(`Novo cache HTML criado: ${folderName}`);
            });
        } else {
            console.log('\x1b[33m%s\x1b[0m', 'O ENV de cache está desligado/desativado!');
        }        
    },

    deleteHtml(folderName = '') {
        fs.rmdirSync(`${__dirname}/../../public${folderName}/`, { recursive: true });
    },

}