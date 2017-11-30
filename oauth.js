import "babel-polyfill";
module.exports = {
    entry: ["babel-polyfill", "./app/js"]
};

'use strict';

/*import Client from '../src/Client';
import UserHandler from '../src/handlers/UserHandler';
import TrackHandler from '../src/handlers/TrackHandler';
import PlaylistHandler from '../src/handlers/PlaylistHandler';
import ArtistHandler from '../src/handlers/ArtistHandler';
*/

import {Client, UserHandler, TrackHandler, PlaylistHandler} from 'spotify-sdk';

let client = Client.instance;

client.settings = {
    clientId: 'c7b3b4be06ec43cfa7ed4facfed7a6bc',
    secretId: 'd4644085638d4eaaaa2cdea1ca65734e',
    scopes: ['playlist-read-private'],
    redirect_uri: 'http://localhost:3000/examples/oauth.html'
};

/*
 * Login user
 * This is a way, you can do it however you want
 */
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