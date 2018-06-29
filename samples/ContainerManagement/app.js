// @ts-check
'use strict';
console.log();
console.log('Azure Cosmos DB Node.js Samples');
console.log('================================');
console.log();
console.log('container MANAGEMENT');
console.log('=====================');
console.log();

const cosmos = require('../../lib/');
const CosmosClient = cosmos.CosmosClient;
const config = require('../Shared/config')
const databaseId = config.names.database
const containerId = config.names.container

var endpoint = config.connection.endpoint;
var masterKey = config.connection.authKey;

// Establish a new instance of the CosmosClient to be used throughout this demo
var client = new CosmosClient({ endpoint, auth: { masterKey } });

//---------------------------------------------------------------------------------
// This demo performs a few steps
// 1. create container  - given an id, create a new container with thedefault indexingPolicy
// 2. read all containers   - example of using the QueryIterator to get a list of containers in a Database
// 3. read container    - Read a container by its _self
// 4. delete container  - given just the container id, delete the container
//---------------------------------------------------------------------------------

/** @type {cosmos.Database} */
let database;

//ensuring a database exists for us to work with
async function run() {
    await init(databaseId);

    //1.
    console.log('1. create container ith id \'' + containerId + '\'');
    await database.containers.create({id: containerId});

    //2.
    console.log('\n2. read all containers in database');
    const iterator = database.containers.readAll();
    for (const {result} of await iterator.forEach()) {
        console.log(result.id);
    }

    //3.
    console.log('\n3. read container definition');
    const container = database.containers.get(containerId);
    const {result: containerDef} = await container.read();

    console.log('container with url \'' + container.url + '\' was found its id is \'' + containerDef.id);

    //4.
    console.log('\n7. deletecontainer \'' + containerId + '\'');
    container.delete();
}

async function init(databaseId) {
    //we're using queryDatabases here and not readDatabase
    //readDatabase will throw an exception if resource is not found
    //queryDatabases will not, it will return empty resultset. 

    var querySpec = {
        query: 'SELECT * FROM root r WHERE r.id=@id',
        parameters: [
            {
                name: '@id',
                value: databaseId
            }
        ]
    };

    const { result: results } = await client.databases.query(querySpec).toArray();
    if (results.length === 0) {
        var databaseDef = { id: databaseId };

        const { result: newDB } = await client.databases.create(databaseDef);
        client.databases.get(newDB.id);
        //database found, return it
    } else {
        client.databases.get(results[0].id);
    }
}

async function handleError(error) {
    console.log('\nAn error with code \'' + error.code + '\' has occurred:');
    console.log('\t' + JSON.parse(error.body).message);

    await finish();
}

async function finish() {
    try {
        await database.delete();
        console.log('\nEnd of demo.');
    } catch (err) {
        throw err;
    }
}

run().then(finish).catch(handleError);
