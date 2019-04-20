const deleteJob = (job_id) => {
    findJobById(job_id, (job) => {
        console.log(job);
        Swal.fire({
            title: `Deleting job: ${job.name} (id: ${job.id})`,
            text: "You are about to delete this job.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                $.ajax(`api/jobs/${job.id}`, {
                    method: 'DELETE'
                }).done((response) => {
                    makeToast('success', response.message);
                    getJobsList();
                }).fail((xhr) => {
                    makeToast('error', xhr.responseJSON.message);
                });
            }
        });
    });
}
