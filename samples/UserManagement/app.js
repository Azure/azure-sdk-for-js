'use strict';
console.log();
console.log('Azure DocumentDB Node.js Samples');
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
    attemptAdminOperations(data.col1, data.user1Col1ReadPermission)
   
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
function attemptAdminOperations(collection1Link,user1Col1ReadPermission) {

    var permissionFeedValue = [user1Col1ReadPermission];

    var client = new DocumentDBClient(host, { permissionFeed: permissionFeedValue });

    client.readDocuments(collection1Link._self).toArray(function (err, documents) {

        if (err) {
            handleError(err);
        } else {
            console.log('user1 able to perform read operation on collection 1');
        }
    });
}