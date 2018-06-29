# Microsoft Azure Cosmos JavaScript SDK

This project provides JavaScript & Node.js SDK library for [SQL API](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-sql-query) of [Azure Cosmos
Database Service](https://azure.microsoft.com/en-us/services/cosmos-db/). This project also includes samples, tools, and utilities.

[![latest npm badge](https://img.shields.io/npm/v/%40azure%2Fcosmos/latest.svg)](https://www.npmjs.com/package/@azure/cosmos)

Useful links:
- [Welcome to Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/community)
- [Quick start](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-get-started)
- [Tutorial](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-application)
- [Samples](https://github.com/Azure/azure-documentdb-node/tree/master/samples)
- [Introduction to Resource Model of Azure Cosmos DB Service]( https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-resources)
- [Introduction to SQL API of Azure Cosmos DB Service](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-sql-query)
- [Partitioning](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-partition-data)
- [API Documentation](http://azure.microsoft.com/en-us/develop/nodejs/)

## Installation

### Prerequisites

Install Node.js and npm
[https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

Node SDK can be consumed in two ways.

### Install Core Module Published to NPM

The core module uses the callbacks model for responses, exposed through the DocumentClient 

    npm install @azure/cosmos

## Prerequisites

To use the SDK, first [create an account](https://docs.microsoft.com/en-us/azure/cosmos-db/create-documentdb-nodejs) and follow [tutorial](https://docs.microsoft.com/en-us/azure/cosmos-db/documentdb-nodejs-application).

#### Note:
When connecting to the [emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator) from the SDK, SSL verification is disabled. 

Follow these instructions to run the tests locally.

## Tests

### Prerequisites

1. Clone Azure/azure-cosmos-js repository

    ```bash
    git clone https://github.com/azure/azure-cosmos-js.git
    ```

2. Install Node.js and npm
[https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

3. [Cosmos DB emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator)
    - Note: requires a windows machine or ability to run Windows container

4. Install dependencies

    ```bash
    npm i     # alias for npm install
    ```

5. Build the source

    ```bash
    npm run build   # compiles the typescript source, runs linting, creates webpack, creates docs
    ```

### Running the tests

```bash
npm run test    # runs all tests
```

## Examples
### Hello World

```ts
import { CosmosClient } from "@azure/cosmos"

const host = "[hostendpoint]";                     // Add your endpoint
const masterKey = "[database account masterkey]";  // Add the masterkey of the endpoint
const client = new CosmosClient(host, { masterKey });

var databaseDefinition = { id: "sample database" };
var collectionDefinition = { id: "sample collection" };
var documentDefinition = { id: "hello world doc", content: "Hello World!" };

async function helloCosmos() {
    await client.createDatabase(databaseDefinition);
    console.log('created db');

    await client.createCollection(database._self, collectionDefinition);
    console.log('created collection');

    await client.createDocument(collection._self, documentDefinition);
    console.log('Created Document with content: ', document.content);

    await client.deleteDatabase(database._self);
    console.log("Deleted database");
});

helloCosmos().finally(()=>{});
```

### Youtube Videos

Getting started with Node.js SDK:

[![Azure Demo: Getting started with Document Node.js SDK](http://img.youtube.com/vi/UAE7h9PCZjA/0.jpg)](http://www.youtube.com/watch?v=UAE7h9PCZjA)

## Need Help?

Be sure to check out the Microsoft Azure [Developer Forums on MSDN](https://social.msdn.microsoft.com/forums/azure/en-US/home?forum=AzureDocument) or the [Developer Forums on Stack Overflow](https://stackoverflow.com/questions/tagged/azure-cosmosdb) if you have trouble with the provided code.

## Contribute Code or Provide Feedback

If you would like to become an active contributor to this project please follow the instructions provided in [Azure Projects Contribution Guidelines](http://azure.github.io/guidelines.html).

If you encounter any bugs with the library please file an issue in the [Issues](https://github.com/Azure/azure-documentdb-node/issues) section of the project.

