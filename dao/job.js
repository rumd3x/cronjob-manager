const storage = require("node-persist");
const utils = require("../utils/utils");

class JobDao {
    async list() {
        let data = await storage.getItem("jobs");
        if (data === undefined) {
            return [];
        }
        return data.sort((a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
        }).sort((a, b) => {
            if (a.active && b.active) return 0;
            if (a.active) return -1;
            if (b.active) return 1;
            return 0;
        });
    }

    async insert(job) {
        let list = await this.list();

        if (job.id === null) {
            let biggestId = utils.getBiggest('id', list);
            job.id = biggestId+1;
        }

        list.push(job);
        await storage.setItem("jobs", list);

        return true;
    }

    async find(id) {
        let list = await this.list();
        let result = list.filter((obj) => { return obj.id == id});
        if (result.length === 0) {
            return null;
        }
        return result[0];
    }

    async delete(id) {
        let list = await this.list();
        let result = list.filter((obj) => { return obj.id != id});
        if (list.length === result.length) {
            return false;
        }
        await storage.setItem("jobs", result);
        return true;
    }

    async update(job) {
        if (job.id === null) {
            return false;
        }
        if (!await this.delete(job.id)) {
            return false;
        }
        job.updatedAt = Date();
        if (!await this.insert(job)) {
            return false;
        }
        return true;
    }
}

const jobDao = new JobDao();
module.exports = jobDao;
