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
        $.toast({
            text: response.message,
            icon: 'info',
            showHideTransition: 'fade',
            allowToastClose: false,
            hideAfter: 2500,
            stack: 50,
            position: 'top-right',
            textAlign: 'left',
            loader: true,
            loaderBg: '#9EC600',
        });
    });
}

const formatDateTimeString = (date) => {
    return new Date(Date.parse(date)).toLocaleString();
}

getJobsList();
