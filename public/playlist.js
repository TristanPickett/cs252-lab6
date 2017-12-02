'use strict'

import Client from './src/Client';
import PlaylistHandler from './src/handlers/PlaylistHandler';
import UserHandler from './src/handlers/UserHandler';

let client = Client.instance;

client.settings = {
    clientId: 'c7b3b4be06ec43cfa7ed4facfed7a6bc',
    secretId: 'd8a020b39ffd43ddabd458ec712b7dad',
    scopes: ['user-library-read user-top-read playlist-read-private playlist-read-collaborative'],
    redirect_uri: 'https://spotiphy-0.firebaseapp.com/home.html'
};

let playlistID
function session() {
	if (sessionStorage.token) {
			client.token = sessionStorage.token;
	} else if (window.location.hash.split('&')[0].split('=')[1]) {
			sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
			client.token = sessionStorage.token;
  }
  
  if (sessionStorage.playlistID) {
    playlistID = sessionStorage.playlistID;
  } else if (window.location.hash.split('&')[0].split('=')[1]) {
    sessionStorage.playlistID = window.location.hash.split('&')[0].split('=')[1];
    playlistID = sessionStorage.playlistID;
  }
}

session();

console.log(playlistID);