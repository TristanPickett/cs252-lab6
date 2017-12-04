'use strict'

import Client from './src/Client';
import PlaylistHandler from './src/handlers/PlaylistHandler';
import UserHandler from './src/handlers/UserHandler';
import TrackHandler from './src/handlers/TrackHandler';
import firebase from 'firebase/app';
import database from 'firebase/database';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBPZDuSX_kdl6x_gro6V1mk7TFIZ2i1CJo",
  authDomain: "spotiphy-0.firebaseapp.com",
  databaseURL: "https://spotiphy-0.firebaseio.com",
  projectId: "spotiphy-0",
  storageBucket: "spotiphy-0.appspot.com",
  messagingSenderId: "49114425376",
});

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
var playlistName;
var imgSrc;

function saveData(userID, playlistID, playlistName, imgSrc, popularity, pH, acousticness, danceability, energy, tempo) {
  var playlistData = {
    name: playlistName,
    imgSrc: imgSrc,
    popularity: popularity,
    pH: pH,
    danceability: danceability,
    acousticness: acousticness,
    energy: energy,
    tempo: tempo
  }
  firebase.database().ref('users/' + userID + '/' + playlistID).update(playlistData);
}

user.playlists(userID, playlistID).then((playlist) => {
  console.log(playlist);
  playlistName = playlist._name;
  imgSrc = playlist._images[0]["url"];
  var sumPopularity = 0;
  var count = 0;
  for (let i = 0; i < playlist._tracks.items.length; i++) {
    sumPopularity += playlist._tracks.items[i].track.popularity;
    if (playlist._tracks.items[i].track.id) {
      trackIDs.push(playlist._tracks.items[i].track.id);
      count += 1;
    }
  }
  popularity = sumPopularity / count;
  pH = (popularity / 100) * 14;
  
  trackHandler.audioFeatures(trackIDs).then((response) => {
    var features = response.audio_features;
    console.log(features);
    var acousticnessSum = 0.0;
    var danceabilitySum = 0.0;
    var energySum = 0.0;
    var tempoSum = 0.0;
    var count2 = 0;
    for (let j = 0; j < features.length; j++) {
      if (features[j]) {
        acousticnessSum += features[j].acousticness;
        danceabilitySum += features[j].danceability;
        energySum += features[j].energy;
        tempoSum += features[j].tempo;
        count2 += 1;
      }
    }

    acousticness = acousticnessSum / count2;
    danceability = danceabilitySum / count2;
    energy = energySum / count2;
    tempo = tempoSum / count2;
    
    console.log(playlistName);
    console.log(userID);
    console.log(imgSrc);
    console.log("Popularity: " + popularity);
    console.log("pH: " + pH);
    console.log("Acousticness: " + acousticness);
    console.log("Danceability: " + danceability);
    console.log("Energy: " + energy);
    console.log("Tempo: " + tempo);
    saveData(userID, playlistID, playlistName, imgSrc, popularity, pH, acousticness, danceability, energy, tempo);
  });
});