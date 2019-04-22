const getJobLogs = (job_id) => {
    $.get(`api/jobs/${job_id}/logs`, (response) => {
        findJobById(job_id, (job) => {
            if (response.data.cron.trim() === "") {
                response.data.cron = "No log information.";
            }
            if (response.data.container.trim() === "") {
                response.data.container = "No log information.";
            }
            Swal.fire({
                title: `Logs for ${job.name} (id: ${job_id})`,
                width: "90%",
                html: `<p>Job Logs</p><pre style="text-align: left;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        height: 250px;
                        overflow-y: scroll;
                        display: block;
                        padding: 12px;
                        margin: 10px;
                        line-height:
                        1.42857143;
                        word-break: break-all;
                        word-wrap: break-word;">${response.data.cron}</pre>
                        <hr>
                        <p>Container Logs</p><pre style="text-align: left;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        height: 250px;
                        overflow-y: scroll;
                        display: block;
                        padding: 12px;
                        margin: 10px;
                        line-height:
                        1.42857143;
                        word-break: break-all;
                        word-wrap: break-word;">${response.data.container}</pre>`
            });
        });
    }).fail((xhr) => {
        makeToast('error', xhr.responseJSON.message);
    });
}
