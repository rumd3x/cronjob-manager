var currentTime = "";

const getCurrentTime = () => {
    $.get(`api/time`, (response) => {
        currentTime = formatServerTime(response.data);
    }).fail((xhr) => {
        makeToast('error', xhr.responseJSON.message);
    });

    setTimeout(getCurrentTime, 60000);
}

getCurrentTime();
