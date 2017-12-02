/*
 * Basic examples
 * Test a lot of handlers that don't require user login.
 *
 */
'use strict'

import Client from './src/Client';
import UserHandler from './src/handlers/UserHandler';
import PlaylistHandler from './src/handlers/PlaylistHandler';

let client = Client.instance;

client.settings = {
    clientId: 'c7b3b4be06ec43cfa7ed4facfed7a6bc',
    secretId: 'd8a020b39ffd43ddabd458ec712b7dad',
    scopes: ['user-library-read user-top-read playlist-read-private playlist-read-collaborative'],
    redirect_uri: 'https://spotiphy-0.firebaseapp.com/home.html'
};

/*
 * Login user
 * This is a way, you can do it however you want
 */
sessionStorage.clear();
function session() {
    if (sessionStorage.token) {
        client.token = sessionStorage.token;
    } else if (window.location.hash.split('&')[0].split('=')[1]) {
        sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
        client.token = sessionStorage.token;
    }
}
session();
function login() {
    client.login().then((url) => {
        window.location.href = url;
	});
}
document.querySelector('#login').onclick = login;
document.querySelector('#login0').onclick = login;