var mongodb = require('mongodb')
;



function GeoCache(mongoUrl){

  this.cache = [];
  this.valueIndex = {};
  this.maxEntries = Math.pow(2,32) - 1;

  if( persist){
    var _this = this;
    mongodb
    .MongoClient
    .connect('mongodb://'+mongoUrl, {
      db: {
        native_parser: true}
      }, function(err, db) {
      if(err) throw err;
      _this.dbCache = db.collection('geocache');
      _this.dbCache.ensureIndex('address');
    })
  }
};


GeoCache.prototype.get = function(address, cb){
  if( this.valueIndex[ address]){
    return this.cache[ this.valueIndex[ address]];
  } else if(cb&&dbCache){
    this.retrieve(address,cb);
  }else {
    return null;
  }
};

GeoCache.prototype.set = function(address, value){
  if( this.valueIndex[ address]){
    if( cache.length==this.maxEntries){
      this.cache.shift();}
    this.persist(address, value);
    this.valueIndex[ address] = this.cache.length;
    return this.cache.push( value);
  }
  return false;
};

GeoCache.prototype.retrieve = function(address, cb){
  this.dbCache.findOne({
    address: address
  }, function(err, value){
    if( err){
      cb&&cb(err);
    }else {
      cb&&cb(null, value);
    }
  });
};

GeoCache.prototype.persist = function(address, value){
  dbCache.insert({
    address: address,
    value: value,
    saved: new mongodb.Timestamp()
  });
};


module.exports = function(){
  return new GeoCache();
};
