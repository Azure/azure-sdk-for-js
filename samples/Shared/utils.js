var utils = {
    deleteDatabase: function (client, databaseLink, callback) {
        client.deleteDatabase(databaseLink, function (err) {
            if (err) {
                callback(err);
            } else {
                console.log('Database \'' + databaseLink + '\'deleted');
                callback();
            }
        });
    },
        
    deleteCollection: function (client, collectionLink, callback) {
        client.deleteCollection(collectionLink, function (err) {
            if (err) {
                callback(err);
            } else {
                console.log('Collection \'' + collectionLink + '\'deleted');
                callback();
            }
        });
    },

    getOrCreateDatabase: function (client, databaseId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE  r.id = @id',
            parameters: [
                {
                    name: '@id',
                    value: databaseId
                }
            ]
        };
        client.queryDatabases(querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            }
        
            if (results.length === 0) {
                console.log('Database \'' + databaseId + '\'not found');
                var databaseDef = { id: databaseId };

                client.createDatabase(databaseDef, function (err, created) {
                    if (err) {
                        handleError(err);
                    }
                
                    console.log('Database \'' + databaseId + '\'created');
                    callback(null, created);
                });
            } else {
                console.log('Database \'' + databaseId + '\'found');
                callback(null, results[0]);
            }
        });
    },
    
    getOrCreateCollection: function (client, databaseLink, collectionId, callback) {
        var querySpec = {
            query: 'SELECT * FROM root r WHERE r.id=@id',
            parameters: [
                {
                    name: '@id',
                    value: collectionId
                }
            ]
        };

        client.queryCollections(databaseLink, querySpec).toArray(function (err, results) {
            if (err) {
                callback(err);
            }

            if (results.length === 0) {
                console.log('Collection \'' + collectionId + '\'not found');
                var collectionDef = { id: collectionId };

                client.createCollection(databaseLink, collectionDef, function (err, created) {
                    if (err) {
                        callback(err);
                    }

                    console.log('Collection \'' + collectionId + '\'created');
                    callback(null, created);
                });
            } else {
                console.log('Collection \'' + collectionId + '\'found');
                callback(null, results[0]);
            }
        });
    }
};

module.exports = utils;