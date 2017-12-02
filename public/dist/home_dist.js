(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["spotifySdk"] = factory();
	else
		root["spotifySdk"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * Basic examples
	 * Test a lot of handlers that don't require user login.
	 *
	 */
	'use strict';
	
	var _Client = __webpack_require__(1);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	var _TrackHandler = __webpack_require__(9);
	
	var _TrackHandler2 = _interopRequireDefault(_TrackHandler);
	
	var _PlaylistHandler = __webpack_require__(12);
	
	var _PlaylistHandler2 = _interopRequireDefault(_PlaylistHandler);
	
	var _ArtistHandler = __webpack_require__(3);
	
	var _ArtistHandler2 = _interopRequireDefault(_ArtistHandler);
	
	var _UserHandler = __webpack_require__(15);
	
	var _UserHandler2 = _interopRequireDefault(_UserHandler);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var client = _Client2.default.instance;
	
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
	var track = new _TrackHandler2.default();
	
	/*
	 * #1 example
	 * Get tracks with the name 'R U mine?', should return a Collection of tracks.
	 */
	track.search('R U mine?', { limit: 5 }).then(function (trackCollection) {
	  console.log(trackCollection);
	});
	
	/*
	 * UserHandler Examples
	 *
	 */
	var user = new _UserHandler2.default();
	
	/*
	 * #1 example
	 * Get the current user.
	 */
	user.me().then(function (userEntity) {
	  console.log(userEntity);
	  console.log(userEntity._id);
	  user.playlists(userEntity._id).then(function (playlistCollection) {
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Factory = __webpack_require__(2);
	
	var _Factory2 = _interopRequireDefault(_Factory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var singleton = Symbol();
	var singletonEnforcer = Symbol();
	
	/**
	 * Client is the responsible of comunicate with the API.
	 */
	
	var Client = function () {
	
	  /**
	   * Constructor
	   *
	   * @param {Symbol} enforcer
	   */
	  function Client(enforcer) {
	    _classCallCheck(this, Client);
	
	    this._token = null;
	    this._clientId = null;
	    this._secretId = null;
	    this._scopes = null;
	    this._redirect_uri = null;
	
	    if (enforcer != singletonEnforcer) {
	      throw "Cannot construct singleton";
	    }
	  }
	
	  /**
	   * Get the current instance of Client
	   *
	   * @return {Object} instance
	   */
	
	
	  _createClass(Client, [{
	    key: 'login',
	
	
	    /**
	     * This method fires a new window that allow login
	     *
	     * @param  {Function} callback
	     * @return {Function|Promise}
	     */
	    value: function login(callback) {
	      var url_login = 'https://accounts.spotify.com/en/authorize?response_type=token&client_id=' + this._clientId + '&redirect_uri=' + encodeURIComponent(this._redirect_uri) + (this._scopes ? '&scope=' + encodeURIComponent(this._scopes) : '');
	      if (callback) {
	        return callback(url_login);
	      } else {
	        return new Promise(function (resolve) {
	          resolve(url_login);
	        });
	      }
	    }
	
	    /**
	     * @param  {String} url Endpoint
	     * @param  {String} method Method GET, POST, PUT or DELETE
	     * @param  {Object} body Object to send in the body
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'request',
	    value: function request(url, method, body) {
	      return this.fetch(url, method, body).then(function (data) {
	        return (0, _Factory2.default)(data);
	      }.bind(this));
	    }
	
	    /**
	     * Function that encode objects
	     *
	     * @param  {Object} obj Object to encode
	     * @return {String} A encode object
	     */
	
	  }, {
	    key: 'toQueryString',
	    value: function toQueryString(obj) {
	      var str = [];
	      for (var p in obj) {
	        if (obj.hasOwnProperty(p)) {
	          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	        }
	      }return str.join("&");
	    }
	
	    /**
	     * @param  {String} endpoint Endpoint
	     * @param  {String} method Method GET, POST, PUT or DELETE (default GET)
	     * @param  {Object} body Object to send in the body
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'fetch',
	    value: function (_fetch) {
	      function fetch(_x, _x2, _x3) {
	        return _fetch.apply(this, arguments);
	      }
	
	      fetch.toString = function () {
	        return _fetch.toString();
	      };
	
	      return fetch;
	    }(function (endpoint, method, body) {
	      var _headers = { 'Accept': 'application/json' };
	      var _url = void 0;
	      var _body = void 0;
	
	      method = method || 'GET';
	
	      if (this._token) {
	        _headers.Authorization = 'Bearer ' + this._token;
	      }
	
	      if (endpoint.indexOf('https') > -1) {
	        _url = endpoint;
	      } else {
	        _url = 'https://api.spotify.com/v1' + endpoint;
	      }
	
	      if (method === 'GET') {
	        if (body) {
	          var separator = _url.indexOf('?') !== -1 ? "&" : "?";
	          _url = _url + separator + this.toQueryString(body);
	        }
	      } else {
	        _body = JSON.stringify(body);
	      }
	
	      var checkStatus = function checkStatus(response) {
	        if (response.status >= 200 && response.status < 300) {
	          return response;
	        } else {
	          var error = new Error(response.statusText);
	          error.response = response;
	          throw error;
	        }
	      };
	
	      var parseJSON = function parseJSON(response) {
	        if (response.statusText === 'No Content') {
	          return { type: 'undefineds' };
	        }
	        return response.json();
	      };
	
	      return fetch(_url, {
	        method: method,
	        headers: _headers,
	        body: _body
	      }).then(checkStatus).then(parseJSON);
	    })
	  }, {
	    key: 'settings',
	
	
	    /**
	     * Set settings
	     *
	     * @param {Object} settings Settings
	     */
	    set: function set(settings) {
	      this._token = settings.token;
	      this._clientId = settings.clientId;
	      this._secretId = settings.secretId;
	      this._scopes = settings.scopes;
	      this._redirect_uri = settings.redirect_uri;
	    }
	
	    /**
	     * Set token
	     *
	     * @param {String} data Token
	     */
	
	  }, {
	    key: 'token',
	    set: function set(data) {
	      this._token = data;
	    }
	
	    /**
	     * Get the current token
	     *
	     * @return {String} Current token
	     */
	    ,
	    get: function get() {
	      return this._token;
	    }
	  }], [{
	    key: 'instance',
	    get: function get() {
	      if (!this[singleton]) {
	        this[singleton] = new Client(singletonEnforcer);
	      }
	      return this[singleton];
	    }
	  }]);
	
	  return Client;
	}();
	
	/**
	 * Exports the Client class.
	 */
	
	
	exports.default = Client;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (data) {
	  return new Factory(data);
	};
	
	var _ArtistHandler = __webpack_require__(3);
	
	var _ArtistHandler2 = _interopRequireDefault(_ArtistHandler);
	
	var _AlbumHandler = __webpack_require__(6);
	
	var _AlbumHandler2 = _interopRequireDefault(_AlbumHandler);
	
	var _TrackHandler = __webpack_require__(9);
	
	var _TrackHandler2 = _interopRequireDefault(_TrackHandler);
	
	var _PlaylistHandler = __webpack_require__(12);
	
	var _PlaylistHandler2 = _interopRequireDefault(_PlaylistHandler);
	
	var _UserHandler = __webpack_require__(15);
	
	var _UserHandler2 = _interopRequireDefault(_UserHandler);
	
	var _CollectionHandler = __webpack_require__(18);
	
	var _CollectionHandler2 = _interopRequireDefault(_CollectionHandler);
	
	var _Client = __webpack_require__(1);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Factory is the responsible of create new entities or collections
	 *
	 * @param {Object} data Entity object or Api response
	 */
	var Factory = function Factory(data) {
	  var _type = void 0;
	  var _items = void 0;
	  var _source = void 0;
	
	  if (data.error) {
	    return data.error;
	  } else if (Object.keys(data).length === 1 && data.snapshot_id) {
	    return data;
	  }
	
	  // a lot of magic happens here :D
	  if (data.type) {
	    _type = data.type;
	    _items = data;
	  } else if (typeof Object.keys(data)[0] === 'string' && !Array.isArray(data) && !data.items) {
	    _type = Object.keys(data)[0];
	    _items = data[_type].items || data[_type];
	    _source = data[_type];
	  } else if (Array.isArray(data)) {
	    _type = data[0].type + 's';
	    _items = data;
	  } else if (Array.isArray(data.items) && data.items[0].type) {
	    _type = data.items[0].type + 's';
	    _items = data.items;
	    _source = data;
	  } else if (Array.isArray(data.items) && !data.items[0].type) {
	    _items = data.items;
	    _type = Object.keys(data.items[0])[3] + 's';
	    _source = data;
	  }
	
	  switch (_type) {
	    case 'track':
	      return new _TrackHandler2.default().convert(_items);
	      break;
	    case 'tracks':
	      return new _CollectionHandler2.default(_items, _TrackHandler2.default, _source);
	      break;
	    case 'playlist':
	      return new _PlaylistHandler2.default().convert(_items);
	      break;
	    case 'playlists':
	      return new _CollectionHandler2.default(_items, _PlaylistHandler2.default, _source);
	      break;
	    case 'artists':
	      return new _CollectionHandler2.default(_items, _ArtistHandler2.default, _source);
	      break;
	    case 'album':
	      return new _AlbumHandler2.default().convert(_items);
	      break;
	    case 'albums':
	      return new _CollectionHandler2.default(_items, _AlbumHandler2.default, _source);
	      break;
	    case 'user':
	      return new _UserHandler2.default().convert(_items);
	      break;
	    case 'undefineds':
	      return data;
	      break;
	    case 'audio_features':
	      return data;
	      break;
	    default:
	      return _Client2.default.instance.request(data.href);
	  }
	};
	
	/**
	 * Exports a function that init a new Factory.
	 */
	;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Artist = __webpack_require__(4);
	
	var _Artist2 = _interopRequireDefault(_Artist);
	
	var _Client = __webpack_require__(1);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Methods for retrieving information about one or more artists from the Spotify catalog.
	 *
	 * @see https://developer.spotify.com/web-api/artist-endpoints/
	 */
	var ArtistHandler = function () {
	  function ArtistHandler() {
	    _classCallCheck(this, ArtistHandler);
	  }
	
	  _createClass(ArtistHandler, [{
	    key: 'search',
	
	
	    /**
	     * Get a collection of artists that match a keyword string.
	     *
	     * @see https://developer.spotify.com/web-api/search-item/
	     *
	     * @public
	     * @param {String} name Name of the artist.
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} artistCollection
	     */
	    value: function search(name, query) {
	      return _Client2.default.instance.request('/search?type=artist&q=' + encodeURIComponent(name), 'GET', query);
	    }
	
	    /**
	     * Get a single/collection of artist/s identified by its unique/list of Spotify ID.
	     *
	     * @see https://developer.spotify.com/web-api/get-artist/
	     *
	     * @public
	     * @param {String|Array} ids Artist id/ids to retrive
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} Artist|artistCollection
	     */
	
	  }, {
	    key: 'get',
	    value: function get(ids, query) {
	      if (Array.isArray(ids)) {
	        return _Client2.default.instance.request('/artists/?ids=' + ids, 'GET', query);
	      } else {
	        return _Client2.default.instance.request('/artists/' + ids, 'GET', query);
	      }
	    }
	
	    /**
	     * Get Spotify catalog information about an artist’s albums.
	     *
	     * @see https://developer.spotify.com/web-api/get-artists-albums/
	     *
	     * @public
	     * @param {String} id Artist id to retrive
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} albumsCollection
	     */
	
	  }, {
	    key: 'albums',
	    value: function albums(id, query) {
	      return _Client2.default.instance.request('/artists/' + id + '/albums', 'GET', query);
	    }
	
	    /**
	     * Get Spotify catalog information about an artist’s top tracks by country.
	     *
	     * @see https://developer.spotify.com/web-api/get-artists-top-tracks/
	     *
	     * @public
	     * @param {String} id Artist id to retrive top tracks
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} tracksCollection
	     */
	
	  }, {
	    key: 'topTracks',
	    value: function topTracks(id, query) {
	      return _Client2.default.instance.request('/artists/' + id + '/top-tracks', 'GET', query);
	    }
	
	    /**
	     * Get Spotify catalog information about artists similar to a given artist.
	     *
	     * @see https://developer.spotify.com/web-api/get-related-artists/
	     *
	     * @public
	     * @param {String} id Artist id to retrive related artists
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} albumsCollection
	     */
	
	  }, {
	    key: 'relatedArtists',
	    value: function relatedArtists(id, query) {
	      return _Client2.default.instance.request('/artists/' + id + '/related-artists', 'GET', query);
	    }
	
	    /**
	     * Add the current user as a follower of one or more artists.
	     *
	     * @see https://developer.spotify.com/web-api/follow-artists-users/
	     *
	     * @public
	     * @param {Array} artists List of artists ids
	     * @return {Promise} JSON reponse
	     */
	
	  }, {
	    key: 'follow',
	    value: function follow(artists) {
	      return _Client2.default.instance.request('/me/following?type=artist', 'PUT', { ids: artists });
	    }
	
	    /**
	    * Remove the current user as a follower of one or more artists.
	    *
	    * @see https://developer.spotify.com/web-api/unfollow-artists-users/
	    *
	    * @public
	    * @param {Array} artists List of artists ids
	    * @return {Promise} JSON reponse
	    */
	
	  }, {
	    key: 'unfollow',
	    value: function unfollow(artists) {
	      return _Client2.default.instance.request('/me/following?type=artist', 'DELETE', { ids: artists });
	    }
	
	    /**
	     * Convert a valid object to a Artist entity
	     *
	     * @public
	     * @param {Object} item Object to convert in entity
	     * @return {Object} Artist
	     */
	
	  }, {
	    key: 'convert',
	    value: function convert(item) {
	      return new _Artist2.default(item);
	    }
	  }]);
	
	  return ArtistHandler;
	}();
	
	/**
	 * Exports the AlbumHandler class.
	 */
	
	
	exports.default = ArtistHandler;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ArtistEntity2 = __webpack_require__(5);
	
	var _ArtistEntity3 = _interopRequireDefault(_ArtistEntity2);
	
	var _ArtistHandler = __webpack_require__(3);
	
	var _ArtistHandler2 = _interopRequireDefault(_ArtistHandler);
	
	var _Factory = __webpack_require__(2);
	
	var _Factory2 = _interopRequireDefault(_Factory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Add helpers methods to ArtistEntity
	 */
	var Artist = function (_ArtistEntity) {
	  _inherits(Artist, _ArtistEntity);
	
	  /**
	   * @param {Object} data Artist object
	   */
	  function Artist(data) {
	    _classCallCheck(this, Artist);
	
	    return _possibleConstructorReturn(this, (Artist.__proto__ || Object.getPrototypeOf(Artist)).call(this, data));
	  }
	
	  /**
	   * Get a list of Albums of a Artist.
	   *
	   * @public
	   * @return {Promise}
	   */
	
	
	  _createClass(Artist, [{
	    key: 'albums',
	    value: function albums() {
	      return new _ArtistHandler2.default().albums(this.id);
	    }
	
	    /**
	     * Get an Artist top tracks
	     *
	     * @public
	     * @param {Object} [query] Query parameters.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'topTracks',
	    value: function topTracks(query) {
	      return new _ArtistHandler2.default().topTracks(this.id, query);
	    }
	
	    /**
	     * Get related Artists of an Artist
	     *
	     * @public
	     * @param {Object} [query] Query parameters.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'relatedArtists',
	    value: function relatedArtists(query) {
	      return new _ArtistHandler2.default().relatedArtists(this.id, query);
	    }
	
	    /**
	     * Follow an Artist
	     *
	     * @public
	     * @param {Object} query Optional query parameters.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'follow',
	    value: function follow(query) {
	      return new _ArtistHandler2.default().follow([this.id], query);
	    }
	
	    /**
	     * Unfollow an Artist
	     *
	     * @public
	     * @param {Object} query Optional query parameters.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'unfollow',
	    value: function unfollow(query) {
	      return new _ArtistHandler2.default().unfollow([this.id], query);
	    }
	
	    /**
	     * Verify if a user follow an Artist
	     *
	     * @public
	     * @param {Array} [ids] User ids list.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'contains',
	    value: function contains(ids) {
	      return new _ArtistHandler2.default().contains(this.id, ids);
	    }
	  }]);
	
	  return Artist;
	}(_ArtistEntity3.default);
	
	/**
	 * Exports the Playlist class.
	 */
	
	
	exports.default = Artist;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Properties and methods of the Artist Entity
	 *
	 * @see https://developer.spotify.com/web-api/object-model/#album-object-full
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ArtistEntity = function () {
	
	  /**
	   * Constructor
	   * 
	   * @param {Object} data Artist object
	   */
	  function ArtistEntity() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, ArtistEntity);
	
	    this._external_urls = data.external_urls;
	    this._followers = data.followers;
	    this._genres = data.genres;
	    this._href = data.href;
	    this._id = data.id;
	    this._images = data.images;
	    this._name = data.name;
	    this._popularity = data.popularity;
	    this._type = data.type;
	    this._uri = data.uri;
	  }
	
	  /**
	   * @param {Object} data Artist object
	   */
	
	
	  _createClass(ArtistEntity, [{
	    key: 'external_urls',
	    set: function set(data) {
	      this._external_urls = data;
	    }
	
	    /**
	     * @return {String} Artist external_urls
	     */
	    ,
	    get: function get() {
	      return this._external_urls;
	    }
	
	    /**
	     * @param {Object} data Artist object
	     */
	
	  }, {
	    key: 'followers',
	    set: function set(data) {
	      this._followers = data;
	    }
	
	    /**
	     * @return {String} Artist followers
	     */
	    ,
	    get: function get() {
	      return this._followers;
	    }
	
	    /**
	     * @param {Object} data Artist object
	     */
	
	  }, {
	    key: 'genres',
	    set: function set(data) {
	      this._genres = data;
	    }
	
	    /**
	     * @return {String} Artist genres
	     */
	    ,
	    get: function get() {
	      return this._genres;
	    }
	
	    /**
	     * @param {Object} data Artist object
	     */
	
	  }, {
	    key: 'href',
	    set: function set(data) {
	      this._href = data;
	    }
	
	    /**
	     * @return {String} Artist href
	     */
	    ,
	    get: function get() {
	      return this._href;
	    }
	
	    /**
	     * @param {Object} data Artist object
	     */
	
	  }, {
	    key: 'id',
	    set: function set(data) {
	      this._id = data;
	    }
	
	    /**
	     * @return {String} Artist id
	     */
	    ,
	    get: function get() {
	      return this._id;
	    }
	
	    /**
	     * @param {Object} data Artist object
	     */
	
	  }, {
	    key: 'images',
	    set: function set(data) {
	      this._images = data;
	    }
	
	    /**
	     * @return {String} Artist images
	     */
	    ,
	    get: function get() {
	      return this._images;
	    }
	
	    /**
	     * @param {Object} data Artist object
	     */
	
	  }, {
	    key: 'name',
	    set: function set(data) {
	      this._name = data;
	    }
	
	    /**
	     * @return {String} Artist name
	     */
	    ,
	    get: function get() {
	      return this._name;
	    }
	
	    /**
	     * @param {Object} data Artist object
	     */
	
	  }, {
	    key: 'popularity',
	    set: function set(data) {
	      this._popularity = data;
	    }
	
	    /**
	     * @return {String} Artist popularity
	     */
	    ,
	    get: function get() {
	      return this._popularity;
	    }
	
	    /**
	     * @param {Object} data Artist object
	     */
	
	  }, {
	    key: 'type',
	    set: function set(data) {
	      this._type = data;
	    }
	
	    /**
	     * @return {String} Entity type
	     */
	    ,
	    get: function get() {
	      return this._type;
	    }
	
	    /**
	     * @param {Object} data Artist object
	     */
	
	  }, {
	    key: 'uri',
	    set: function set(data) {
	      this._uri = data;
	    }
	
	    /**
	     * @return {String} Artist uri
	     */
	    ,
	    get: function get() {
	      return this._uri;
	    }
	  }]);
	
	  return ArtistEntity;
	}();
	
	/**
	 * Exports the AlbumEntity class.
	 */
	
	
	exports.default = ArtistEntity;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Album = __webpack_require__(7);
	
	var _Album2 = _interopRequireDefault(_Album);
	
	var _Client = __webpack_require__(1);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Methods for retrieving information about one or more albums from the Spotify catalog.
	 *
	 * @see https://developer.spotify.com/web-api/album-endpoints/
	 */
	var AlbumHandler = function () {
	  function AlbumHandler() {
	    _classCallCheck(this, AlbumHandler);
	  }
	
	  _createClass(AlbumHandler, [{
	    key: 'search',
	
	
	    /**
	     * Get a collection of albums that match a keyword string.
	     *
	     * @see https://developer.spotify.com/web-api/search-item/
	     *
	     * @public
	     * @param {String} name Name of the album.
	     * @param {Object} [query] Query parameters.
	     * @returns {Promise} albumsCollection
	     */
	    value: function search(name, query) {
	      return _Client2.default.instance.request('/search?type=album&q=' + encodeURIComponent(name), 'GET', query);
	    }
	
	    /**
	     * Get a single/collection of album/s identified by its unique/list of Spotify ID.
	     *
	     * @see https://developer.spotify.com/web-api/get-album/
	     *
	     * @public
	     * @param {String|Array} ids Album id/ids to retrive
	     * @param {Object} [query] Query parameters.
	     * @returns {Promise} Album|albumsCollection
	     */
	
	  }, {
	    key: 'get',
	    value: function get(ids, query) {
	      if (Array.isArray(ids)) {
	        return _Client2.default.instance.request('/albums/?ids=' + ids, 'GET', query);
	      } else {
	        return _Client2.default.instance.request('/albums/' + ids, 'GET', query);
	      }
	    }
	
	    /**
	     * Get a list of new album releases featured in Spotify.
	     *
	     * @see https://developer.spotify.com/web-api/get-list-new-releases/
	     *
	     * @public
	     * @required {OAuth} user-library-read
	     * @param {Object} [query] Query parameters.
	     * @returns {Promise} albumsCollection
	     */
	
	  }, {
	    key: 'newReleases',
	    value: function newReleases(query) {
	      return _Client2.default.instance.request('/browse/new-releases', 'GET', query);
	    }
	
	    /**
	     * Convert a valid object to a Album entity
	     *
	     * @public
	     * @param {Object} item Object to convert in entity
	     * @returns {Object} Album
	     */
	
	  }, {
	    key: 'convert',
	    value: function convert(item) {
	      return new _Album2.default(item);
	    }
	  }]);
	
	  return AlbumHandler;
	}();
	
	/**
	 * Exports the AlbumHandler class.
	 */
	
	
	exports.default = AlbumHandler;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _AlbumEntity2 = __webpack_require__(8);
	
	var _AlbumEntity3 = _interopRequireDefault(_AlbumEntity2);
	
	var _AlbumHandler = __webpack_require__(6);
	
	var _AlbumHandler2 = _interopRequireDefault(_AlbumHandler);
	
	var _Factory = __webpack_require__(2);
	
	var _Factory2 = _interopRequireDefault(_Factory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Add helpers methods to AlbumEntity
	 */
	var Album = function (_AlbumEntity) {
	  _inherits(Album, _AlbumEntity);
	
	  /**
	    * @param {Object} data Album object
	    */
	  function Album(data) {
	    _classCallCheck(this, Album);
	
	    return _possibleConstructorReturn(this, (Album.__proto__ || Object.getPrototypeOf(Album)).call(this, data));
	  }
	
	  return Album;
	}(_AlbumEntity3.default);
	
	/**
	 * Exports the Playlist class.
	 */
	
	
	exports.default = Album;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Properties and methods of the Album Entity
	 *
	 * @see https://developer.spotify.com/web-api/object-model/#album-object-full
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AlbumEntity = function () {
	
	  /**
	   * Constructor
	   *
	   * @param {Object} data Album object
	   */
	  function AlbumEntity() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, AlbumEntity);
	
	    this._album_type = data.album_type;
	    this._artists = data.artists;
	    this._available_markets = data.available_markets;
	    this._copyrights = data.copyrights;
	    this._external_ids = data.external_ids;
	    this._external_urls = data.external_urls;
	    this._genres = data.genres;
	    this._href = data.href;
	    this._id = data.id;
	    this._images = data.images;
	    this._name = data.name;
	    this._popularity = data.popularity;
	    this._release_date = data.release_date;
	    this._release_date_precision = data.release_date_precision;
	    this._tracks = data.tracks;
	    this._type = data.type;
	    this._uri = data.uri;
	  }
	
	  /**
	   * @param {Object} data Album object
	   */
	
	
	  _createClass(AlbumEntity, [{
	    key: 'album_type',
	    set: function set(data) {
	      this._album_type = data.album_type;
	    }
	
	    /**
	     * @return {String} Album type
	     */
	    ,
	    get: function get() {
	      return this._album_type;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'artists',
	    set: function set(data) {
	      this._artists = data.artists;
	    }
	
	    /**
	     * @return {String} Album artists
	     */
	    ,
	    get: function get() {
	      return this._artists;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'available_markets',
	    set: function set(data) {
	      this._available_markets = data.available_markets;
	    }
	
	    /**
	     * @return {String} Album available_markets
	     */
	    ,
	    get: function get() {
	      return this._available_markets;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'copyrights',
	    set: function set(data) {
	      this._copyrights = data.copyrights;
	    }
	
	    /**
	     * @return {String} Album copyrights
	     */
	    ,
	    get: function get() {
	      return this._copyrights;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'external_ids',
	    set: function set(data) {
	      this._external_ids = data.external_ids;
	    }
	
	    /**
	     * @return {String} Album external_ids
	     */
	    ,
	    get: function get() {
	      return this._external_ids;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'external_urls',
	    set: function set(data) {
	      this._external_urls = data.external_urls;
	    }
	
	    /**
	     * @return {String} Album external_urls
	     */
	    ,
	    get: function get() {
	      return this._external_urls;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'genres',
	    set: function set(data) {
	      this._genres = data.genres;
	    }
	
	    /**
	     * @return {String} Album genres
	     */
	    ,
	    get: function get() {
	      return this._genres;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'href',
	    set: function set(data) {
	      this._href = data.href;
	    }
	
	    /**
	     * @return {String} Album href
	     */
	    ,
	    get: function get() {
	      return this._href;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'id',
	    set: function set(data) {
	      this._id = data.id;
	    }
	
	    /**
	     * @return {String} Album id
	     */
	    ,
	    get: function get() {
	      return this._id;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'images',
	    set: function set(data) {
	      this._images = data.images;
	    }
	
	    /**
	     * @return {String} Album images
	     */
	    ,
	    get: function get() {
	      return this._images;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'name',
	    set: function set(data) {
	      this._name = data.name;
	    }
	
	    /**
	     * @return {String} Album name
	     */
	    ,
	    get: function get() {
	      return this._name;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'popularity',
	    set: function set(data) {
	      this._popularity = data.popularity;
	    }
	
	    /**
	     * @return {String} Album popularity
	     */
	    ,
	    get: function get() {
	      return this._popularity;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'release_date',
	    set: function set(data) {
	      this._release_date = data.release_date;
	    }
	
	    /**
	     * @return {String} Album release_date
	     */
	    ,
	    get: function get() {
	      return this._release_date;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'release_date_precision',
	    set: function set(data) {
	      this._release_date_precision = data.release_date_precision;
	    }
	
	    /**
	     * @return {String} Album release_date_precision
	     */
	    ,
	    get: function get() {
	      return this._release_date_precision;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'tracks',
	    set: function set(data) {
	      this._tracks = data.tracks;
	    }
	
	    /**
	     * @return {String} Album tracks
	     */
	    ,
	    get: function get() {
	      return this._tracks;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'type',
	    set: function set(data) {
	      this._type = data.type;
	    }
	
	    /**
	     * @return {String} Entity type
	     */
	    ,
	    get: function get() {
	      return this._type;
	    }
	
	    /**
	     * @param {Object} data Album object
	     */
	
	  }, {
	    key: 'uri',
	    set: function set(data) {
	      this._uri = data.uri;
	    }
	
	    /**
	     * @return {String} Album uri
	     */
	    ,
	    get: function get() {
	      return this._uri;
	    }
	  }]);
	
	  return AlbumEntity;
	}();
	
	/**
	 * Exports the AlbumEntity class.
	 */
	
	
	exports.default = AlbumEntity;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Track = __webpack_require__(10);
	
	var _Track2 = _interopRequireDefault(_Track);
	
	var _Client = __webpack_require__(1);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Methods for retrieving information about one or more tracks from the Spotify catalog.
	 *
	 * @see https://developer.spotify.com/web-api/track-endpoints/
	 */
	var TrackHandler = function () {
	  function TrackHandler() {
	    _classCallCheck(this, TrackHandler);
	  }
	
	  _createClass(TrackHandler, [{
	    key: 'search',
	
	
	    /**
	     * Get a collection of tracks that match a keyword string.
	     *
	     * @see https://developer.spotify.com/web-api/search-item/
	     *
	     * @public
	     * @param {String} name Name of the track.
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} trackCollection
	     */
	    value: function search(name, query) {
	      return _Client2.default.instance.request('/search?type=track&q=' + encodeURIComponent(name), 'GET', query);
	    }
	
	    /**
	     * Get a single/collection of track/s identified by its unique/list of Spotify ID.
	     *
	     * @see https://developer.spotify.com/web-api/get-albums-tracks/ FIXME: check the url
	     *
	     * @public
	     * @param {String|Array} ids Track id/ids to retrive
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} Track|trackCollection
	     */
	
	  }, {
	    key: 'get',
	    value: function get(ids, query) {
	      if (Array.isArray(ids)) {
	        return _Client2.default.instance.request('/tracks/?ids=' + ids, 'GET', query);
	      } else {
	        return _Client2.default.instance.request('/tracks/' + ids, 'GET', query);
	      }
	    }
	
	    /**
	     * Get audio feature information for a single track identified by its unique Spotify ID
	     *
	     * @see https://developer.spotify.com/web-api/get-audio-features/
	     *
	     * @public
	     * @param {In/Arrayt} ids Track id or ids
	     * @return {Promise} Track|trackCollection
	     */
	
	  }, {
	    key: 'audioFeatures',
	    value: function audioFeatures(ids) {
	      if (Array.isArray(ids)) {
	        return _Client2.default.instance.request('/audio-features', 'GET', { ids: ids });
	      } else {
	        return _Client2.default.instance.request('/audio-features/' + ids, 'GET');
	      }
	    }
	
	    /**
	     * Convert a valid object to a Track entity
	     *
	     * @public
	     * @param {Object} item Object to convert in entity
	     * @return {Object}
	     */
	
	  }, {
	    key: 'convert',
	    value: function convert(item) {
	      if (item.uri) {
	        return new _Track2.default(item);
	      } else {
	        return new _Track2.default(item.track);
	      }
	    }
	  }]);
	
	  return TrackHandler;
	}();
	
	/**
	 * Exports the TrackHandler class.
	 */
	
	
	exports.default = TrackHandler;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _TrackEntity2 = __webpack_require__(11);
	
	var _TrackEntity3 = _interopRequireDefault(_TrackEntity2);
	
	var _TrackHandler = __webpack_require__(9);
	
	var _TrackHandler2 = _interopRequireDefault(_TrackHandler);
	
	var _Factory = __webpack_require__(2);
	
	var _Factory2 = _interopRequireDefault(_Factory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Add helpers methods to TrackEntity
	 */
	var Track = function (_TrackEntity) {
	  _inherits(Track, _TrackEntity);
	
	  /**
	   * @param {Object} data Track object
	   */
	  function Track(data) {
	    _classCallCheck(this, Track);
	
	    return _possibleConstructorReturn(this, (Track.__proto__ || Object.getPrototypeOf(Track)).call(this, data));
	  }
	
	  /**
	   * Get a list of Tracks of an Artist.
	   *
	   * @public
	   * @return {Promise}
	   */
	
	
	  _createClass(Track, [{
	    key: 'audioFeatures',
	    value: function audioFeatures() {
	      return new _TrackHandler2.default().audioFeatures(this.id);
	    }
	  }, {
	    key: 'artists',
	    get: function get() {
	      return (0, _Factory2.default)(this._artists);
	    }
	
	    /**
	     * Convert duration from ms to m
	     *
	     * @public
	     * @return {String} mm:ss
	     */
	
	  }, {
	    key: 'durationM',
	    get: function get() {
	      var x = ~~(Number(this._duration_ms) / 1000);
	      var seconds = x % 60;
	      seconds = ('' + seconds).length == 1 ? '0' + seconds : seconds;
	      x = ~~(x / 60);
	      var minutes = x % 60;
	      return minutes + ':' + seconds;
	    }
	  }]);
	
	  return Track;
	}(_TrackEntity3.default);
	
	/**
	 * Exports the Track class.
	 */
	
	
	exports.default = Track;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Properties and methods of the Track Entity
	 *
	 * @see https://developer.spotify.com/web-api/object-model/#track-object-full
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TrackEntity = function () {
	
	  /**
	   * Constructor
	   *
	   * @param {Object} data Track object
	   */
	  function TrackEntity() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, TrackEntity);
	
	    this._album = data.album;
	    this._artists = data.artists;
	    this._available_markets = data.available_markets;
	    this._disc_number = data.disc_number;
	    this._duration_ms = data.duration_ms;
	    this._explicit = data.explicit;
	    this._external_ids = data.external_ids;
	    this._external_urls = data.external_urls;
	    this._href = data.href;
	    this._id = data.id;
	    // this._is_playable = data.is_playable; @relinking
	    // this._linked_from = data.linked_from; @relinking
	    this._name = data.name;
	    this._popularity = data.popularity;
	    this._preview_url = data.preview_url;
	    this._track_number = data.track_number;
	    this._type = 'track';
	    this._uri = data.uri;
	  }
	
	  /**
	   * @param {Object} data Track object
	   */
	
	
	  _createClass(TrackEntity, [{
	    key: 'album',
	    set: function set(data) {
	      this._album = data;
	    }
	
	    /**
	     * @return {String} Track album
	     */
	    ,
	    get: function get() {
	      return this._album;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'artists',
	    set: function set(data) {
	      this._artists = data;
	    }
	
	    /**
	     * @return {String} Track artists
	     */
	    ,
	    get: function get() {
	      return this._artists;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'available_markets',
	    set: function set(data) {
	      this._available_markets = data;
	    }
	
	    /**
	     * @return {String} Track available_markets
	     */
	    ,
	    get: function get() {
	      return this._available_markets;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'disc_number',
	    set: function set(data) {
	      this._disc_number = data;
	    }
	
	    /**
	     * @return {String} Track disc_number
	     */
	    ,
	    get: function get() {
	      return this._disc_number;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'duration_ms',
	    set: function set(data) {
	      this._duration_ms = data;
	    }
	
	    /**
	     * @return {String} Track duration_ms
	     */
	    ,
	    get: function get() {
	      return this._duration_ms;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'explicit',
	    set: function set(data) {
	      this._explicit = data;
	    }
	
	    /**
	     * @return {String} Track explicit
	     */
	    ,
	    get: function get() {
	      return this._explicit;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'external_ids',
	    set: function set(data) {
	      this._external_ids = data;
	    }
	
	    /**
	     * @return {String} Track external_ids
	     */
	    ,
	    get: function get() {
	      return this._external_ids;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'external_urls',
	    set: function set(data) {
	      this._external_urls = data;
	    }
	
	    /**
	     * @return {String} Track external_urls
	     */
	    ,
	    get: function get() {
	      return this._external_urls;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'href',
	    set: function set(data) {
	      this._href = data;
	    }
	
	    /**
	     * @return {String} Track href
	     */
	    ,
	    get: function get() {
	      return this._href;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'id',
	    set: function set(data) {
	      this._id = data;
	    }
	
	    /**
	     * @return {String} Track id
	     */
	    ,
	    get: function get() {
	      return this._id;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'is_playable',
	    set: function set(data) {
	      this._is_playable = data;
	    }
	
	    /**
	     * @return {String} Track is_playable
	     */
	    ,
	    get: function get() {
	      return this._is_playable;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'linked_from',
	    set: function set(data) {
	      this._linked_from = data;
	    }
	
	    /**
	     * @return {String} Track linked_from
	     */
	    ,
	    get: function get() {
	      return this._linked_from;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'name',
	    set: function set(data) {
	      this._name = data;
	    }
	
	    /**
	     * @return {String} Track name
	     */
	    ,
	    get: function get() {
	      return this._name;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'popularity',
	    set: function set(data) {
	      this._popularity = data;
	    }
	
	    /**
	     * @return {String} Track popularity
	     */
	    ,
	    get: function get() {
	      return this._popularity;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'preview_url',
	    set: function set(data) {
	      this._preview_url = data;
	    }
	
	    /**
	     * @return {String} Track preview_url
	     */
	    ,
	    get: function get() {
	      return this._preview_url;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'track_number',
	    set: function set(data) {
	      this._track_number = data;
	    }
	
	    /**
	     * @return {String} Track track_number
	     */
	    ,
	    get: function get() {
	      return this._track_number;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'type',
	    set: function set(data) {
	      this._type = data;
	    }
	
	    /**
	     * @return {String} Track type
	     */
	    ,
	    get: function get() {
	      return this._type;
	    }
	
	    /**
	     * @param {Object} data Track object
	     */
	
	  }, {
	    key: 'uri',
	    set: function set(data) {
	      this._uri = data;
	    }
	
	    /**
	     * @return {String} Track uri
	     */
	    ,
	    get: function get() {
	      return this._uri;
	    }
	  }]);
	
	  return TrackEntity;
	}();
	
	/**
	 * Exports the TrackEntity class.
	 */
	
	
	exports.default = TrackEntity;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Playlist = __webpack_require__(13);
	
	var _Playlist2 = _interopRequireDefault(_Playlist);
	
	var _Client = __webpack_require__(1);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Methods for retrieving information about playlists and for managing playlists.
	 *
	 * @see https://developer.spotify.com/web-api/playlist-endpoints/
	 */
	var PlaylistHandler = function () {
	  function PlaylistHandler() {
	    _classCallCheck(this, PlaylistHandler);
	  }
	
	  _createClass(PlaylistHandler, [{
	    key: 'search',
	
	
	    /**
	     * Get a collection of artists that match a keyword string.
	     *
	     * @see https://developer.spotify.com/web-api/search-item/
	     *
	     * @public
	     * @param {String} name Name of the playlist.
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} playlistCollection
	     */
	    value: function search(name, query) {
	      return _Client2.default.instance.request('/search?type=playlist&q=' + encodeURIComponent(name), 'GET', query);
	    }
	
	    /**
	     * Get a list of Spotify featured playlists.
	     * @see https://developer.spotify.com/web-api/get-list-featured-playlists/
	     *
	     * @public
	     * @required {OAuth}
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} playlistCollection
	     */
	
	  }, {
	    key: 'featuredPlaylists',
	    value: function featuredPlaylists(query) {
	      return _Client2.default.instance.request('/browse/featured-playlists', 'GET', query);
	    }
	
	    /**
	     * Get a list of Spotify playlists tagged with a particular category.
	     * @see https://developer.spotify.com/web-api/get-categorys-playlists/
	     *
	     * @public
	     * @required {OAuth}
	     * @param {int} id Category id
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} playlistCollection
	     */
	
	  }, {
	    key: 'categoriesPlaylists',
	    value: function categoriesPlaylists(id, query) {
	      return _Client2.default.instance.request('/browse/categories/' + id + '/playlists', 'GET', query);
	    }
	
	    /**
	     * Add one or more tracks to a user’s playlist.
	     * @see https://developer.spotify.com/web-api/add-tracks-to-playlist/
	     *
	     * @public
	     * @required {OAuth}
	     * @param {array} tracks List of uri tracks
	     * @param {String} userId User id
	     * @param {String} playlistId Playlist id
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'addTracks',
	    value: function addTracks(tracks, userId, playlistId, query) {
	      return _Client2.default.instance.request('/users/' + userId + '/playlists/' + playlistId + '/tracks', 'POST', { uris: tracks });
	    }
	
	    /**
	     * Remove one or more tracks from a user’s playlist.
	     * @see https://developer.spotify.com/web-api/remove-tracks-playlist/
	     *
	     * @public
	     * @required {OAuth}
	     * @param {array} tracks List of uri tracks
	     * @param {String} userId User id
	     * @param {String} playlistId Playlist id
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'removeTracks',
	    value: function removeTracks(tracks, userId, playlistId, query) {
	      return _Client2.default.instance.request('/users/' + userId + '/playlists/' + playlistId + '/tracks', 'DELETE', { uris: tracks });
	    }
	
	    /**
	     * Add a user as a follower of a playlist.
	     * @see https://developer.spotify.com/web-api/follow-playlist/
	     *
	     * @public
	     * @required {OAuth}
	     * @param {String} userId User id
	     * @param {String} playlistId Playlist id
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'follow',
	    value: function follow(userId, playlistId, query) {
	      return _Client2.default.instance.request('/users/' + userId + '/playlists/' + playlistId + '/followers', 'PUT');
	    }
	
	    /**
	     * Remove a user as a follower of a playlist.
	     * @see https://developer.spotify.com/web-api/unfollow-playlist/
	     *
	     * @public
	     * @required {OAuth}
	     * @param {String} userId User id
	     * @param {String} playlistId Playlist id
	     * @param {Object} [query] Query parameters.
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'unfollow',
	    value: function unfollow(userId, playlistId, query) {
	      return _Client2.default.instance.request('/users/' + userId + '/playlists/' + playlistId + '/followers', 'DELETE');
	    }
	
	    /**
	     * Check to see if one or more Spotify users are following a specified playlist.
	     * @see https://developer.spotify.com/web-api/check-user-following-playlist/
	     *
	     * @public
	     * @required {OAuth}
	     * @param {Array} ids User id list
	     * @param {String} userId User id
	     * @param {String} playlistId Playlist id
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'contains',
	    value: function contains(userId, playlistId, ids) {
	      return _Client2.default.instance.request('/users/' + userId + '/playlists/' + playlistId + '/followers/contains', 'GET', { ids: ids });
	    }
	
	    /**
	     * Create a playlist for a Spotify user.
	     * @see https://developer.spotify.com/web-api/create-playlist/
	     *
	     * @public
	     * @required {OAuth}
	     * @param {String} userId User id
	     * @param {String} name Name of the future playlist
	     * @param {Bool} is_public public or private
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'create',
	    value: function create(userId, name, is_public) {
	      return _Client2.default.instance.request('/users/' + userId + '/playlists', 'POST', { name: name, public: is_public });
	    }
	
	    /**
	     * Change a playlist’s name and public/private state.
	     * @see https://developer.spotify.com/web-api/change-playlist-details/
	     *
	     * @public
	     * @required {OAuth}
	     * @param {String} userId User id
	     * @param {String} playlistId Playlist id
	     * @param {String} name Name of the future playlist
	     * @param {Bool} is_public public or private
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'edit',
	    value: function edit(userId, playlistId, name, is_public) {
	      return _Client2.default.instance.request('/users/' + userId + '/playlists', 'PUT', { name: name, public: is_public });
	    }
	
	    /**
	     * Convert a valid object to a Playlist entity
	     *
	     * @public
	     * @param {Object} item Object to convert in entity
	     * @return {Object}
	     */
	
	  }, {
	    key: 'convert',
	    value: function convert(item) {
	      return new _Playlist2.default(item);
	    }
	  }]);
	
	  return PlaylistHandler;
	}();
	
	/**
	 * Exports the PlaylistHandler class.
	 */
	
	
	exports.default = PlaylistHandler;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _PlaylistEntity2 = __webpack_require__(14);
	
	var _PlaylistEntity3 = _interopRequireDefault(_PlaylistEntity2);
	
	var _PlaylistHandler = __webpack_require__(12);
	
	var _PlaylistHandler2 = _interopRequireDefault(_PlaylistHandler);
	
	var _Factory = __webpack_require__(2);
	
	var _Factory2 = _interopRequireDefault(_Factory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Add helpers methods to PlaylistEntity
	 */
	var Playlist = function (_PlaylistEntity) {
	  _inherits(Playlist, _PlaylistEntity);
	
	  /**
	   * @param {Object} data Playlist object
	   */
	  function Playlist(data) {
	    _classCallCheck(this, Playlist);
	
	    return _possibleConstructorReturn(this, (Playlist.__proto__ || Object.getPrototypeOf(Playlist)).call(this, data));
	  }
	
	  /**
	   * Get a list of Tracks of a Playlist.
	   *
	   * @public
	   * @override
	   * @return {Promise}
	   */
	
	
	  _createClass(Playlist, [{
	    key: 'addTrack',
	
	
	    /**
	     * Add one or more Tracks to a Playlist.
	     *
	     * @public
	     * @param {Array} tracks Tracks list
	     * @param {Object} [query] Query parameters.
	     * @return {Promise}
	     */
	    value: function addTrack(tracks, query) {
	      var trackList = tracks.map(function (track) {
	        return track.uri;
	      });
	      return new _PlaylistHandler2.default().addTracks(trackList, this.owner.id, this.id, query);
	    }
	
	    /**
	     * Remove one or more Tracks to a Playlist.
	     *
	     * @public
	     * @param {Array} tracks Tracks list
	     * @param {Object} [query] Query parameters.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'removeTrack',
	    value: function removeTrack(tracks, query) {
	      var trackList = tracks.map(function (track) {
	        return track.uri;
	      });
	      return new _PlaylistHandler2.default().removeTracks(trackList, this.owner.id, this.id, query);
	    }
	
	    /**
	     * Follow a Playlist
	     *
	     * @public
	     * @param {Object} [query] query parameters.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'follow',
	    value: function follow(query) {
	      return new _PlaylistHandler2.default().follow(this.owner.id, this.id, query);
	    }
	
	    /**
	     * Unfollow a Playlist
	     *
	     * @public
	     * @param {Object} [query] Query parameters.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'unfollow',
	    value: function unfollow(query) {
	      return new _PlaylistHandler2.default().unfollow(this.owner.id, this.id, query);
	    }
	
	    /**
	     * Verify if a user follow a playlist
	     *
	     * @public
	     * @param {Array} [ids] User ids list.
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'contains',
	    value: function contains(ids) {
	      return new _PlaylistHandler2.default().contains(this.owner.id, this.id, ids);
	    }
	
	    /**
	     * Edit a Playlist
	     *
	     * @public
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'edit',
	    value: function edit() {
	      return new _PlaylistHandler2.default().edit(this.owner.id, this.id, this.name, this.public);
	    }
	  }, {
	    key: 'tracks',
	    get: function get() {
	      return (0, _Factory2.default)(this._tracks);
	    }
	  }]);
	
	  return Playlist;
	}(_PlaylistEntity3.default);
	
	/**
	 * Exports the Playlist class.
	 */
	
	
	exports.default = Playlist;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Properties and methods of the Playlist Entity
	 *
	 * @see https://developer.spotify.com/web-api/object-model/#playlist-object-full
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PlaylistEntity = function () {
	
	  /**
	   * Constructor
	   *
	   * @param {Object} data Playlist object
	   */
	  function PlaylistEntity() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, PlaylistEntity);
	
	    this._collaborative = data.collaborative;
	    this._description = data.description;
	    this._external_urls = data.external_urls;
	    this._followers = data.followers;
	    this._href = data.href;
	    this._id = data.id;
	    this._images = data.images;
	    this._name = data.name;
	    this._owner = data.owner;
	    this._public = data.public;
	    this._snapshot_id = data.snapshot_id;
	    this._tracks = data.tracks;
	    this._type = data.type;
	    this._uri = data.uri;
	  }
	
	  /**
	   * @param {Object} data Playlist object
	   */
	
	
	  _createClass(PlaylistEntity, [{
	    key: 'collaborative',
	    set: function set(data) {
	      this._collaborative = data;
	    }
	
	    /**
	     * @return {String} Playlist collaborative
	     */
	    ,
	    get: function get() {
	      return this._collaborative;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'description',
	    set: function set(data) {
	      this._description = data;
	    }
	
	    /**
	     * @return {String} Playlist description
	     */
	    ,
	    get: function get() {
	      return this._description;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'external_urls',
	    set: function set(data) {
	      this._external_urls = data;
	    }
	
	    /**
	     * @return {String} Playlist external_urls
	     */
	    ,
	    get: function get() {
	      return this._external_urls;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'followers',
	    set: function set(data) {
	      this._followers = data;
	    }
	
	    /**
	     * @return {String} Playlist followers
	     */
	    ,
	    get: function get() {
	      return this._followers;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'href',
	    set: function set(data) {
	      this._href = data;
	    }
	
	    /**
	     * @return {String} Playlist href
	     */
	    ,
	    get: function get() {
	      return this._href;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'id',
	    set: function set(data) {
	      this._id = data;
	    }
	
	    /**
	     * @return {Playlist} Album id
	     */
	    ,
	    get: function get() {
	      return this._id;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'images',
	    set: function set(data) {
	      this._images = data;
	    }
	
	    /**
	     * @return {String} Playlist images
	     */
	    ,
	    get: function get() {
	      return this._images;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'name',
	    set: function set(data) {
	      this._name = data;
	    }
	
	    /**
	     * @return {String} Playlist name
	     */
	    ,
	    get: function get() {
	      return this._name;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'owner',
	    set: function set(data) {
	      this._owner = data;
	    }
	
	    /**
	     * @return {String} Playlist owner
	     */
	    ,
	    get: function get() {
	      return this._owner;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'public',
	    set: function set(data) {
	      this._public = data;
	    }
	
	    /**
	     * @return {String} Playlist public
	     */
	    ,
	    get: function get() {
	      return this._public;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'snapshot_id',
	    set: function set(data) {
	      this._snapshot_id = data;
	    }
	
	    /**
	     * @return {String} Playlist snapshot_id
	     */
	    ,
	    get: function get() {
	      return this._snapshot_id;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'tracks',
	    set: function set(data) {
	      this._tracks = data;
	    }
	
	    /**
	     * @return {String} Playlist tracks
	     */
	    ,
	    get: function get() {
	      return this._tracks;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'type',
	    set: function set(data) {
	      this._type = data;
	    }
	
	    /**
	     * @return {String} Entity type
	     */
	    ,
	    get: function get() {
	      return this._type;
	    }
	
	    /**
	     * @param {Object} data Playlist object
	     */
	
	  }, {
	    key: 'uri',
	    set: function set(data) {
	      this._uri = data;
	    }
	
	    /**
	     * @return {Playlist} Album uri
	     */
	    ,
	    get: function get() {
	      return this._uri;
	    }
	  }]);
	
	  return PlaylistEntity;
	}();
	
	/**
	 * Exports the AlbumEntity class.
	 */
	
	
	exports.default = PlaylistEntity;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _User = __webpack_require__(16);
	
	var _User2 = _interopRequireDefault(_User);
	
	var _Client = __webpack_require__(1);
	
	var _Client2 = _interopRequireDefault(_Client);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Methods for retrieving information about one or more user/s from the Spotify catalog.
	 *
	 * @see https://developer.spotify.com/web-api/user-profile-endpoints/
	 */
	var UserHandler = function () {
	  function UserHandler() {
	    _classCallCheck(this, UserHandler);
	  }
	
	  _createClass(UserHandler, [{
	    key: 'me',
	
	
	    /**
	     * Get detailed profile information about the current user.
	     *
	     * @see https://developer.spotify.com/web-api/get-current-users-profile/
	     *
	     * @public
	     * @required {OAuth}
	     * @return {Promise} User
	     */
	    value: function me() {
	      return _Client2.default.instance.request('/me');
	    }
	
	    /**
	     * Get public profile information about a Spotify user.
	     *
	     * @see https://developer.spotify.com/web-api/get-users-profile/
	     *
	     * @public
	     * @param {String} id User id to retrive
	     * @required {OAuth}
	     * @return {Promise} User
	     */
	
	  }, {
	    key: 'get',
	    value: function get(id) {
	      return _Client2.default.instance.request('/users/' + id);
	    }
	
	    /**
	     * Get a list of the playlists owned or followed by a Spotify user.
	     *
	     * @see https://developer.spotify.com/web-api/get-list-users-playlists/
	     *
	     * @public
	     * @param {String} id User User id
	     * @param {String} [playlistId] id to retrive playlists
	     * @param {Object} [query] Query parameters.
	     * @required {OAuth}
	     * @return {Promise} playlistCollection
	     */
	
	  }, {
	    key: 'playlists',
	    value: function playlists(id, playlistId, query) {
	      if (playlistId) {
	        return _Client2.default.instance.request('/users/' + id + '/playlists/' + playlistId, 'GET', query);
	      } else {
	        return _Client2.default.instance.request('/users/' + id + '/playlists', 'GET', query);
	      }
	    }
	
	    /**
	     * Check if a user follow an album, artist , track or user
	     * @see https://developer.spotify.com/web-api/check-users-saved-albums/
	     * @see https://developer.spotify.com/web-api/check-current-user-follows/
	     *
	     * @public
	     * @required {OAuth} user-follow-read scope
	     * @param {String} type artist, album or user
	     * @param {Array} ids User id list
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'contains',
	    value: function contains(type, ids) {
	      if (type === 'album') {
	        return _Client2.default.instance.request('/me/albums/contains', 'GET', { ids: ids });
	      } else if (type === 'track') {
	        return _Client2.default.instance.request('/me/tracks/contains', 'GET', { ids: ids });
	      } else {
	        return _Client2.default.instance.request('/me/following/contains', 'GET', { ids: ids, type: type });
	      }
	    }
	
	    /**
	     * Get the current user’s top artists or tracks based on calculated affinity.
	     * @see https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/
	     *
	     * @public
	     * @required {OAuth} user-top-read
	     * @param {String} type artists or tracks
	     * @param {Object} query limit, offset or time_range(long_term, medium_term, short_term)
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'top',
	    value: function top(type, query) {
	      return _Client2.default.instance.request('/me/top/' + type, 'GET', query);
	    }
	
	    /**
	     * Get the current user’s saved tracks.
	     * @see https://developer.spotify.com/web-api/get-users-saved-tracks/
	     *
	     * @public
	     * @required {OAuth}
	     * @return {Promise} Tracks saved
	     */
	
	  }, {
	    key: 'tracks',
	    value: function tracks() {
	      return _Client2.default.instance.request('/me/tracks');
	    }
	
	    /**
	     * Get the current user’s saved albums.
	     * @see https://developer.spotify.com/web-api/get-users-saved-albums/
	     *
	     * @public
	     * @required {OAuth}
	     * @return {Promise} Albums saved
	     */
	
	  }, {
	    key: 'albums',
	    value: function albums() {
	      return _Client2.default.instance.request('/me/albums');
	    }
	
	    /**
	     * Convert a valid object to a User entity
	     *
	     * @public
	     * @param {object} item Object to convert in entity
	     * @return {Object}
	     */
	
	  }, {
	    key: 'convert',
	    value: function convert(item) {
	      return new _User2.default(item);
	    }
	  }]);
	
	  return UserHandler;
	}();
	
	/**
	 * Exports the UserHandler class.
	 */
	
	
	exports.default = UserHandler;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _UserEntity2 = __webpack_require__(17);
	
	var _UserEntity3 = _interopRequireDefault(_UserEntity2);
	
	var _UserHandler = __webpack_require__(15);
	
	var _UserHandler2 = _interopRequireDefault(_UserHandler);
	
	var _Factory = __webpack_require__(2);
	
	var _Factory2 = _interopRequireDefault(_Factory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Add helpers methods to UserEntity
	 */
	var User = function (_UserEntity) {
	  _inherits(User, _UserEntity);
	
	  /**
	   * @param {Object} data User object
	   */
	  function User(data) {
	    _classCallCheck(this, User);
	
	    return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).call(this, data));
	  }
	
	  /**
	   * Get user Playlists
	   *
	   * @public
	   * @param {String} id Playlist id.
	   * @return {Promise}
	   */
	
	
	  _createClass(User, [{
	    key: 'playlists',
	    value: function playlists(id) {
	      return new _UserHandler2.default().playlists(this.id, id);
	    }
	
	    /**
	     * Check if a user follow an album, artist or user
	     *
	     * @public
	     * @param {String} type artist, album or user
	     * @param {Array} ids User id list
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'contains',
	    value: function contains(type, ids) {
	      return new _UserHandler2.default().contains(type, ids);
	    }
	
	    /**
	     * Get a User’s Top Artists and Tracks
	     *
	     * @public
	     * @required {OAuth} user-top-read
	     * @param {String} type artists or tracks
	     * @param {Object} query limit, offset or time_range(long_term, medium_term, short_term)
	     * @return {Promise} JSON response
	     */
	
	  }, {
	    key: 'top',
	    value: function top(type, query) {
	      return new _UserHandler2.default().top(type, query);
	    }
	
	    /**
	     * Get user’s Saved Tracks
	     *
	     * @public
	     * @required {OAuth}
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'tracks',
	    value: function tracks() {
	      return new _UserHandler2.default().tracks();
	    }
	
	    /**
	     * Get user’s Saved Albums
	     *
	     * @public
	     * @required {OAuth}
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'albums',
	    value: function albums() {
	      return new _UserHandler2.default().albums();
	    }
	  }]);
	
	  return User;
	}(_UserEntity3.default);
	
	/**
	 * Exports the User class.
	 */
	
	
	exports.default = User;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Properties and methods of the User Entity
	 *
	 * @see https://developer.spotify.com/web-api/object-model/#user-object-private
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UserEntity = function () {
	
	  /**
	   * Constructor
	   *
	   * @param {Object} data User object
	   */
	  function UserEntity() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, UserEntity);
	
	    this._id = data.id;
	    this._birthdate = data.birthdate;
	    this._country = data.country;
	    this._display_name = data.display_name;
	    this._email = data.email;
	    this._external_urls = data.external_urls;
	    this._followers = data.followers;
	    this._href = data.href;
	    this._images = data.images;
	    this._product = data.product;
	    this._type = 'user';
	    this._uri = data.uri;
	  }
	
	  /**
	   * @return {String} User birthdate
	   */
	
	
	  _createClass(UserEntity, [{
	    key: 'birthdate',
	    get: function get() {
	      return this._birthdate;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._birthdate = data;
	    }
	
	    /**
	     * @return {String} User country
	     */
	
	  }, {
	    key: 'country',
	    get: function get() {
	      return this._country;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._country = data;
	    }
	
	    /**
	     * @return {String} User display_email
	     */
	
	  }, {
	    key: 'display_email',
	    get: function get() {
	      return this._display_email;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._display_email = data;
	    }
	
	    /**
	     * @return {String} User name
	     */
	
	  }, {
	    key: 'name',
	    get: function get() {
	      return this._name;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._name = data;
	    }
	
	    /**
	     * @return {String} User external_urls
	     */
	
	  }, {
	    key: 'external_urls',
	    get: function get() {
	      return this._external_urls;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._external_urls = data;
	    }
	
	    /**
	     * @return {String} User followers
	     */
	
	  }, {
	    key: 'followers',
	    get: function get() {
	      return this._followers;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._followers = data;
	    }
	
	    /**
	     * @return {String} User href
	     */
	
	  }, {
	    key: 'href',
	    get: function get() {
	      return this._href;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._href = data;
	    }
	
	    /**
	     * @return {String} User images
	     */
	
	  }, {
	    key: 'images',
	    get: function get() {
	      return this._images;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._images = data;
	    }
	
	    /**
	     * @return {String} User product
	     */
	
	  }, {
	    key: 'product',
	    get: function get() {
	      return this._product;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._product = data;
	    }
	
	    /**
	     * @return {String} Entity type
	     */
	
	  }, {
	    key: 'type',
	    get: function get() {
	      return this._type;
	    }
	
	    /**
	     * @return {String} User uri
	     */
	
	  }, {
	    key: 'uri',
	    get: function get() {
	      return this._uri;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._uri = data;
	    }
	
	    /**
	     * @return {User} Track id
	     */
	
	  }, {
	    key: 'id',
	    get: function get() {
	      return this._id;
	    }
	
	    /**
	     * @param {Object} data User object
	     */
	    ,
	    set: function set(data) {
	      this._id = data;
	    }
	  }]);
	
	  return UserEntity;
	}();
	
	/**
	 * Exports the UserEntity class.
	 */
	
	
	exports.default = UserEntity;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	"user strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Collection = __webpack_require__(19);
	
	var _Collection2 = _interopRequireDefault(_Collection);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Collection constructor
	 */
	var CollectionHandler =
	
	/**
	  * Constructor
	  *
	  * @public
	  * @param {Array} items Entity list
	  * @param {Object} handler Entity handler
	  * @param {Object} source Original response
	  * @return {Array} Collection
	  */
	function CollectionHandler(items, handler, source) {
	  _classCallCheck(this, CollectionHandler);
	
	  var collectionHelper = new _Collection2.default(source);
	  var collection = Object.assign(new Array(), collectionHelper);
	  // Super mega hack
	  collection.next = function () {
	    return collectionHelper.next;
	  };
	  collection.previous = function () {
	    return collectionHelper.previous;
	  };
	  collection.last = collectionHelper.last;
	  collection.first = collectionHelper.first;
	  collection.index = collectionHelper.index;
	
	  items.map(function (item) {
	    return collection.push(new handler().convert(item));
	  });
	
	  if (collection.length) {
	    collection.type = collection[0].type;
	  }
	
	  // collection.source = source; FIXME: review this
	  return collection;
	};
	
	/**
	 * Exports the CollectionHandler class.
	 */
	
	
	exports.default = CollectionHandler;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _CollectionEntity2 = __webpack_require__(20);
	
	var _CollectionEntity3 = _interopRequireDefault(_CollectionEntity2);
	
	var _Factory = __webpack_require__(2);
	
	var _Factory2 = _interopRequireDefault(_Factory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Add helpers methods to CollectionEntity
	 */
	var Collection = function (_CollectionEntity) {
	  _inherits(Collection, _CollectionEntity);
	
	  /**
	   * @param {Object} data Collection object
	   */
	  function Collection(data) {
	    _classCallCheck(this, Collection);
	
	    return _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this, data));
	  }
	
	  /**
	   * Get the next page of the Collection
	   *
	   * @public
	   * @override
	   * @return {Promise}
	   */
	
	
	  _createClass(Collection, [{
	    key: 'first',
	
	
	    /**
	     * Get the first Entity of the Collection
	     *
	     * @public
	     * @override
	     * @return {Object} Entity
	     */
	    value: function first() {
	      return this[0];
	    }
	
	    /**
	     * Get the last Entity of the Collection
	     *
	     * @public
	     * @override
	     * @return {Object} Entity
	     */
	
	  }, {
	    key: 'last',
	    value: function last() {
	      return this[this.length - 1];
	    }
	
	    /**
	     * Get a Entity based of a index
	     *
	     * @public
	     * @override
	     * @return {Object} Entity
	     */
	
	  }, {
	    key: 'index',
	    value: function index(id) {
	      return this[id];
	    }
	  }, {
	    key: 'next',
	    get: function get() {
	      return (0, _Factory2.default)({ href: this._next });
	    }
	
	    /**
	     * Get the prev page of the Collection
	     *
	     * @public
	     * @override
	     * @return {Promise}
	     */
	
	  }, {
	    key: 'previous',
	    get: function get() {
	      return (0, _Factory2.default)({ href: this._next });
	    }
	  }]);
	
	  return Collection;
	}(_CollectionEntity3.default);
	
	/**
	 * Exports the Collection class.
	 */
	
	
	exports.default = Collection;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	'use strict';
	
	/**
	 * Properties and methods of the Collection Entity
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Collection = function () {
	
	  /**
	   * Constructor
	   *
	   * @param {Object} data Api object
	   */
	  function Collection() {
	    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Collection);
	
	    this._href = data.href;
	    this._limit = data.limit;
	    this._next = data.next;
	    this._offset = data.offset;
	    this._previous = data.previous;
	    this._total = data.total;
	  }
	
	  /**
	   * @param {Object} data Api response type
	   */
	
	
	  _createClass(Collection, [{
	    key: 'type',
	    set: function set(data) {
	      this._type = data + 'Collection';
	    }
	
	    /**
	     * @return {String} Collection type
	     */
	    ,
	    get: function get() {
	      return this._type;
	    }
	
	    /**
	     * @param {Object} data Api response href
	     */
	
	  }, {
	    key: 'href',
	    set: function set(data) {
	      this._href = data.href;
	    }
	
	    /**
	     * @return {String} Collection href
	     */
	    ,
	    get: function get() {
	      return this._href;
	    }
	
	    /**
	     * @param {Object} data Api response limit
	     */
	
	  }, {
	    key: 'limit',
	    set: function set(data) {
	      this._limit = data.limit;
	    }
	
	    /**
	     * @return {String} Collection limit
	     */
	    ,
	    get: function get() {
	      return this._limit;
	    }
	
	    /**
	     * @param {Object} data Api response next
	     */
	
	  }, {
	    key: 'next',
	    set: function set(data) {
	      this._next = data.next;
	    }
	
	    /**
	     * @return {String} Collection next
	     */
	    ,
	    get: function get() {
	      return this._next;
	    }
	
	    /**
	     * @param {Object} data Api response offset
	     */
	
	  }, {
	    key: 'offset',
	    set: function set(data) {
	      this._offset = data.offset;
	    }
	
	    /**
	     * @return {String} Collection offset
	     */
	    ,
	    get: function get() {
	      return this._offset;
	    }
	
	    /**
	     * @param {Object} data Api response previous
	     */
	
	  }, {
	    key: 'previous',
	    set: function set(data) {
	      this._previous = data.previous;
	    }
	
	    /**
	     * @return {String} Collection previous
	     */
	    ,
	    get: function get() {
	      return this._previous;
	    }
	
	    /**
	     * @param {Object} data Api response total
	     */
	
	  }, {
	    key: 'total',
	    set: function set(data) {
	      this._total = data.total;
	    }
	
	    /**
	     * @return {String} Collection total
	     */
	    ,
	    get: function get() {
	      return this._total;
	    }
	  }]);
	
	  return Collection;
	}();
	
	/**
	 * Exports the Collection class.
	 */
	
	
	exports.default = Collection;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=home_dist.js.map