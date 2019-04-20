const getFreshFormObject = () => {
    return {
        id: 0,
        name: "",
        cron: "",
        command: "",
        commandType: "",
        active: false
    };
}

var formObject = getFreshFormObject();

const resetForm = () => {
    $("#frmJob input").val('');
    $("#frmJob select").val('');
    $("#frmJob input[type=checkbox]").prop('checked', false);
}

const setFormDataToJobId = (job_id) => {
    resetForm();

    findJobById(job_id, (job) => {
        formObject.id = job.id;
        formObject.name = job.name;
        formObject.cron = job.cron;
        formObject.command = job.command;
        formObject.commandType = job.commandType;
        formObject.active = job.active;
    });
}

const makeInsertRequest = (job) => {
    $.ajax('api/jobs', {
        method: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(job)
    }).done((response) => {
        makeToast('success', response.message);
        getJobsList();
        $('#jobFormModal').modal('hide');
    }).fail((xhr) => {
        makeToast('error', xhr.responseJSON.message);
    });
}

const makeUpdateRequest = (job) => {
    $.ajax(`api/jobs/${job.id}`, {
        method: 'PUT',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(job)
    }).done((response) => {
        makeToast('success', response.message);
        getJobsList();        
        $('#jobFormModal').modal('hide');
    }).fail((xhr) => {
        makeToast('error', xhr.responseJSON.message);
    });
}

const sendForm = () => {
    if (formObject.id == 0) {
        makeInsertRequest(formObject);
        return;
    }
    makeUpdateRequest(formObject);    
}
