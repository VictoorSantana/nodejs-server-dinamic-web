const jwt = require('jsonwebtoken');


module.exports = {
    request: function (schema = null) {
        return (req, res, next) => {

            if (schema) {
                const { error, value } = schema.validate(req.body);
                if (error) {
                    return res.status(401).send(error.details[0].message);
                }
                req.value = value;
            }

            const bearerHeader = req.headers['authorization'];

            if (bearerHeader) {
                const bearerToken = bearerHeader.split(' ')[1];

                return jwt.verify(bearerToken, process.env.SERVER_KEY, (err, decoded) => {
                    if (err) {
                        return res.status(401).send('Must authenticate to obtain the requested response.');
                    } else {
                        req.user = decoded.user;
                        return next();
                    }
                });
            } else {
                return res.status(401).send('Authorization not founded!');
            }
        }
    },



    validate: function (schema) {
        return (req, res, next) => {
            const { error, value } = schema.validate(req.body);
            if (error) {
                return res.status(401).send(error.details[0].message);
            }
            req.value = value;
            return next();
        }
    },

    meta: function (values, query) {
        const clone = JSON.parse(JSON.stringify(values));

        const page = isNaN(Number(query.page)) ? 0 : Number(query.page);
        const limit = isNaN(Number(query.limit)) ? 5 : Number(query.limit);

        return {
            rows: clone.rows,
            meta: {
                count: clone.count,
                page: page,
                limit: limit,
                total: Math.ceil(clone.count / limit)
            }
        }
    },
}