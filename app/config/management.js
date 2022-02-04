
const conn = require('./connection');

module.exports = {


    defaultCoverArticles: async function (keys = [], limit = 4) {
        let values = [];

        const data = await conn.query(`
        SELECT a.id_cover_image,
         a.id,
         a.short,
         a.title,
         a.complement,
         f.extension AS image_ext,
         f.type AS image_type,
         f.hash AS image_hash
        FROM articles a
        LEFT JOIN files f ON f.id = a.id_cover_image
        WHERE a.id IN (${keys})
        ORDER BY FIND_IN_SET(a.id, '${keys}')
        LIMIT ${limit}`, { type: "SELECT" });

        values = JSON.parse(JSON.stringify(data));
        let result = [];


        for (let j = 0; j < values.length; j++) {
            const value = values[j];


            const day = new Date(Number(value.image_hash)).getUTCDate();
            const month = new Date(Number(value.image_hash)).getMonth() + 1;
            const year = new Date(Number(value.image_hash)).getFullYear();

            const image = `/storage/${value.image_type}/${year}/${month}/${day}/${value.image_hash}.${value.image_ext}`


            let url = value.title + '';
            url = url.replace(/[^a-zA-Z0-9 ]/g, '');
            url = url.replace(new RegExp(' ', 'g'), '-');
            url = url.replace(new RegExp('--', 'g'), '-');
            url = url.toLowerCase();
            url = `/artigo/${url}/${value.id}`;

            result.push({
                title: value.title,
                short: value.short,
                complement: value.complement,
                image,
                url
            });
        };

        return result;
    },



    defaultArticlesFromSection: async function(sectionId = 0, limit = 5, orderBy = 'createdAt') {
        let values = [];

        const data = await conn.query(`
        SELECT a.id,
         a.id_cover_image,
         a.short,
         a.title,
         a.complement,
         f.extension AS image_ext,
         f.type AS image_type,
         f.hash AS image_hash
        FROM articles a
        LEFT JOIN files f ON f.id = a.id_cover_image
        WHERE a.id_section = ${sectionId} 
        ORDER BY a.${orderBy} ASC
        LIMIT ${limit}`, { type: "SELECT" });

        values = JSON.parse(JSON.stringify(data));
        let result = [];


        for (let j = 0; j < values.length; j++) {
            const value = values[j];


            const day = new Date(Number(value.image_hash)).getUTCDate();
            const month = new Date(Number(value.image_hash)).getMonth() + 1;
            const year = new Date(Number(value.image_hash)).getFullYear();

            const image = `/storage/${value.image_type}/${year}/${month}/${day}/${value.image_hash}.${value.image_ext}`


            let url = value.title + '';
            url = url.replace(/[^a-zA-Z0-9 ]/g, '');
            url = url.replace(new RegExp(' ', 'g'), '-');
            url = url.replace(new RegExp('--', 'g'), '-');
            url = url.toLowerCase();
            url = `/artigo/${url}/${value.id}`;

            result.push({
                title: value.title,
                short: value.short,
                complement: value.complement,
                image,
                url
            });
        };

        return result;
    },


    defaultArticleWithContent: async function (articleId = 0) {
        let values = [];

        const data = await conn.query(`
        SELECT a.id_cover_image,
         a.id,
         a.short,
         a.title,
         a.complement,
         a.content
        FROM articles a
        WHERE a.id = ${articleId}
        LIMIT 1`, { type: "SELECT" });

        values = JSON.parse(JSON.stringify(data));
        let result = [];


        for (let j = 0; j < values.length; j++) {
            const value = values[j];

            result.push({
                title: value.title,
                short: value.short,
                complement: value.complement,
                content: value.content,                                
            });
        };

        return result;
    },


    getPluginClassNames: async function(id = 0) {
        const data = await conn.query(`
        SELECT 
        p.classNames, 
        '' AS paramNames 
        FROM plugins p 
        WHERE p.id = ${id}
        LIMIT 1`, { type: "SELECT" });

        const values = JSON.parse(JSON.stringify(data));

        let result = {};

        try {
            result['classNames'] = values[0].classNames ? JSON.parse(values[0].classNames) : null;
        } catch (ex) {
            result['classNames'] = null;
        }

        try {
            result['paramNames'] = values[0].paramNames ? JSON.parse(values[0].paramNames) : null;
        } catch (ex) {
            result['paramNames'] = null;
        }

        return result;
    },


    setPluginClassNames: async function(id = 0, defaultValue = {}) {
        await conn.query(`
        UPDATE plugins
        SET classNames = '${JSON.stringify(defaultValue)}'
        WHERE id = ${id}`, { type: "UPDATE" });
    }






}