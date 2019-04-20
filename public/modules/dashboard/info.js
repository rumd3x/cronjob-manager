const getInfo = () => {
    $.get('api/info', (response) => {
        Swal.fire({
            title: `${response.message}`,
            width: "70%",
            html: `<pre style="text-align: left;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    height: 200px;
                    overflow-y: scroll;
                    display: block;
                    padding: 12px;
                    margin: 10px;
                    line-height:
                    1.42857143;
                    word-break: break-all;
                    word-wrap: break-word;">${response.data}</pre>`
        });
    }).fail((xhr) => {
        makeToast('error', xhr.responseJSON.message);
    });
}