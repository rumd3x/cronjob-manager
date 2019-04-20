const express = require("express");
const storage = require("node-persist");
const routes = require("./routes/routes");
const utils = require("./utils/utils");
const jobDao = require("./dao/job");



(async function() {
    await storage.init();
    utils.rewriteCronFile(await jobDao.list());

    const app = express();
    routes.register(app);
})();
