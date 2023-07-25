const {
    format,
    createLogger,
    transports
} = require('winston');

const {
    timestamp,
    combine,
    errors,
    json
} = format;

function buildProdLogger() {

    return createLogger({
        format: combine(
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            errors({
                stack: true
            }),
            json(),
        ),
        // defaultMeta: {service: 'user-service'},
        transports: [
            new transports.Console(),
            new transports.File({
                // tambaño definido en byte
                maxsize: 1048576,
                filename: `${__dirname}/../../loggers-registrados/prod-loggers.log`,
            })
        ],
    });


}


module.exports = buildProdLogger;