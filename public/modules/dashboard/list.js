var jobs = [];

const getJobsList = () => {
    $.get('api/jobs', (response) => {
        jobs = response.data;
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

getJobsList();
