var DocumentDBClient = require('documentdb').DocumentClient;

var DocDBUtils = {
  getOrCreateDatabase: function(client, databaseId, callback) {
    var querySpec = {
      query: 'SELECT * FROM root r WHERE r.id=@id',
      parameters: [{
        name: '@id',
        value: databaseId
      }]
    };

    client.queryDatabases(querySpec).toArray(function(err, results) {
      if (err) {
        callback(err);
      }

      if (!err && results.length === 0) {
        client.createDatabase({
          id: databaseId
        }, function(err, created) {
          callback(null, created);
        });
      } else {
        callback(null, results[0]);
      }
    });
  },

  getOrCreateCollection: function(client, databaseLink, collectionId, callback) {
    var querySpec = {
      query: 'SELECT * FROM root r WHERE r.id=@id',
      parameters: [{
        name: '@id',
        value: collectionId
      }]
    };

    client.queryCollections(databaseLink, querySpec).toArray(function(err, results) {
      if (err) {
        callback(err);
      }

      if (!err && results.length === 0) {
        client.createCollection(databaseLink, {
          id: collectionId
        }, function(err, created) {
          callback(null, created);
        });
      } else {
        callback(null, results[0]);
      }
    });
  }
};

module.exports = DocDBUtils;
