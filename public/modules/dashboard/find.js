const findJobById = (job_id, callback) => {
    $.get(`api/jobs/${job_id}`, (response) => {
        callback(response.data);
    }).fail((xhr) => {
        makeToast('error', xhr.responseJSON.message);
    });
}
