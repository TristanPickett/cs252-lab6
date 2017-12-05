/*
 * Basic examples
 * Test a lot of handlers that don't require user login.
 *
 */
'use strict'

import Client from './src/Client';
import PlaylistHandler from './src/handlers/PlaylistHandler';
import UserHandler from './src/handlers/UserHandler';
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

function session() {
	if (sessionStorage.token) {
			client.token = sessionStorage.token;
	} else if (window.location.hash.split('&')[0].split('=')[1]) {
			sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
			client.token = sessionStorage.token;
	}
}
session();

var user = new UserHandler();

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

user.me().then((userEntity) => {
    const ul = document.getElementById('playlists');
		user.playlists(userEntity._id).then((playlistCollection) => {
			console.log(playlistCollection);
      playlistCollection.map(function(playlist) {
        let a = createNode('a'),
            img = createNode('img'),
            p = createNode('p');
        if (playlist._images.length == 1) {
          img.src = playlist._images[0]["url"];
          img.style.cssText = "width: 120px; height: 120px;";
        }
        else {
          img.src = playlist._images[1]["url"];
          img.style.cssText = "width: 120px; height: 120px;";
        }
        a.href = "playlist.html#id=" + playlist._id + "&user=" + playlist._owner["id"];
        a.className += " card";
        p.innerHTML = playlist._name;
        p.className += " card-text";
        append(a, img);
        append(a, p);
        append(ul, a);
      });
		});
});

function fetchData() {
  return firebase.database().ref('users').once("value").then(function(response) {
    var data = response.val();
    console.log(data);
    const ul = document.getElementById('all-playlists');
    for (var userID in data) {
      if (data.hasOwnProperty(userID)) {
        for (var playlistID in data[userID]) {
          if (data[userID].hasOwnProperty(playlistID)) {
            console.log(data[userID][playlistID]);
            console.log(playlistID);
            let a = createNode('a'),
                img = createNode('img'),
                p = createNode('p'),
                div = createNode('div'),
                span = createNode('span');
            img.src = data[userID][playlistID]["imgSrc"];
            img.style.cssText = "width: 120px; height: 120px;";
            a.href = "playlist.html#id=" + playlistID + "&user=" + userID;
            //a.className += " card";
            div.className += " card";
            p.innerHTML = data[userID][playlistID]["name"];
            p.className += " card-text";
            span.className += " popover";
            if (data[userID][playlistID]["pH"] == null) {
              span.innerHTML = "pH: null\n";
            }
            else {
              span.innerHTML = "pH: " + data[userID][playlistID]["pH"].toFixed(3);
            }
            span.innerHTML += "\nPopularity: " + data[userID][playlistID]["popularity"].toFixed(3);
            span.innerHTML += "\nTempo: " + data[userID][playlistID]["tempo"].toFixed(0);
            append(a, img);
            append(a, p);
            append(div, a);
            append(div, span);
            append(ul, div);
          }
        }
      }
    }
  });
}

fetchData();
