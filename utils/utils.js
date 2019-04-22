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
        if (job.active) {
            let cronEntry = makeCommand(job) + ` >> /var/log/${job.name}.log 2>&1 \n`;
            fs.appendFileSync(cronFilePath, cronEntry);
        }
    });
    restartCron();
};

const makeCommand = (job) => {
    return `${job.cron.trim()} ${job.commandType.trim()} ${job.command.trim()}`;
};

const restartCron = () => {
    shell.exec(`cat /usr/src/app/.node-persist/jobs.crontab | crontab`);
    shell.exec(`service cron reload`);
}

const getLogs = (job) => {
    return {
        cron: shell.exec(`tail -n 200 /var/log/${job.name}.log 2>/dev/null`),
        container: shell.exec(`docker logs --timestamps --tail 200 ${job.command}`)
    }
}

const getCronStatus = () => {
    return {
        entries: shell.exec("crontab -l"),
        status: shell.exec("service cron status")
    };
}

module.exports = { getBiggest, rewriteCronFile, getLogs, getCronStatus }
