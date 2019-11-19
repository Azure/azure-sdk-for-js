# Microsoft Azure Cosmos JavaScript SDK

This project provides JavaScript & Node.js SDK library for [SQL API](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-sql-query) of [Azure Cosmos
Database Service](https://azure.microsoft.com/en-us/services/cosmos-db/). This project also includes samples, tools, and utilities.

[![latest npm badge](https://img.shields.io/npm/v/%40azure%2Fcosmos/latest.svg)](https://www.npmjs.com/package/@azure/cosmos)
[![Build Status](https://cosmos-db-sdk-public.visualstudio.com/cosmos-db-sdk-public/_apis/build/status/Azure.azure-cosmos-js?branchName=master)](https://cosmos-db-sdk-public.visualstudio.com/cosmos-db-sdk-public/_build/latest?definitionId=7&branchName=master)

```js
// JavaScript
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://your-account.documents.azure.com"; // Add your endpoint
const key = "[database account masterkey]"; // Add the masterkey of the endpoint
const client = new CosmosClient({ endpoint, key });

const databaseDefinition = { id: "sample database" };
const collectionDefinition = { id: "sample collection" };
const documentDefinition = { id: "hello world doc", content: "Hello World!" };

async function helloCosmos() {
  const { database } = await client.databases.create(databaseDefinition);
  console.log("created database");

  const { container } = await database.containers.create(collectionDefinition);
  console.log("created collection");

  const { resource } = await container.items.create(documentDefinition);
  console.log("Created item with content: ", resource.content);

  await database.delete();
  console.log("Deleted database");
}

helloCosmos().catch((err) => {
  console.error(err);
});
```

## Install via NPM

You can install the npm package using the following command:

```bash
npm install @azure/cosmos
```

## Useful links

- [Welcome to Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/community)
- [Quick start](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-get-started)
- [Tutorial](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-nodejs-application)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/cosmosdb/cosmos/samples)
- [Introduction to Resource Model of Azure Cosmos DB Service](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-resources)
- [Introduction to SQL API of Azure Cosmos DB Service](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-sql-query)
- [Partitioning](https://docs.microsoft.com/en-us/azure/cosmos-db/sql-api-partition-data)
- [API Documentation](https://docs.microsoft.com/en-us/javascript/api/%40azure/cosmos/?view=azure-node-latest)

## Need Help?

Tweet us with #CosmosDB and we'll respond on Twitter. Be sure to check out the Microsoft Azure [Developer Forums on MSDN](https://social.msdn.microsoft.com/forums/azure/en-US/home?forum=AzureDocument) or the [Developer Forums on Stack Overflow](https://stackoverflow.com/questions/tagged/azure-cosmosdb) if you have trouble with the provided code.

## Contribute Code or Provide Feedback

For our rules and guidelines on contributing, please see [Microsoft's contributor guide](https://docs.microsoft.com/en-us/contribute/).

For information on how build and test this repo, please see [./dev.md](./dev.md).

If you encounter any bugs with the library please file an issue in the [Issues](https://github.com/Azure/azure-sdk-for-js/issues) section of the project.


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcosmosdb%2Fcosmos%2FREADME.png)
