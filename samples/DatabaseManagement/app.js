// @ts-check
'use strict';
console.log();
console.log('Azure Cosmos DB Node.js Samples');
console.log('================================');
console.log();
console.log('DATABASE MANAGEMENT');
console.log('===================');
console.log();


const cosmos = require('../../lib/');
const CosmosClient = cosmos.CosmosClient;
const config = require('../Shared/config')
const databaseId = config.names.database
  
const endpoint = config.connection.endpoint;
const masterKey = config.connection.authKey;

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({endpoint, auth: { masterKey }});

//---------------------------------------------------------------------------------------------------
// This demo performs the following CRUD operations on a Database
//
// 1. find Database  - Attempt to find a database by Id, if found then just complete the sample
// 2. create Database    - If the database was not found, try create it
// 3. read all Databases     - Once the database was created, list all the databases on the account
// 4. read Database      - Read a database by its id (using new ID Based Routing)
// 5. delete Database    - Delete a database given its id
//
//---------------------------------------------------------------------------------------------------

async function run() {

    try {
        // 1.
        try {
            console.log('1. findDatabaseById \'' + databaseId + '\'');
            const {result: db} = await client.databases.get(databaseId).read();
            await client.databases.get(databaseId).delete();
        } catch(err) {
            if(err.code === 404) {
                //no database found, let's go ahead with sample
                console.log('Database with id ' + databaseId + ' not found.');
            } else {
                throw err;
            }
        }
    
        // 2.
        console.log('\n2. createDatabase \'' + databaseId + '\'')
        await client.databases.create({id: databaseId});
        console.log('Database with id ' + databaseId + ' created.');
    
        // 3.
        console.log('\n3. listDatabases');
        for (const {db} of await client.databases.readAll().forEach()) {
            console.log(db.id);
        }
    
        // 4.
        console.log('\n5. readDatabase - with id \'' + databaseId + '\'');
        const {result: db} = await client.databases.get(databaseId).read();
        console.log('Database with uri of \'dbs/' + db.id + '\' was found');
    
        // 5.
        console.log('\n6. deleteDatabase with id \'' + databaseId + '\'');
        await client.databases.get(databaseId).delete();
    } catch (err) {
        throw err;
    }
}

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

run().catch(handleError).then(finish);
