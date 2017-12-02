'use strict'

import Client from './src/Client';
import PlaylistHandler from './src/handlers/PlaylistHandler';
import UserHandler from './src/handlers/UserHandler';
import TrackHandler from './src/handlers/TrackHandler';

let client = Client.instance;

client.settings = {
    clientId: 'c7b3b4be06ec43cfa7ed4facfed7a6bc',
    secretId: 'd8a020b39ffd43ddabd458ec712b7dad',
    scopes: ['user-library-read user-top-read playlist-read-private playlist-read-collaborative'],
    redirect_uri: 'https://spotiphy-0.firebaseapp.com/home.html'
};

let playlistID;
let userID;

function session() {
	if (sessionStorage.token) {
			client.token = sessionStorage.token;
	}
  
  if (window.location.hash.split('&')[0].split('=')[1]) {
    sessionStorage.playlistID = window.location.hash.split('&')[0].split('=')[1];
    playlistID = sessionStorage.playlistID;
  } else if (sessionStorage.playlistID) {
    playlistID = sessionStorage.playlistID;
  }

  if (window.location.hash.split('&')[1].split('=')[1]) {
    sessionStorage.userID = window.location.hash.split('&')[1].split('=')[1];
    userID = sessionStorage.userID;
  } else if (sessionStorage.userID) {
    userID = sessionStorage.userID;
  }
}

session();

console.log(playlistID);
console.log(userID);
console.log(client.token);

var user = new UserHandler();
var trackHandler = new TrackHandler();
var popularity = 0;
var pH = 0;
var acousticness = 0;
var danceability = 0;
var energy = 0;
var tempo = 0;
var trackIDs = [];

user.playlists(userID, playlistID).then((playlist) => {
  console.log(playlist);
  var sumPopularity = 0;
  var count = 0;
  for (let i = 0; i < playlist._tracks.items.length; i++) {
    sumPopularity += playlist._tracks.items[i].track.popularity;
    if (playlist._tracks.items[i].track.id) {
      trackIDs.push(playlist._tracks.items[i].track.id);
      count += 1;
    }
  }
  popularity = sumPopularity / playlist._tracks.items.length;
  pH = (popularity / 100) * 14;
  
  trackHandler.audioFeatures(trackIDs).then((response) => {
    var features = response.audio_features;
    console.log(features);
    var acousticnessSum = 0.0;
    var danceabilitySum = 0.0;
    var energySum = 0.0;
    var tempoSum = 0.0;
    for (let j = 0; j < features.length; j++) {
      acousticnessSum += features[j].acousticness;
      danceabilitySum += features[j].danceability;
      energySum += features[j].energy;
      tempoSum += features[j].tempo;
    }

    acousticness = acousticnessSum / count;
    danceability = danceabilitySum / count;
    energy = energySum / count;
    tempo = tempoSum / count;
    
    console.log("Popularity: " + popularity);
    console.log("pH: " + pH);
    console.log("Acousticness: " + acousticness);
    console.log("Danceability: " + danceability);
    console.log("Energy: " + energy);
    console.log("Tempo: " + tempo);
  });
});


