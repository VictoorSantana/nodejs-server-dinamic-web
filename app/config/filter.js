

const { Op } = require("sequelize");

module.exports = {
    onlyNumbers: function (value) {
        if (value) {
            return Number((value + '').replace(/[^0-9.]/g, ''));
        } else {
            return 0;
        }
    },

    clone: function (value) {
        if (value) {
            return JSON.parse(JSON.stringify(value));
        } else {
            return null;
        }
    },

    makeNumber(inputValue, defaultValue = 0) {
        if (inputValue) {
            let v = (inputValue + '');
            v = v.replace(/[^0-9.]/g, '');

            if (isNaN(Number(v))) {
                return defaultValue
            } else {
                Number(v);
            }
        }
        return defaultValue;
    },

    bellongsArray: function (valueCheck, array) {
        return array.indexOf(valueCheck) > -1
    },

    onlyLetters: function (value) {
        console.log('onlyLetters', value);
        if (value) {
            return value.replace(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g, '');
        }
        return false;
    },

    isOnlyLetters: function (value) {
        if (value) {
            return value.match(/[^A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]/g) === null;
        }
        return false;
    },

    urlFy: function (value = '') {
        let url = value + '';
        url = url.replace(/[^a-zA-Z0-9 ]/g, '');
        url = url.replace(new RegExp(' ', 'g'), '-');
        url = url.replace(new RegExp('--', 'g'), '-');
        url = url.toLowerCase();
        return url;
    },


    resume: function (query, attrs = []) {
        /* paginate begin */
        const sorted = query.sorted;
        const attr = query.attr;

        let order = [];
        if (sorted && attr) { order.push([attr, sorted]); }

        const page = isNaN(Number(query.page)) ? 0 : Number(query.page);
        const limit = isNaN(Number(query.limit)) ? 20 : Number(query.limit);

        const offset = page * limit;

        const paginate = { offset, limit, order };
        /* paginate end */

        /* where begin */
        let where = {};

        for (var i = 0; i < attrs.length; i++) {
            const param = attrs[i];

            if (query[param.key]) {

                if (param.op === 'like%') {
                    where[param.colunm] = { [Op.startsWith]: query[param.key] };

                } else if (param.op === '%like') {
                    where[param.colunm] = { [Op.endsWith]: query[param.key] };

                } else if (param.op === '%like%') {
                    where[param.colunm] = { [Op.substring]: query[param.key] };

                } else if (param.op === '>') {
                    where[param.colunm] = { [Op.gt]: query[param.key] };

                } else if (param.op === '>=') {
                    where[param.colunm] = { [Op.gte]: query[param.key] };

                } else if (param.op === '<') {
                    where[param.colunm] = { [Op.lt]: query[param.key] };

                } else if (param.op === '<=') {
                    where[param.colunm] = { [Op.lte]: query[param.key] };

                } else if (param.op === 'between') {
                    where[param.colunm] = { [Op.between]: (query[param.key] + '').split(',') };

                } else if (param.op === '=') {
                    where[param.colunm] = query[param.key];

                } else if (param.op === '!=') {
                    where[param.colunm] = { [Op.ne]: query[param.key] };

                } else {
                    where[param.colunm] = query[param.key];
                }
            }
        }
        /* where end */

        return { query, paginate, where };
    }

}