const fs = require('fs');
var shell = require('shelljs');

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
    const cronFilePath = './.node-persist/jobs.crontab';
    if (fs.existsSync(cronFilePath)) {
        fs.unlinkSync(cronFilePath);
    }
    fs.closeSync(fs.openSync(cronFilePath, 'w'));
    jobs.forEach(job => {
        let cronEntry = makeCommand(job) + ` >> /var/log/${job.name}.log 2>&1 \n`;
        fs.appendFileSync(cronFilePath, cronEntry);
    });
    restartCron();
};

const makeCommand = (job) => {
    return `${job.cron.trim()} ${job.commandType.trim()} ${job.command.trim()}`;
};

const restartCron = () => {
    const serviceBinary = shell.which("service");
    const result = shell.exec(`${serviceBinary} cron reload`);
}

module.exports = { getBiggest, rewriteCronFile }
