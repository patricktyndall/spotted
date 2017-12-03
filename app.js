function signUp(){
    window.location = 'https://accounts.spotify.com/authorize/?client_id=aba30627182b4961a22b039528fc50a1&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fthanks.html&scope=user-library-read+playlist-modify-private'
}

function signup(){
    if(FB){
        console.log("login");
        console.log(FB);
        FB.login((response)=>{
            checkLoginState();
        }); 
    }
    else{
        console.log("FB sdk not loaded.");
    }
}

function checkInitialLoginState(){
    console.log("checkLoginState()");
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log('Logged in.');
        console.log(response);
        window.location = 'thanks.html'
      }
      else if (response.status === 'not_authorized'){
        console.log("not authorized with FB.");
        window.location = 'signup.html';
      }
      else {
        console.log("not signed in to FB.");
        window.location = 'login.html';
      }
    });
}

function exchangeCodeForToken(){
    var code = getParameterByName('code');
    console.log('got code');

    var data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri':'http://localhost:8080/thanks.html',
        'client_id': 'aba30627182b4961a22b039528fc50a1',
        'client_secret': 'cc1c3b810a8d42af92ce0ead3cf45964'
    };

    let url='https://accounts.spotify.com/api/token';
    $.ajax({ 
            url: url,
            dataType: 'json', 
            type: 'POST',
            data: data,
            success: function(response) {
                console.log("got tokens");
                var access_token = response.access_token;
                var refresh_token = response.refresh_token;
                getSavedTracks(access_token);
            },
            error: function(error) {
                console.log(error);
                console.log(JSON.stringify(error));
            }
        });
}

function getSavedTracks(access_token){
    let url='https://api.spotify.com/v1/me/tracks';
    var authString = "Bearer " + access_token
    $.ajax({ 
            url: url,
            type: 'GET',
            headers: {
                Authorization:authString
            },
            success: function(response) {
                console.log("GOT SAVED TRACKS");
                console.log(response);
            },
            error: function(error) {
                console.log("ERROR");
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