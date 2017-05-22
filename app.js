function signUp(){
    window.location = 'https://accounts.spotify.com/authorize/?client_id=aba30627182b4961a22b039528fc50a1&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fthanks.html&scope=user-library-read+playlist-modify-private'
}

function newUser(){
    var code = getParameterByName('code');
    console.log('code: '+code);
    var data = {'code': code};

    
    let url='http://localhost:5000/spotted/api/v1.0/users';
    $.ajax({ 
            url: url,
            dataType: 'json', 
            type: 'POST',
            data: data,
            success: function(response) {
                 alert(response)
                 console.log(response);
            },
            error: function(error) {
                console.log(error);
                alert(error);
            }
        });
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