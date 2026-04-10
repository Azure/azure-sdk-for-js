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

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tables/data-tables/)
- [Package (NPM)](https://www.npmjs.com/package/@azure/data-tables)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/data-tables)
- [Product documentation](https://learn.microsoft.com/azure/storage/tables/table-storage-overview/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/tables/data-tables/samples)

## Getting started

### Prerequisites

Currently supported environments:

- LTS versions of Node.js
- Latest versions of Safari, Chrome, Edge and Firefox

You must have an [Azure subscription](https://azure.microsoft.com/free/) and a [Storage Account](https://learn.microsoft.com/azure/storage/tables/table-storage-quickstart-portal) or an [Azure CosmosDB database](https://learn.microsoft.com/azure/cosmos-db/create-cosmosdb-resources-portal) to use this package.

### Install the `@azure/data-tables` package

The preferred way to install the Azure Tables client library for JavaScript is to use the npm package manager. Type the following into a terminal window:

```bash
npm install @azure/data-tables
```

### Authenticate a `TableServiceClient`

Azure Tables supports several ways to authenticate. In order to interact with the Azure Tables service you'll need to create an instance of a Tables client - `TableServiceClient` or `TableClient` for example. See [samples for creating the `TableServiceClient`](#create-the-table-service-client) to learn more about authentication.

Note: Azure Active Directory (AAD) is only supported for Azure Storage accounts.

- [Service client with Shared Key](#tableserviceclient-with-azurenamedkeycredential)
- [Service client with Shared access signatures](#tableserviceclient-with-sas-token)
- [Service client with TokenCredential (AAD)](#tableserviceclient-with-tokencredential-aad)
- [Table client with Shared Key](#tableclient-with-azurenamedkeycredential)
- [Table client with Shared access signatures](#tableclient-with-sas-token)
- [Table client with TokenCredential (AAD)](#tableclient-with-tokencredential-aad)

#### Following features, interfaces, classes or functions are only available in Node.js

- Shared Key Authorization based on account name and account key
  - `AzureNamedKeyCredential`
  - Account connection string.

#### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

#### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://learn.microsoft.com/rest/api/storageservices/cross-origin-resource-sharing--cors--support-for-the-azure-storage-services) rules for your storage account if you need to develop for browsers. Go to Azure portal and Azure Storage Explorer, find your storage account, create new CORS rules for blob/queue/file/table service(s).

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

```ts snippet:ignore
import * as azureTables from "@azure/data-tables";
```

Alternatively, selectively import only the types you need:

```ts snippet:ignore
import { TableServiceClient, AzureNamedKeyCredential } from "@azure/data-tables";
```

### Create the Table service client

The `TableServiceClient` requires a URL to the table service and an access credential. It also optionally accepts some settings in the `options` parameter.

#### `TableServiceClient` with AzureNamedKeyCredential

You can instantiate a `TableServiceClient` with a `AzureNamedKeyCredential` by passing account-name and account-key as arguments. (The account-name and account-key can be obtained from the azure portal.)
[ONLY AVAILABLE IN NODE.JS RUNTIME]

```ts snippet:ReadmeSampleCreateClient_NamedKeyCredential
import { AzureNamedKeyCredential, TableServiceClient } from "@azure/data-tables";

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new AzureNamedKeyCredential(account, accountKey);
const serviceClient = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  credential,
);
```

#### `TableServiceClient` with TokenCredential (AAD)

Azure Tables provides integration with Azure Active Directory (Azure AD) for identity-based authentication of requests
to the Table service when targeting a Storage endpoint. With Azure AD, you can use role-based access control (RBAC) to
grant access to your Azure Table resources to users, groups, or applications.

To access a table resource with a `TokenCredential`, the authenticated identity should have either the "Storage Table Data Contributor" or "Storage Table Data Reader" role.

With the `@azure/identity` package, you can seamlessly authorize requests in both development and production environments.
To learn more about Azure AD integration in Azure Storage, see the [Azure.Identity README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md)

```ts snippet:ReadmeSampleCreateClient_TokenCredential
import { DefaultAzureCredential } from "@azure/identity";
import { TableServiceClient } from "@azure/data-tables";

const credential = new DefaultAzureCredential();
const account = "<account name>";

const clientWithAAD = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  credential,
);
```

#### `TableServiceClient` with SAS Token

Also, You can instantiate a `TableServiceClient` with a shared access signatures (SAS). You can get the SAS token from the Azure Portal.

```ts snippet:ReadmeSampleCreateClient_SASToken
import { TableServiceClient, AzureSASCredential } from "@azure/data-tables";

const account = "<account name>";
const sas = "<service Shared Access Signature Token>";

const serviceClientWithSAS = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  new AzureSASCredential(sas),
);
```

#### List tables in the account

You can list tables within an account through a `TableServiceClient` instance calling the `listTables` function. This function returns a `PageableAsyncIterator` that you can consume using `for-await-of`

```ts snippet:ReadmeSampleListTables
import { DefaultAzureCredential } from "@azure/identity";
import { TableServiceClient } from "@azure/data-tables";

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new DefaultAzureCredential();
const serviceClient = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  credential,
);

let i = 0;
const tables = serviceClient.listTables();
for await (const table of tables) {
  console.log(`Table${++i}: ${table.name}`);
}
```

#### Create a new table

You can create a table through a `TableServiceClient` instance calling the `createTable` function. This function takes the name of the table to create as a parameter.
Note that `createTable` won't throw an error when the table already exists.

```ts snippet:ReadmeSampleCreateTable
import { DefaultAzureCredential } from "@azure/identity";
import { TableServiceClient } from "@azure/data-tables";

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new DefaultAzureCredential();
const serviceClient = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  credential,
);

const tableName = "newtable";
// If the table 'newTable' already exists, createTable doesn't throw
await serviceClient.createTable(tableName);
```

Here is a sample that demonstrates how to test if the table already exists when attempting to create it:

```ts snippet:ReadmeSampleCreateTable_IfExists
import { DefaultAzureCredential } from "@azure/identity";
import { TableServiceClient } from "@azure/data-tables";

const account = "<account>";
const accountKey = "<accountkey>";

const credential = new DefaultAzureCredential();
const serviceClient = new TableServiceClient(
  `https://${account}.table.core.windows.net`,
  credential,
);

const tableName = `newtable${+new Date()}`;
await serviceClient.createTable(tableName, {
  onResponse: (response) => {
    if (response.status === 409) {
      console.log(`Table ${tableName} already exists`);
    }
  },
});
```

### Create the table client

The `TableClient` is created in a similar way as the `TableServiceClient` with the difference that `TableClient` takes a table name as a parameter

#### `TableClient` with `AzureNamedKeyCredential`

You can instantiate a `TableClient` with a `AzureNamedKeyCredential` by passing account-name and account-key as arguments. (The account-name and account-key can be obtained from the azure portal.)
[ONLY AVAILABLE IN NODE.JS RUNTIME]

```ts snippet:ReadmeSampleCreateTableClient_NamedKeyCredential
import { AzureNamedKeyCredential, TableClient } from "@azure/data-tables";

// Enter your storage account name and shared key
const account = "<account>";
const accountKey = "<accountkey>";
const tableName = "<tableName>";

// Use AzureNamedKeyCredential with storage account and account key
// AzureNamedKeyCredential is only available in Node.js runtime, not in browsers
const credential = new AzureNamedKeyCredential(account, accountKey);
const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);
```

#### `TableClient` with `TokenCredential` (Azure Active Directory)

Azure Tables provides integration with Azure Active Directory (Azure AD) for identity-based authentication of requests
to the Table service when targeting a Storage endpoint. With Azure AD, you can use role-based access control (RBAC) to
grant access to your Azure Table resources to users, groups, or applications.

To access a table resource with a `TokenCredential`, the authenticated identity should have either the "Storage Table Data Contributor" or "Storage Table Data Reader" role.

With the `@azure/identity` package, you can seamlessly authorize requests in both development and production environments.
To learn more about Azure AD integration in Azure Storage, see the [Azure.Identity README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md)

```ts snippet:ReadmeSampleCreateTableClient_TokenCredential
import { DefaultAzureCredential } from "@azure/identity";
import { TableClient } from "@azure/data-tables";

const credential = new DefaultAzureCredential();
const account = "<account name>";
const tableName = "<tableName>";

const clientWithAAD = new TableClient(
  `https://${account}.table.core.windows.net`,
  tableName,
  credential,
);
```

#### `TableClient` with SAS Token

You can instantiate a `TableClient` with a shared access signatures (SAS). You can get the SAS token from the Azure Portal.

```ts snippet:ReadmeSampleCreateTableClient_SASToken
import { TableClient, AzureSASCredential } from "@azure/data-tables";

const account = "<account name>";
const sas = "<service Shared Access Signature Token>";
const tableName = "<tableName>";

const clientWithSAS = new TableClient(
  `https://${account}.table.core.windows.net`,
  tableName,
  new AzureSASCredential(sas),
);
```

#### List Entities in a table

You can list entities within a table by through a `TableClient` instance calling the `listEntities` function. This function returns a `PageableAsyncIterator` that you can consume using `for-await-of`

```ts snippet:ReadmeSampleListEntities
import { DefaultAzureCredential } from "@azure/identity";
import { TableClient } from "@azure/data-tables";

const account = "<account>";
const accountKey = "<accountkey>";
const tableName = "<tableName>";

const credential = new DefaultAzureCredential();
const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);

let i = 0;
const entities = client.listEntities();
for await (const entity of entities) {
  console.log(`Entity${++i}: PartitionKey: ${entity.partitionKey} RowKey: ${entity.rowKey}`);
}
```

#### Create a new entity and add it to a table

You can create a new Entity in a table by through a `TableClient` instance calling the `createEntity` function. This function takes the entity to insert as a parameter. The entity must contain `partitionKey` and `rowKey`.

```ts snippet:ReadmeSampleCreateEntity
import { DefaultAzureCredential } from "@azure/identity";
import { TableClient } from "@azure/data-tables";

const account = "<account>";
const accountKey = "<accountkey>";
const tableName = "<tableName>";

const credential = new DefaultAzureCredential();
const client = new TableClient(`https://${account}.table.core.windows.net`, tableName, credential);

const testEntity = {
  partitionKey: "P1",
  rowKey: "R1",
  foo: "foo",
  bar: 123,
};
await client.createEntity(testEntity);
```

## Azurite and Storage Emulator

The Azure Tables Client SDK also works with Azurite, an Azure Storage and Tables API compatible server emulator. Please refer to the ([Azurite repository](https://github.com/Azure/Azurite#azurite-v3)) on how to get started using it.

### Connecting to Azurite with Connection String shortcut

The easiest way to connect to Azurite from your application is to configure a connection string that references the shortcut `UseDevelopmentStorage=true`. The shortcut is equivalent to the full connection string for the emulator, which specifies the account name, the account key, and the emulator endpoints for each of the Azure Storage services: ([see more](https://github.com/Azure/Azurite#http-connection-strings)). Using this shortcut, the Azure Tables Client SDK would setup the default connection string and `allowInsecureConnection` in the client options.

```ts snippet:ReadmeSampleCreateTableClient_ConnectionString
import { TableClient } from "@azure/data-tables";

const connectionString = "UseDevelopmentStorage=true";
const client = TableClient.fromConnectionString(connectionString, "myTable");
```

### Connecting to Azurite without Connection String shortcut

You can connect to azurite manually without using the connection string shortcut by specifying the service URL and `AzureNamedKeyCredential` or a custom connection string. However, `allowInsecureConnection` will need to be set manually in case Azurite runs in an `http` endpoint.

```ts snippet:ReadmeSampleCreateTableClient_Azurite
import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";

const client = new TableClient(
  "<Azurite-http-table-endpoint>",
  "myTable",
  new AzureNamedKeyCredential("<Azurite-account-name>", "<Azurite-account-key>"),
  { allowInsecureConnection: true },
);
```

## Troubleshooting

### General

When you interact with Tables service using the Javascript/Typescript SDK, errors returned by the service correspond to the same HTTP status codes returned for REST API requests:
[Storage Table Service Error Codes](https://learn.microsoft.com/rest/api/storageservices/table-service-error-codes)

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

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

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.
