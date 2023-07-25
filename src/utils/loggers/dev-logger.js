const {
    format,
    createLogger,
    transports
} = require('winston');

const {
    timestamp,
    combine,
    printf,
    errors
} = format;

const fecha = new Date();
const dia = fecha.getDate()
const mes = fecha.getMonth()
const anio = fecha.getFullYear()

// console.log(dia + '-' + mes + '-' + anio);

function buildDevLogger() {

    const logFormat = printf(({
        level,
        message,
        timestamp,
        stack
    }) => {
        return `${timestamp} | level: ${level} | message: ${stack || message} `;
    });

    return createLogger({
        format: combine(
            // format.colorize(),s
            timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            errors({
                stack: true
            }),
            logFormat
        ),
        // defaultMeta: {service: 'user-service'},
        transports: [
            new transports.Console(),
            new transports.File({
                maxsize: 1048576,
                filename: `${__dirname}/../../loggers-registrados/dev-loggers.log`,
            })
        ],
    });
}


module.exports = buildDevLogger;