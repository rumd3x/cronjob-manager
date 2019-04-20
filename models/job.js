class Job {
    constructor(name, cron, command, commandType, active) {
        this.id = null;
        this.name = name;
        this.cron = cron;
        this.command = command;
        this.commandType = commandType;
        this.active = active;
        this.createdAt = Date();
        this.updatedAt = Date();
    }

    static validate(object) {
        let errors = [];
        if (!object.hasOwnProperty('name')) {
            errors.push(`Missing property "name" on request body`);
        } else if (!object.name) {
            errors.push(`Property "name" cannot be empty`);
        }

        if (!object.hasOwnProperty('cron')) {
            errors.push(`Missing property "cron" on request body`);
        } else if (!object.cron) {
            errors.push(`Property "cron" cannot be empty`);
        }

        if (!object.hasOwnProperty('command')) {
            errors.push(`Missing property "command" on request body`);
        } else if (!object.command) {
            errors.push(`Property "command" cannot be empty`);
        }

        if (!object.hasOwnProperty('commandType')) {
            errors.push(`Missing property "commandType" on request body`);
        } else if (!object.commandType) {
            errors.push(`Property "commandType" cannot be empty`);
        }

        if (!object.hasOwnProperty('active')) {
            errors.push(`Missing property "active" on request body`);
        }
        return errors;
    }
}

module.exports = Job;
