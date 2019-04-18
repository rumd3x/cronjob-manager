const express = require("express");
const jobDao = require("../dao/job");
const Job = require("../models/job");
const utils = require("../utils/utils");

const register = (app) => {
    app.use(express.json());
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
        next();
    });

    app.use(express.static("public"));

    app.use(function (err, req, res, next) {
        console.error(err);
        res.status(500);
        res.json({message: err.message});
    });

    app.get("/api/jobs", async (req, res) => {
        let jobs = await jobDao.list();

        res.status(200);
        res.json({"data": jobs, "message": `Found ${jobs.length} jobs.`});
    });

    app.get("/api/jobs/:id", async (req, res) => {
        let job = await jobDao.find(req.params.id);

        if (!job) {
            res.status(404);
            res.json({"data": job, "message": `Could not find specified Job with id ${req.params.id}.`});
            return;
        }

        res.status(200);
        res.json({"data": job, "message": `Job with id ${req.params.id} found.`});
    });

    app.get("/api/jobs/:id/logs", async (req, res) => {
        let job = await jobDao.find(req.params.id);

        if (!job) {
            res.status(404);
            res.json({"data": job, "message": `Could not find specified Job with id ${req.params.id}.`});
            return;
        }

        let logs = utils.getLogs(job);

        res.status(200);
        res.json({"data": logs, "message": `Job with id ${req.params.id} found.`});
    });

    app.post("/api/jobs", async (req, res) => {
        let errors = Job.validate(req.body);
        if (errors.length > 0) {
            res.status(400);
            res.json({"data": null, "message": errors.join(". ") + "."});
            return;
        }

        let job = new Job(req.body.name, req.body.cron, req.body.command, req.body.commandType);
        await jobDao.insert(job);
        utils.rewriteCronFile(await jobDao.list());
        res.status(201);
        res.json({"data": job, "message": "Job created."});
    });

    app.put("/api/jobs/:id", async (req, res) => {
        let job = await jobDao.find(req.params.id);

        if (!job) {
            res.status(404);
            res.json({"data": job, "message": `Could not find specified Job with id ${req.params.id}.`});
            return;
        }

        let errors = Job.validate(req.body);
        if (errors.length > 0) {
            res.status(400);
            res.json({"data": null, "message": errors.join(". ") + "."});
            return;
        }

        job.name = req.body.name;
        job.cron = req.body.cron;
        job.command = req.body.command;
        job.commandType = req.body.commandType;
        let result = await jobDao.update(job);

        utils.rewriteCronFile(await jobDao.list());
        res.status(200);
        res.json({"data": result, "message": `Job id ${req.params.id} updated.`});
    });

    app.delete("/api/jobs/:id", async (req, res) => {
        let result = await jobDao.delete(req.params.id);

        if (!result) {
            res.status(404);
            res.json({"data": null, "message": `Could not delete specified Job with id ${req.params.id}.`});
            return;
        }

        utils.rewriteCronFile(await jobDao.list());
        res.status(200);
        res.json({"data": result, "message": `Job with id ${req.params.id} deleted.`});
    });

    app.listen(80);
};

module.exports = { register };
