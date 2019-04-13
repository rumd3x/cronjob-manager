const format = require("date-fns/format");

class Job {
    constructor(name, cron, command, commandType) {
        this.id = null;
        this.name = name;
        this.cron = cron;
        this.command = command;
        this.commandType = commandType;
        this.createdAt = Date();
        this.updatedAt = Date();
    }

    static validate(object) {
        let errors = [];
        if (!object.hasOwnProperty('name')) {
            errors.push(`Missing property "name" on request body`);
        }

        if (!object.hasOwnProperty('cron')) {
            errors.push(`Missing property "cron" on request body`);
        }

        if (!object.hasOwnProperty('command')) {
            errors.push(`Missing property "command" on request body`);
        }

        if (!object.hasOwnProperty('commandType')) {
            errors.push(`Missing property "commandType" on request body`);
        }
        return errors;
    }
}

module.exports = Job;
