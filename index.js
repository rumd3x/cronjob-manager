const express = require("express");
const storage = require("node-persist");
const routes = require("./routes/routes");

(async function() {
    await storage.init();
    const app = express();
    routes.register(app);
})();
