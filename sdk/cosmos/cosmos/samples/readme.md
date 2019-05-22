## Introduction

These samples demonstrate how to use the Node.js SDK to interact with the [Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/) service

## Running the samples

### Quick steps:

1.  Start the Cosmos DB emulator
2.  `cd` into a given sample's directory
3.  `npm start`

### Debugging

These samples were built using [VS Code](https://code.visualstudio.com) and includes a `.vscode/launch.json`. However, you do not _need_ anything other than Node.js to run these samples. Just run the app.js in your choice of editor or terminal.

To debug in VS Code, just use the "Debug File" option, and start it in the sample's app.js of your choice. (For the TodoApp, you need to start from `bin/www`)

### Cosmos Account

Before you can run any of the samples you do need an active Azure Cosmos DB account or the emulator.
Head over to [How to create a Azure Cosmos DB database account](https://docs.microsoft.com/azure/cosmos-db/create-sql-api-nodejs#create-a-database-account) and see how to setup your account. Check out the emulator (windows only at the moment) [here](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator).

## Description

Azure Cosmos DB is a fully managed, scalable, query-able, schema free JSON document database service built for modern applications and delivered to you by Microsoft.

These samples demonstrate how to use the Client SDKs to interact with the service.

- **CollectionManagement** - CRUD operations on DocumentCollection resources.

- **DatabaseManagent** - CRUD operations on Database resources.

- **DocumentManagement** - CRUD operations on Document resources.

- **IndexManagement** - shows samples on how to customize the Indexing Policy for a Collection should you need to.

- **Partitioning** - shows samples on using the provided hashPartitionResolver and rangePartitionResolver classes, and how to implement custom resolvers.

- **ServerSideScripts** - shows how to create, and execute, server-side stored procedures, triggers and user-defined functions.

- **TodoApp** - Quick and simple todo app.

After walking through these samples you should have a good idea of how to get going and how to make use of the various Azure Cosmos DB APIs.

There are step-by-step tutorials and more documentation on the [Azure Cosmos DB documentation](https://docs.microsoft.com/azure/cosmos-db/) page so head over about this NoSQL document database.

## More information

For more information on this database service, please refer to the [Azure Cosmos DB](https://azure.microsoft.com/services/cosmos-db/) service page.
