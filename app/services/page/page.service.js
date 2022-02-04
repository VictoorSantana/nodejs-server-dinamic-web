
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
        const response = await sectionRepository.findAll({
            where: { id: 1 },
            include: [
                {
                    model: layoutRepository, as: 'layout'
                }
            ]
        });

        const data = clone(response);
        const pageData = data[0];
        const layoutData = pageData.layout;

        const result = await this.buildPluginHtml(layoutData?.plugins, pageData.title);
        saveHtml(result, '');

        return result;
    },


    buildArticle: async function (slug, id, query) {
        const response = await articleRepository.findAll({
            where: { id },
            attributes: ['id', 'id_layout', 'title'],
            include: [
                {
                    model: layoutRepository, as: 'layout'
                }
            ]
        });

        const data = clone(response);

        if (!data[0]) {
            throw new HttpError('Página não encontrada.', 404);
        }

        const pageData = data[0];
        const layoutData = pageData.layout;

        if (slug !== urlFy(pageData?.title)) {
            throw new HttpError('Página não encontrada.', 404);
        }

        const result = await this.buildPluginHtml(layoutData?.plugins, pageData.title, id);

        saveHtml(result, `/artigo/${slug}/${id}`);
        return result;
    },


    buildSection: async function (slug, id, query) {
        const response = await sectionRepository.findAll({
            where: { id },
            attributes: ['id', 'id_layout', 'title'],
            include: [
                {
                    model: layoutRepository, as: 'layout'
                }
            ]
        });

        const data = clone(response);

        if (!data[0]) {
            throw new HttpError('Página não encontrada.', 404);
        }

        const pageData = data[0];
        const layoutData = pageData.layout;

        if (slug !== urlFy(pageData?.title)) {
            throw new HttpError('Página não encontrada.', 404);
        }

        const result = await this.buildPluginHtml(layoutData?.plugins, pageData.title, id);

        saveHtml(result, `/secao/${slug}/${id}`);
        return result;

    },

    buildPluginHtml: async function (idLayoutPlugins = '', pageTitle = '', idParamPage = 0) {

        const responsePlugins = await pluginRepository.findAll({
            where: { id: idLayoutPlugins.split(',') }
        });

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