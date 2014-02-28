var request = require('superagent')

  , geocache = require('./geocache')

  , defaults = {

    apiUrl: 'https://maps.googleapis.com/maps/api/geocode/json'

  }
;


function parseAddressResults(results){

};


function GeoCoder(apiKey){

  this._request = request.get(defaults.apiUrl);
  this._request.query({
    key: apiKey,
    sensor: false
  });

  this.results = [];
};


GeoCoder.prototype.find = function(place, cb){
  this
  ._request
  .query({
    address: place
  })
  .end(function(res){
    switch( res.body.status){
      case 'OK';
      case 'ZERO_RESULTS';
        this.results = res.body.results;
        cb&&cb(null, this.results);
      break;
      default:
        cb&&cb(res.body.status);
    }
  });
};


module.exports = function(options){
  return new GeoCoder(options.key);
};

module.exports.GeoCoder = GeoCoder;
