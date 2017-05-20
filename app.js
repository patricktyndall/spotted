function signUp(){
    window.location = 'https://accounts.spotify.com/authorize/?client_id=aba30627182b4961a22b039528fc50a1&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fthanks.html&scope=user-library-read+playlist-modify-private'
}

function newUser(){
    var code = getParameterByName('code');
    console.log('code: '+code);

    /*
    let url='https://api.spotify.com/v1/me/tracks';
    $.ajax({ 
            url: url,
            dataType: 'json', 
            type: 'GET',
            headers:{'Authorization': 'Bearer BQDW7xSxqx4PtMuUp130QDbH_LjvZMS-GBWVpj62rSjMiJ8XfJaZzIJpIYc7meHzs3SJ_niGwN-ud85eE6zK1hkFhziI3pMgOuhPqkWoRHVHQj_9dcE6eqxMxle77OhNxHXMMVxZicmzHAPKZsLPlic',
                'Accept': 'application/json'},
            success: function(response) {
                 alert(response)
                 console.log(response);
            },
            error: function(error) {
                console.log(error);
                alert(error);
            }
        });
        */
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}