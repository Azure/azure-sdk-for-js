'use strict';
console.log();
console.log('Azure Cosmos DB Node.js Samples');
console.log('================================');
console.log();
console.log('USER MANAGEMENT');
console.log('================');
console.log();

var DocumentDBClient = require('documentdb').DocumentClient
    , DocumentBase = require('documentdb').DocumentBase
    , async = require('async')
    , config = require('../Shared/config')
    , fs = require('fs')
    , utils = require('../Shared/utils')
    , databaseId = config.names.database
    , dbLink

var host = config.connection.endpoint;
var masterKey = config.connection.authKey;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
var client = new DocumentDBClient(host, { masterKey: masterKey });

init(function (data) {

    //Callback called when all the required data is ready.

    //attempt admin operation. It should fail as the user does have only read access
    attemptAdminOperations(data.col1, data.user1, data.user1Col1ReadPermission)

    //attempts to write a document on a collection where user has access to read only
    attemptWriteWithReadPermissionAsync(data.col1, data.user1, data.user1Col1ReadPermission);

    //attempts to read from 2 collections.
    attemptReadFromTwoCollections(data.col1, data.col2, data.user1, data.user1Col1ReadPermission, data.user1ReadCol2Permission)
   
});

function init(callback)
{
    //--------------------------------------------------------------------------------------------------
    // We need a Database, Two Collections, Two Users, and some permissions for this sample,
    // So let's go ahead and set these up initially
    //--------------------------------------------------------------------------------------------------
    utils.getOrCreateDatabase(client, databaseId, function (err,db) {

        if (err)
        {
            handleError(err);
        } else
        {
            var databaseLink = 'dbs/' + databaseId;
            var col1Name = "COL1";
            var col2Name = "COL2";
            var user1Name = "Thomas Andersen";
            var user2Name = "Robin Wakefield";
            var doc1Name = "doc1";
            var doc2Name = "doc2";
            var doc3Name = "doc3";
            
            utils.getOrCreateCollection(client, databaseLink, col1Name, function (err, col1)
            {
                if (err) {
                    handleError(err);
                } else {

                    utils.getOrCreateCollection(client, databaseLink, col2Name, function (err, col2) {

                        if (err) {
                            handleError(err);
                        } else {

                            var col1Link = databaseLink + '/colls/' + col1Name;
                            var col2Link = databaseLink + '/colls/' + col2Name;

                            var docDef = { id: doc1Name };

                            var userDef = { id: user1Name };

                            var permissionDef;

                            client.upsertDocument(col1Link, docDef, function (err, doc1) {
                                if (err) {
                                    handleError(err)
                                } else {

                                    console.log(doc1Name + 'Created in ' + col1Name + ' !');

                                    docDef = { id: doc2Name };

                                    client.upsertDocument(col1Link, docDef, function (err, doc2) {

                                        if (err){
                                            handleError(err)
                                        } else {

                                            console.log(doc2Name + 'Created in ' +  col1Name + ' !');

                                            docDef = { id: doc3Name };

                                            client.upsertDocument(col2Link, docDef, function (err, doc3) {

                                                if (err) {
                                                    handleError(err);
                                                } else {
                                                    console.log(doc3Name + ' Created in ' + col2Name + ' !');

                                                    client.upsertUser(databaseLink, userDef, function (err, user1) {

                                                        if (err){
                                                            handleError(err);
                                                        } else {

                                                            console.log(user1Name + ' created!');

                                                            userDef = { id: user2Name };

                                                            client.upsertUser(databaseLink, userDef, function (err, user2) {

                                                                console.log(user2Name + ' created!');

                                                                // Read Permission on col1 for user1
                                                                permissionDef = { id : "p1", permissionMode: 'Read', resource: col1Link };

                                                                client.upsertPermission(user1._self, permissionDef, function (err, user1Col1ReadPermission) {

                                                                    if (err){
                                                                        handleError(err)
                                                                    } else {

                                                                        console.log('Read only permission assigned to Thomas Andersen on col1!');

                                                                        permissionDef = { id: "p2", permissionMode: 'All', resource: doc1._self };

                                                                        // All Permissions on Doc1 for user1
                                                                        client.upsertPermission(user1._self, permissionDef, function (err, user1AllDoc1Permission) {

                                                                            if (err) {
                                                                                handleError(err);
                                                                            } else {
                                                                                console.log('All permission assigned to Thomas Andersen on doc1!');

                                                                                permissionDef = { id: "p3", permissionMode: 'Read', resource: col2Link };

                                                                                // Read Permissions on Col2 for user1
                                                                                client.upsertPermission(user1._self, permissionDef, function (err, user1ReadCol2Permission) {
                                                                                    if (err) {

                                                                                        handleError(err);
                                                                                    } else {

                                                                                        console.log('Read permission assigned to Thomas Andersen on col2!');

                                                                                        permissionDef = { id: "p4", permissionMode: 'All', resource: col2Link };

                                                                                        client.upsertPermission(user2._self, permissionDef, function (err, user2ReadCol2Permission) {

                                                                                            if (err){

                                                                                                handleError(err);
                                                                                            } else {

                                                                                                console.log('All permission assigned to Robin Wakefield on col2!');

                                                                                                client.readPermissions(user1._self).toArray(function (err, permissions) {

                                                                                                    if (err){
                                                                                                        handleError(err);
                                                                                                    } else{
                                                                                                        console.log("Fetched permission for Thomas Andersen. Count is : " + permissions.length);

                                                                                                        var dataToReturn = new function () { };

                                                                                                        dataToReturn.user1 = user1;
                                                                                                        dataToReturn.user2 = user2;
                                                                                                        dataToReturn.user1Permissions = permissions;
                                                                                                        dataToReturn.col1 = col1;
                                                                                                        dataToReturn.col2 = col2;
                                                                                                        dataToReturn.user1Col1ReadPermission = user1Col1ReadPermission;
                                                                                                        dataToReturn.user1AllDoc1Permission = user1AllDoc1Permission;
                                                                                                        dataToReturn.user1ReadCol2Permission = user1ReadCol2Permission;
                                                                                                        dataToReturn.user2ReadCol2Permission = user2ReadCol2Permission;

                                                                                                        callback(dataToReturn);
                                                                                                    }

                                                                                                });

                                                                                            }

                                                                                        });

                                                                                    }
                                                                                });

                                                                            }
                                                                        });

                                                                    }

                                                                });
                                                                
                                                            });
                                                        }
                                                    });

                                                }
                                            });

                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }

    });
};

//handle error
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

//Attempt to do admin operations when user only has Read on a collection
function attemptAdminOperations(collection1Link,user1,user1Col1ReadPermission) {
    
    var resourceTokens = {};
    resourceTokens[(collection1Link._rid)] = (user1Col1ReadPermission._token); 

    var client = new DocumentDBClient(host, {
        resourceTokens: resourceTokens
    });
    
    client.readDocuments(collection1Link._self).toArray(function (err, documents) {

        if (err) {
            handleError(err);
        } else {
            console.log(user1.id + ' able to perform read operation on collection 1');
        }
    });

    client.readDatabases().toArray(function (err, databases) {
        if (err) {
            console.log('Expected error occurred as ' + user1.id + ' does not have access to get the list of databases. Error code : ' + err.code);
        } else {
            console.log('It should never come here as ' + user1.id + ' has read only permission on COL1');
        }
    });


}

//attempts to write in collection 1 with user 1 permission. It fails as the user1 has read only permission on col1
function attemptWriteWithReadPermissionAsync(collection1Link, user1, user1Col1ReadPermission)
{
    var resourceTokens = {};
    resourceTokens[(collection1Link._rid)] = (user1Col1ReadPermission._token);

    var client = new DocumentDBClient(host, {
        resourceTokens: resourceTokens
    });

    var docDef = { id: 'not allowed' };

    client.upsertDocument(collection1Link._self, docDef, function (err, doc2) {
        if (err) {
            console.log('Expected error occurred as ' + user1.id + ' does not have access to insert a document in COL1. Error code : ' + err.code);
        } else {
            console.log('It should never come here as ' + user1.id + ' has read only permission on COL1');
        }
    });
    
   
}

//attempts to read from both the collections as the user has read permission
function attemptReadFromTwoCollections(collection1Link, collection2Link, user1, user1Col1ReadPermission, user1ReadCol2Permission)
{
    var resourceTokens = {};
    resourceTokens[(collection1Link._rid)] = (user1Col1ReadPermission._token);
    resourceTokens[(collection2Link._rid)] = (user1ReadCol2Permission._token);


    var client = new DocumentDBClient(host, {
        resourceTokens: resourceTokens
    });


    client.readDocuments(collection1Link._self).toArray(function (err, documents) {

        if (err) {
            handleError(err);
        } else {
            console.log(user1.id + ' able to read documents from COL1. Document count is ' + documents.length);
        }

    });

    client.readDocuments(collection2Link._self).toArray(function (err, documents) {

        if (err) {
            handleError(err);
        } else {
            console.log(user1.id + ' able to read documents from COL2. Document count is ' + documents.length);
        }

    });


    var docDef = { id: 'not allowed' };

    client.upsertDocument(collection2Link._self, docDef, function (err, doc2) {
        if (err) {
            console.log('Expected error occurred as ' + user1.id + ' does not have access to insert a document in COL2. Error code : ' + err.code);
        } else {
            console.log('It should never come here as ' + user1.id + ' has read only permission on COL2');
        }
    });


}