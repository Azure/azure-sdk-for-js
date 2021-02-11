# Azure Tables client library for JavaScript

[Azure Tables](https://azure.microsoft.com/services/storage/tables/) is a cloud-based service that stores structured NoSQL data, providing a key/attribute store with a schemaless design. Tables storage gives developers flexibility and scalability with all the best parts of Azure cloud.

Use the client library to:

- Create/Delete Tables
- Query/Create/Read/Update/Delete Entities

Azure Cosmos DB provides a Table API for applications that are written for Azure Table storage and that need premium capabilities like:

- Turnkey global distribution.
- Dedicated throughput worldwide.
- Single-digit millisecond latencies at the 99th percentile.
- Guaranteed high availability.
- Automatic secondary indexing.
- The Azure Tables client library can seamlessly target either Azure table storage or Azure Cosmos DB table service endpoints with no code changes.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/tables/data-tables/) | [Package (NPM)](https://www.npmjs.com/package/@azure/data-tables) | [API reference documentation](https://aka.ms/js-docs) | [Product documentation](https://docs.microsoft.com/azure/storage/tables/table-storage-overview/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/tables/data-tables/samples)

## Getting started

### Prerequisites

Currently supported environments:

- Node.js version 8.x.x or higher
- Latest versions of Safari, Chrome, Edge and Firefox

You must have an [Azure subscription](https://azure.microsoft.com/free/) and a [Storage Account](https://docs.microsoft.com/azure/storage/tables/table-storage-quickstart-portal)  or an [Azure CosmosDB database](https://docs.microsoft.com/azure/cosmos-db/create-cosmosdb-resources-portal) to use this package.

### Install the `@azure/data-tables` package

The preferred way to install the Azure Tables client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```bash
npm install @azure/data-tables
```

### Authenticate a `TableServiceClient`

Azure Tables supports several ways to authenticate. In order to interact with the Azure Tables service you'll need to create an instance of a Tables client - `TableServiceClient` or `TableClient` for example. See [samples for creating the `TableServiceClient`](#create-the-table-service-client) to learn more about authentication.

Note: Azure Tables doesn't support Azure Active Directory (AAD)

- [Service client with Shared Key](#tableserviceclient-with-tablessharedkeycredential)
- [Service client with Shared access signatures](#tableserviceclient-with-sas-token)
- [Table client with Shared Key](#tableclient-with-tablessharedkeycredential)
- [Table client with Shared access signatures](#tableclient-with-sas-token)

#### Following features, interfaces, classes or functions are only available in Node.js

- Shared Key Authorization based on account name and account key
  - `TablesSharedKeyCredential`
  - Account connection string.

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

#### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

For example, you can create following CORS settings for debugging. But please customize the settings carefully according to your requirements in production environment.

- Allowed origins: \*
- Allowed verbs: DELETE,GET,HEAD,MERGE,POST,OPTIONS,PUT
- Allowed headers: \*
- Exposed headers: \*
- Maximum age (seconds): 86400

## Key concepts

- `TableServiceClient` - Client that provides functions to interact at a Table Service level such as create, list and delete tables

- `TableClient` - Client that provides functions to interact at an entity level such as create, list and delete entities within a table.

- `Table` - Tables store data as collections of entities.

- `Entity` - Entities are similar to rows. An entity has a primary key and a set of properties. A property is a name, typed-value pair, similar to a column.

Common uses of the Table service include:

- Storing TBs of structured data capable of serving web scale applications
- Storing datasets that don't require complex joins, foreign keys, or stored procedures and can be de-normalized for fast access
- Quickly querying data using a clustered index
- Accessing data using the OData protocol filter expressions

## Examples

- [Import the package](#import-the-package)
- [Create the table service client](#create-the-table-service-client)
  - [List tables in the account](#list-tables-in-the-account)
  - [Create a new table](#create-a-new-table)
- [Create the table client](#create-the-table-client)
  - [List Entities in a table](#list-entities-in-a-table)
  - [Create a new entity and add it to a table](#create-a-new-entity-and-add-it-to-a-table)

### Import the package

To use the clients, import the package in your file:

```javascript
const AzureTables = require("@azure/data-tables");
```

Alternatively, selectively import only the types you need:

```javascript
const { TableServiceClient, TablesSharedKeyCredential } = require("@azure/data-tables");
```

### Create the Table service client

The `TableServiceClient` requires a URL to the table service and an access credential. It also optionally accepts some settings in the `options` parameter.

#### `TableServiceClient` with `TablesSharedKeyCredential`

You can instantiate a `TableServiceClient` with a `TablesSharedKeyCredential` by passing account-name and account-key as arguments. (The account-name and account-key can be obtained from the azure portal.)
[ONLY AVAILABLE IN NODE.JS RUNTIME]

```javascript
const { TableServiceClient, TablesSharedKeyCredential } = require("@azure/data-tables");

// Enter your storage account name and shared key
const account = "<account>";
const accountKey = "<accountkey>";

// Use TablesSharedKeyCredential with storage account and account key
// TablesSharedKeyCredential is only available in Node.js runtime, not in browsers
const credential = new TablesSharedKeyCredential(account, accountKey);
const serviceClient = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  credential
);
```

#### `TableServiceClient` with SAS Token

Also, You can instantiate a `TableServiceClient` with a shared access signatures (SAS). You can get the SAS token from the Azure Portal.

```javascript
const { TableServiceClient } = require("@azure/data-tables");

const account = "<account name>";
const sas = "<service Shared Access Signature Token>";

const serviceClientWithSAS = new TableServiceClient(
  `https://${account}.table.core.windows.net${sas}`
);
```

#### List tables in the account

You can list tables within an account through a `TableServiceClient` instance calling the `listTables` function. This function returns a `PageableAsyncIterator` that you can consume using `for-await-of`

```javascript
const { TableServiceClient, TablesSharedKeyCredential } = require("@azure/data-tables");

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new TablesSharedKeyCredential(account, accountKey);
const serviceClient = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  credential
);

async function main() {
  let tablesIter = serviceClient.listTables();
  let i = 1;
  for await (const table of tablesIter) {
    console.log(`Table${i}: ${table.tableName}`);
    i++;
    // Output:
    // Table1: testTable1
    // Table1: testTable2
    // Table1: testTable3
    // Table1: testTable4
    // Table1: testTable5
  }
}

main();
```

#### Create a new table

You can create a table through a `TableServiceClient` instance calling the `createTable` function. This function takes the name of the table to create as a parameter.

```javascript
const { TableServiceClient, TablesSharedKeyCredential } = require("@azure/data-tables");

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new TablesSharedKeyCredential(account, accountKey);
const serviceClient = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  credential
);

async function main() {
  const tableName = `newtable${new Date().getTime()}`;
  await serviceClient.createTable(tableName);
}

main();
```

### Create the table client

The `TableClient` is created in a similar way as the `TableServiceClient` with the difference that `TableClient` takes a table name as a parameter

#### TableClient with `TablesSharedKeyCredential`

You can instantiate a `TableClient` with a `TablesSharedKeyCredential` by passing account-name and account-key as arguments. (The account-name and account-key can be obtained from the azure portal.)
[ONLY AVAILABLE IN NODE.JS RUNTIME]

```javascript
const { TableClient, TablesSharedKeyCredential } = require("@azure/data-tables");

// Enter your storage account name and shared key
const account = "<account>";
const accountKey = "<accountkey>";
const tableName = "<tableName>"

// Use TablesSharedKeyCredential with storage account and account key
// TablesSharedKeyCredential is only available in Node.js runtime, not in browsers
const credential = new TablesSharedKeyCredential(account, accountKey);
const client = new TableClient(
  `https://${account}.table.core.windows.net`,
  tableName,
  credential
);
```

#### TableClient with SAS Token

Also, You can instantiate a `TableClient` with a shared access signatures (SAS). You can get the SAS token from the Azure Portal.

```javascript
const { TableClient } = require("@azure/data-tables");

const account = "<account name>";
const sas = "<service Shared Access Signature Token>";
const tableName = "<tableName>"

const clientWithSAS = new TableClient(
  `https://${account}.table.core.windows.net${sas}`,
  tableName
);
```

#### List Entities in a table

You can list entities within a table by through a `TableClient` instance calling the `listEntities` function. This function returns a `PageableAsyncIterator` that you can consume using `for-await-of`

```javascript
const { TableClient, TablesSharedKeyCredential } = require("@azure/data-tables");

const account = "<account>";
const accountKey = "<accountkey>";
const tableName = "<tableName>"

const credential = new TablesSharedKeyCredential(account, accountKey);
const client = new TableClient(
  `https://${account}.table.core.windows.net`,
  tableName,
  credential
);

async function main() {
  let entitiesIter = client.listEntities();
  let i = 1;
  for await (const entity of entitiesIter) {
    console.log(`Entity${i}: PartitionKey: ${entity.partitionKey} RowKey: ${entity.rowKey}`);
    i++;
    // Output:
    // Entity1: PartitionKey: P1 RowKey: R1
    // Entity2: PartitionKey: P2 RowKey: R2
    // Entity3: PartitionKey: P3 RowKey: R3
    // Entity4: PartitionKey: P4 RowKey: R4
  }
}

main();
```

#### Create a new entity and add it to a table

You can create a new Entity in a table by through a `TableClient` instance calling the `createEntity` function. This function takes the entity to insert as a parameter. The entity must contain `partitionKey` and `rowKey`.

```javascript
const { TableClient, TablesSharedKeyCredential } = require("@azure/data-tables");

const account = "<account>";
const accountKey = "<accountkey>";
const tableName = "<tableName>"

const credential = new TablesSharedKeyCredential(account, accountKey);
const client = new TableClient(
  `https://${account}.table.core.windows.net`,
  tableName,
  credential
);

async function main() {
  const testEntity = {
      partitionKey: "P1",
      rowKey: "R1",
      foo: "foo",
      bar: 123
  }
  await client.createEntity(testEntity);
}

main();
```

## Troubleshooting

### General

When you interact with Tables service using the Javascript/Typescript SDK, errors returned by the service correspond to the same HTTP status codes returned for REST API requests:
[Storage Table Service Error Codes](https://docs.microsoft.com/rest/api/storageservices/table-service-error-codes)

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

## Next steps

More code samples coming soon Issue#10531

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/tables/README.png)
