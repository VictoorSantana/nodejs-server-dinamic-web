
const layoutRepository = require('../layout/layout.repository');
const sectionRepository = require('../section/section.repository');
const pluginRepository = require('../plugin/plugin.repository');
const articleRepository = require('../article/article.repository');

const { clone, urlFy } = require('../../config/filter');

const conn = require('../../config/connection');
const { wrapperDefault } = require('../../config/buildPage');
const HttpError = require('../../config/error');
const { saveHtml } = require('../../config/cache');

sectionRepository.belongsTo(layoutRepository, { as: 'layout', foreignKey: 'id_layout' });
articleRepository.belongsTo(layoutRepository, { as: 'layout', foreignKey: 'id_layout' });

module.exports = {

    buildHome: async function (query) {
        // console.time();

        const newData = await conn.query(`
        SELECT s.id, s.title, l.plugins FROM sections s
        LEFT JOIN layouts l ON l.id = s.id_layout
        WHERE s.id = ${1};`, { type: "SELECT" });      
        
        if(!newData[0]) {
            console.log('\x1b[31m', 'Página inicial, ou seção com ID 1, não encontrado!');
        }

        const result = await this.buildPluginHtml(newData[0]?.plugins, newData[0].title);        


        saveHtml(result, '');

        // console.timeEnd();
        return result;
    },


    buildArticle: async function (slug, id, query) {
        const newData = await conn.query(`
        SELECT s.id, s.title, l.plugins FROM articles s
        LEFT JOIN layouts l ON l.id = s.id_layout
        WHERE s.id = ${id};`, { type: "SELECT" });   

        if (!newData[0]) {
            throw new HttpError('Página não encontrada.', 404);
        }

        if (slug !== urlFy(newData[0]?.title)) {
            throw new HttpError('Página não encontrada.', 404);
        }

        const result = await this.buildPluginHtml(newData[0]?.plugins, newData[0]?.title, id);

        saveHtml(result, `/artigo/${slug}/${id}`);
        return result;
    },


    buildSection: async function (slug, id, query) {
        const newData = await conn.query(`
        SELECT s.id, s.title, l.plugins FROM sections s
        LEFT JOIN layouts l ON l.id = s.id_layout
        WHERE s.id = ${id};`, { type: "SELECT" });     

        if (!newData[0]) {
            throw new HttpError('Página não encontrada.', 404);
        }        

        if (slug !== urlFy(newData[0]?.title)) {
            throw new HttpError('Página não encontrada.', 404);
        }

        const result = await this.buildPluginHtml(newData[0]?.plugins, newData[0].title, id);

        saveHtml(result, `/secao/${slug}/${id}`);
        return result;
    },

    buildPluginHtml: async function (idLayoutPlugins = '', pageTitle = '', idParamPage = 0) {

        const generalPlugins = idLayoutPlugins.split(',');
        const responsePlugins = await conn.query(`
        SELECT p.id, p.id_plugin, p.id_args, p.place 
        FROM dynamic.plugins p
        WHERE p.id IN (${generalPlugins})
        ORDER BY FIND_IN_SET(p.id, '${generalPlugins}');`
        , { type: "SELECT" });  

        const pluginsData = clone(responsePlugins);

        let headerHtml = '';
        let leftBarHtml = '';
        let rightBarHtml = '';
        let centerHtml = '';
        let footerHtml = '';

        let customScriptHtml = '';

        for (let j = 0; j < pluginsData.length; j++) {

            const pluginData = pluginsData[j];
            const plugin = require(`../../plugins/${pluginData.id_plugin}`);

            if (plugin) {
                try {
                    const args = pluginData.id_args === '0' ? idParamPage : pluginData.id_args.split(',');
                    const pluginHtml = await plugin.render(conn, args, pluginData.id);

                    if (pluginData.place === 'header') {
                        headerHtml += pluginHtml;

                    } else if (pluginData.place === 'footer') {
                        footerHtml += pluginHtml;

                    } else if (pluginData.place === 'center') {
                        centerHtml += pluginHtml;

                    } else if (pluginData.place === 'rightBar') {
                        rightBarHtml += pluginHtml;

                    } else if (pluginData.place === 'leftBar') {
                        leftBarHtml += pluginHtml;

                    }

                } catch (ex) {
                    console.log(ex);
                    customScriptHtml += `console.error('Fail to try render plugin (${pluginData.id_plugin})');`
                }
            } else {
                customScriptHtml += `console.error('Plugin not founded, ID (${pluginData.id_plugin})');`
            }
        }

        return wrapperDefault(pageTitle, headerHtml, leftBarHtml, centerHtml, rightBarHtml, footerHtml, customScriptHtml);

    }
}