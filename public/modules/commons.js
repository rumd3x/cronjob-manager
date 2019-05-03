const makeToast = (type, message) => {
    $.toast({
        text: message,
        icon: type,
        showHideTransition: 'fade',
        allowToastClose: false,
        hideAfter: 3000,
        stack: 50,
        position: 'top-right',
        textAlign: 'left',
        loader: true,
        loaderBg: '#FFFFFF',
    });
}

const formatDateTimeString = (date) => {
    return new Date(Date.parse(date)).toLocaleString();
}

const formatServerTime = (date) => {
    return new Date(Date.parse(date)).toLocaleString([], {hour: '2-digit', minute:'2-digit'});
}
