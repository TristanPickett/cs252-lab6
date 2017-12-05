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
const messages = [
  "Uses a typewriter",
  "Uses a typewriter",
  "Listens to Spotify on a record player",
  "Listens to Spotify on a record player",
  "Knits their own beanies",
  "Knits their own beanies",
  "Owns an iPhone",
  "Owns an iPhone",
  "Posts sunset pictures on Instagram",
  "Posts sunset pictures on Instagram",
  "Discovered the avocado",
  "Discovered the avocado",
  "Loves pumpkin spice lattes",
  "Loves pumpkin spice lattes"
]

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

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
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

    const header = document.getElementById('playlist-name');
    header.innerHTML = playlistName;
    const user = document.getElementById('creator');
    user.innerHTML = userID;

    const content = document.getElementById('analysis');
    let img = createNode('img'),
        input = createNode('input'),
        output = createNode('output'),
        span = createNode('span'),
        span2 = createNode('span'),
        span3 = createNode('span'),
        span4 = createNode('span'),
        span5 = createNode('span');
    img.src = imgSrc;
    img.style.cssText = "max-width: 300px; max-height: 300px; padding: 1.5rem";
    append(content, img);
    span.innerHTML = "pH: ";
    span.style.cssText = "height: 25px;";
    append(content, span);
    output.innerHTML = pH.toFixed(2);
    if (pH <=5) {
      output.style.cssText = "height: 25px; background: #4CAF50; opacity: 75%;";
      const image = document.getElementById('carousel1');
      image.src = "img/hipster.jpeg";
      const head = document.getElementById('carousel1_header');
      head.innerHTML = "Mainstream = Not Cool";
      const desc = document.getElementById('carousel1_p');
      desc.innerHTML = "Would you like a man-bun with that playlist? You are the definition of hipster.";
    }
    else if (pH > 5 && pH <= 9) {
      output.style.cssText = "height: 25px; background: #EED202; opacity: 75%;";
      const image = document.getElementById('carousel1');
      image.src = "img/yawn.jpeg";
      const head = document.getElementById('carousel1_header');
      head.innerHTML = "Average Joe";
      const desc = document.getElementById('carousel1_p');
      desc.innerHTML = "Nothing special. This playlist is as average as my grades.";
    }
    else {
      output.style.cssText = "height: 25px; background: #ED4337; opacity: 75%;";
      const image = document.getElementById('carousel1');
      image.src = "img/starbucks.jpeg";
      const head = document.getElementById('carousel1_header');
      head.innerHTML = "Basic";
      const desc = document.getElementById('carousel1_p');
      desc.innerHTML = "You're probably sipping on a pumpkin spice latte right now.";
    }
    append(content, output);
    input.type = "range";
    input.className += " slider";
    input.disabled = "true";
    input.min = "1";
    input.max = "14";
    input.value = pH;
    append(content, input);
    span2.innerHTML = "Tempo: " + tempo.toFixed(0) + " BPM, ";
    span3.innerHTML = "Acousticness: " + (acousticness * 100).toFixed(2) + "%, ";
    span4.innerHTML = "Energy: " + (energy * 100).toFixed(2) + "%, ";
    span5.innerHTML = "Danceability: " + (danceability * 100).toFixed(2) + "%";
    append(content, span2);
    append(content, span3);
    append(content, span4);
    append(content, span5);

    if (danceability > 0.7) {
      const image = document.getElementById('carousel2');
      image.src = "img/party.jpeg";
      const head = document.getElementById('carousel2_header');
      head.innerHTML = "Party Animal";
      const desc = document.getElementById('carousel2_p');
      desc.innerHTML = "You must tear up the dance floor (Or just really like dance music).";
    }
    else if (energy > .70) {
      const image = document.getElementById('carousel2');
      image.src = "img/high-energy.jpeg";
      const head = document.getElementById('carousel2_header');
      head.innerHTML = "Amped Up";
      const desc = document.getElementById('carousel2_p');
      desc.innerHTML = "No chill here. Your music suggests you just can't sit still.";
    }
    else if (energy < 0.5) {
      const image = document.getElementById('carousel2');
      image.src = "img/chill.jpeg";
      const head = document.getElementById('carousel2_header');
      head.innerHTML = "Chilled Out";
      const desc = document.getElementById('carousel2_p');
      desc.innerHTML = "Hectic day at work? You listen to relax.";
    }
    else {
      const image = document.getElementById('carousel2');
      image.src = "img/404.jpeg";
      const head = document.getElementById('carousel2_header');
      head.innerHTML = "404 Not Found";
      const desc = document.getElementById('carousel2_p');
      desc.innerHTML = "You give us nothing interesting to say about your playlist.";
    }

    if (tempo >= 160) {
      const image = document.getElementById('carousel3');
      image.src = "img/fast-paced.jpeg";
      const head = document.getElementById('carousel3_header');
      head.innerHTML = "Toe Tapper";
      const desc = document.getElementById('carousel3_p');
      desc.innerHTML = "If your songs were a person, they would look like this. Fast tempo is an understatement.";
    }
    else if (tempo < 100) {
      const image = document.getElementById('carousel3');
      image.src = "img/slow-tempo.jpeg";
      const head = document.getElementById('carousel3_header');
      head.innerHTML = "Like a Snail";
      const desc = document.getElementById('carousel3_p');
      desc.innerHTML = "Your songs are SLOW.  Not a bad thing though, maybe you listen to relax.";
    }
    else {
      const image = document.getElementById('carousel3');
      image.src = "img/404.jpeg";
      const head = document.getElementById('carousel3_header');
      head.innerHTML = "404 Too Normal";
      const desc = document.getElementById('carousel3_p');
      desc.innerHTML = "Your tempo is just too average for anything fun.";
    }



    if (playlist._public) {
      saveData(userID, playlistID, playlistName, imgSrc, popularity, pH, acousticness, danceability, energy, tempo);
    }
    console.log(messages[Math.floor(pH)]);
  });
});
