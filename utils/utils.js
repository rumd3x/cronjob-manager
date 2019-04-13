const fs = require('fs');

const getBiggest = (property, array) => {
    let biggest = null;
    array.forEach(element => {
        if (element[property] === undefined) {
            return;
        }
        if (biggest === null) {
            biggest = element[property];
        }
        if (element[property] > biggest) {
            biggest = element[property];
        }
    });
    return biggest;
};

const rewriteCronFile = (jobs) => {
    const cronFilePath = './node-persist/jobs.crontab';
    if (fs.existsSync(cronFilePath)) {
        fs.unlinkSync(cronFilePath);
    }
    fs.closeSync(fs.openSync(cronFilePath, 'w'));
    jobs.forEach(job => {
        let cronEntry = makeCommand(job) + ` >> /var/log/${job.name}.log 2>&1 \n`;
        fs.appendFileSync(cronFilePath, cronEntry);
    });
};

const makeCommand = (job) => {
    return `${job.cron.trim()} ${job.commandType.trim()} ${job.command.trim()}`;
};

module.exports = { getBiggest, rewriteCronFile }
