/*
 * Basic examples
 * Test a lot of handlers that don't require user login.
 *
 */
'use strict'

import Client from './src/Client';
import TrackHandler from './src/handlers/TrackHandler';
import PlaylistHandler from './src/handlers/PlaylistHandler';
import ArtistHandler from './src/handlers/ArtistHandler';
import UserHandler from './src/handlers/UserHandler';

let client = Client.instance;

client.settings = {
    clientId: 'c7b3b4be06ec43cfa7ed4facfed7a6bc',
    secretId: 'd8a020b39ffd43ddabd458ec712b7dad',
    scopes: ['user-library-read user-top-read playlist-read-private playlist-read-collaborative'],
    redirect_uri: 'https://spotiphy-0.firebaseapp.com/home.html'
};

function session() {
	if (sessionStorage.token) {
			client.token = sessionStorage.token;
	} else if (window.location.hash.split('&')[0].split('=')[1]) {
			sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
			client.token = sessionStorage.token;
	}
}
session();

/*
 * TrackHandler Examples
 *
 */
var track = new TrackHandler();

/*
 * #1 example
 * Get tracks with the name 'R U mine?', should return a Collection of tracks.
 */
track.search('R U mine?', {limit: 5}).then((trackCollection) => {
	console.log(trackCollection);
});

/*
 * UserHandler Examples
 *
 */
var user = new UserHandler();

/*
 * #1 example
 * Get the current user.
 */
user.me().then((userEntity) => {
		console.log(userEntity);
		console.log(userEntity._id);
		user.playlists(userEntity._id).then((playlistCollection) => {
			console.log(playlistCollection);
		});
});

/*
 * #3 example
 * Get the playlists by user id, should return a Playlist collection.
 */
/*user.me().playlists().then((playlistCollection) => {
    console.log(playlistCollection);
});*/