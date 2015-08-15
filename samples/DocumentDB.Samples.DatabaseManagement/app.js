console.log();
console.log('Azure DocumentDB Node.js Samples');
console.log('================================');
console.log();
console.log('DATABASE MANAGEMENT');
console.log('===================');
console.log();


var DocumentDBClient = require('documentdb').DocumentClient
  , config = require('../config')
  , databaseId = config.names.database
  
var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

//---------------------------------------------------------------------------------------------------
// This demo performs the following CRUD operations on a Database
//
// 1. findDatabaseById  - Attempt to find a database by Id, if found then just complete the sample
// 2. createDatabase    - If the database was not found, try create it
// 3. listDatabases     - Once the database was created, list all the databases on the account
// 4. readDatbase       - Read a database by its _self
// 5. readDatabase      - Read a database by its id (using new ID Based Routing)
// 6. deleteDatabase    - Delete a database given its id
//
//---------------------------------------------------------------------------------------------------



// 1.
console.log('1. findDatabaseById \'' + databaseId + '\'');
findDatabaseById(databaseId, function (err, db) {
    
    //no database found, let's go ahead with sample
    if (db == null) {
        console.log('Database with id ' + databaseId + ' not found.');

        // 2.
        console.log('\n2. createDatabase \'' + databaseId + '\'')
        createDatabase(databaseId, function (db) {
            if (db != null) {
                console.log('Database with id ' + db.id + ' created.');
                
                // 3.
                console.log('\n3. listDatabases');
                listDatabases(function (dbs) {
                    for (var i = 0; i < dbs.length; i++) {
                        console.log(dbs[i].id);
                    }
                                
                    // 4.
                    console.log('\n4. readDatabase - with _self \'' + db._self + '\'');
                    readDatabase(db, function (db) {                        
                        if (db != null) {
                            console.log('Database with _self \'' + db._self + '\' was found its id is \'' + db.id);
                        }
                        
                        // 5.
                        console.log('\n5. readDatabase - with id \'' + db.id + '\'');
                        readDatabaseById(databaseId, function () {
                            if (db != null) {
                                console.log('Database with uri of \'dbs/' + db.id + '\' was found its _self is \'' + db._self + '\'');
                            }

                            // 6.
                            console.log('\n6. deleteDatabase with id \'' + databaseId + '\'');
                            deleteDatabase(databaseId, function () {
                                finish();
                            });
                        });
                    });
                });
            }
        });
    
    //database already present, cleanup for next run
    } else {
        console.log('\nNothing more to do here, A database with id ' + databaseId + ' was already found.');
        deleteDatabase(databaseId, function () {
            finish();
        });
    }
});

//when using the new ID Based Routing URIs, the URI must NOT have a trailing / character
//i.e. instead of dbs/db/ (which is the format of a db._self) the URI should be dbs/db
function readDatabaseById(databaseId, callback) {
    client.readDatabase('dbs/' + databaseId, function (err, db) {
        if (err) {
            handleError(err);
        }
        
        callback(db);
    });
}

function readDatabase(database, callback) {
    client.readDatabase(database._self, function (err, db) {
        if (err) {
            handleError(err);
        }

        callback(db);
    });
}

function listDatabases(callback) {
    var queryIterator = client.readDatabases().toArray(function (err, dbs) {
        if (err) {
            handleError(err);
        }

        callback(dbs);
    });
}

function createDatabase(databaseId, callback) {
    var dbdef = {id : databaseId};

    client.createDatabase(dbdef, function (err, createdDatabase) {
        if (err) {
            handleError (err);
        }

        callback(createdDatabase);
    });
}

function deleteDatabase(databaseId, callback) {
    var dbLink = 'dbs/' + databaseId;

    client.deleteDatabase(dbLink, function (err) {
        if (err) {
            handleError(err);
        } else {
            console.log('Database with id \'' + databaseId + '\' deleted.');
            callback();
        }
    });
}

function findDatabaseById(databaseId, callback) {
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
            handleError(err);
        }
        
        if (results.length === 0) {
            // no error occured, but there were no results returned 
            // indicating no database exists matching the query            
            // so, explictly return null
            callback(null, null);
        } else {
            // we found a database, so return it
            callback(null, results[0]);
        }
    });
};

function handleError(error) {
    console.log();
    console.log('An error with code \'' + error.code + '\' has occurred:');
    console.log('\t' + JSON.parse(error.body).message);
    console.log();
    
    finish();
}

function finish() {
    console.log();
    console.log('End of demo.');
}