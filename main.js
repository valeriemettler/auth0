var lock;

var saveProfile = function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
            return;
        }
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        display_profile();
    });
};

var setup = function() {
    lock = new Auth0Lock('rXO0dq1f1kcBZwiGVN2scfWYZtQ4D8QG', 'valeriemettler.auth0.com');

    lock.on("authenticated", function(authResult) {
        saveProfile(authResult)
    });
};

var display_profile = function() {
    var p = JSON.parse(localStorage.getItem('profile'));
    if (p && p.email) {
        //logged in
        $("#msg").html("welcome " + p.email);
        $("#login").hide();
        $("#logout").show();
    } else {
        //not logged in
        $("#msg").html("please login");
        $("#login").show();
        $("#logout").hide();
    }
};

$(document).ready(function() {
    setup();
    display_profile();

    $("#login").on('click', function() {
        lock.show();
    })
    $("#logout").on('click', function() {
      localStorage.removeItem('id_token');
      localStorage.removeItem('profile');
      display_profile();
    })
});