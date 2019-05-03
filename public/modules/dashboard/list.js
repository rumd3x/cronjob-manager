var jobs = [];
var enabledJobsCount = 0;
var disabledJobsCount = 0;

const getJobsList = () => {
    $.get('api/jobs', (response) => {
        jobs = response.data;
        jobs.forEach(job => {
            job.createdAtFormatted = formatDateTimeString(job.createdAt);
            job.updatedAtFormatted = formatDateTimeString(job.updatedAt);
        });
        enabledJobsCount = jobs.filter((job) => { return job.active }).length;
        disabledJobsCount = jobs.length - enabledJobsCount;
        makeToast('info', response.message);
    });
}

getJobsList();
