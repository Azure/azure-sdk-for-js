# Microsoft Azure Cosmos JavaScript SDK

This project provides JavaScript & Node.js SDK library for [SQL API](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-sql-query) of [Azure Cosmos
Database Service](https://azure.microsoft.com/en-us/services/cosmos-db/). This project also includes samples, tools, and utilities.

[![latest npm badge](https://img.shields.io/npm/v/%40azure%2Fcosmos/latest.svg)](https://www.npmjs.com/package/@azure/cosmos)

```ts
import { CosmosClient } from "@azure/cosmos"

const endpoint = "[hostendpoint]";                     // Add your endpoint
const masterKey = "[database account masterkey]";  // Add the masterkey of the endpoint
const client = new CosmosClient({endpoint, auth: { masterKey }});

const databaseDefinition = { id: "sample database" };
const collectionDefinition = { id: "sample collection" };
const itemDefinition = { id: "hello world doc", content: "Hello World!" };

async function helloCosmos() {
    const { database: db } = await client.database.create(databaseDefinition);
    console.log('created db');

    const { container } = await db.container.create(collectionDefinition);
    console.log('created collection');

    const { body } = await container.items.create(documentDefinition);
    console.log('Created item with content: ', body.content);

    await db.delete();
    console.log("Deleted database");
});

helloCosmos().catch((err)=>{console.error(err)});
```

## Useful links

- [Welcome to Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/community)
- [Quick start](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-get-started-preview)
- [Tutorial](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-application-preview)
- [Samples](https://github.com/Azure/azure-cosmos-js/tree/master/samples)
- [Introduction to Resource Model of Azure Cosmos DB Service](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-resources)
- [Introduction to SQL API of Azure Cosmos DB Service](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-sql-query)
- [Partitioning](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-partition-data)
- [API Documentation](https://docs.microsoft.com/en-us/javascript/api/%40azure/cosmos/?view=azure-node-latest)

## Installation

### Prerequisites

Install Node.js 6 or above and npm
[https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

The SDK is not supported in Node v4 or below. Those Node.js versions are out of support and not recommended for production. Our support will only cover maintained versions of Node.js.

To use the SDK, first [create an account](https://docs.microsoft.com/en-us/azure/cosmos-db/create-sql-api-nodejs-preview) and follow [tutorial](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-application-preview).

#### Note:

When connecting to the [emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator) from the SDK, SSL verification is disabled.

Follow these instructions to run the tests locally.

### Install

```bash
npm install @azure/cosmos
```

## Tests

### Prerequisites

1.  Clone Azure/azure-cosmos-js repository

    ```bash
    git clone https://github.com/azure/azure-cosmos-js.git
    ```

2.  Install Node.js 6 or above and npm
    [https://docs.npmjs.com/getting-started/installing-node](https://docs.npmjs.com/getting-started/installing-node)

3.  [Cosmos DB emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator)

    - Note: requires a windows machine or ability to run Windows container

4.  Install dependencies

    ```bash
    npm i     # alias for npm install
    ```

5.  Build the source

    ```bash
    npm run build   # compiles the typescript source, runs linting, creates webpack, creates docs
    ```

### Running the tests

```bash
npm run test    # runs all tests
```

## Need Help?

Tweet us with #CosmosDB and we'll respond on Twitter. Be sure to check out the Microsoft Azure [Developer Forums on MSDN](https://social.msdn.microsoft.com/forums/azure/en-US/home?forum=AzureDocument) or the [Developer Forums on Stack Overflow](https://stackoverflow.com/questions/tagged/azure-cosmosdb) if you have trouble with the provided code.

## Contribute Code or Provide Feedback

If you would like to become an active contributor to this project please follow the instructions provided in [Azure Projects Contribution Guidelines](http://azure.github.io/guidelines.html).

If you encounter any bugs with the library please file an issue in the [Issues](https://github.com/Azure/azure-cosmos-js/issues) section of the project.
