function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.querySelector('#user-name').innerHTML = profile.getName()
}
