# Azure Cosmos DB client library for JavaScript/TypeScript

[![latest npm badge](https://img.shields.io/npm/v/%40azure%2Fcosmos/latest.svg)][npm]
[![Build Status](https://dev.azure.com/azure-sdk/public/_apis/build/status/js/js%20-%20cosmosdb%20-%20ci?branchName=main)](https://dev.azure.com/azure-sdk/public/_build/latest?definitionId=850&branchName=main)

Azure Cosmos DB is a globally distributed, multi-model database service that supports document, key-value, wide-column, and graph databases. This package is intended for JavaScript/TypeScript applications to interact with **SQL API** databases and the JSON documents they contain:

- Create Cosmos DB databases and modify their settings
- Create and modify containers to store collections of JSON documents
- Create, read, update, and delete the items (JSON documents) in your containers
- Query the documents in your database using SQL-like syntax

Key links:

- [Package (npm)][npm]
- [API reference documentation](https://docs.microsoft.com/javascript/api/@azure/cosmos/?view=azure-node-lates)
- [Product documentation][cosmos_docs]

## Getting started

### Prerequisites

#### Azure Subscription and Cosmos DB SQL API Account

You must have an [Azure Subscription][azure_sub], and a [Cosmos DB account][cosmos_account] (SQL API) to use this package.

If you need a Cosmos DB SQL API account, you can use the Azure [Cloud Shell][cloud_shell_bash] to create one with this Azure CLI command:

```Bash
az cosmosdb create --resource-group <resource-group-name> --name <cosmos-database-account-name>
```

Or you can create an account in the [Azure Portal](https://portal.azure.com/#create/microsoft.documentdb)

#### NodeJS

This package is distributed via [npm][npm] which comes preinstalled with [NodeJS](https://nodejs.org/en/). You should be using Node v10 or above.

#### CORS

You need to set up [Cross-Origin Resource Sharing (CORS)](https://docs.microsoft.com/azure/cosmos-db/how-to-configure-cross-origin-resource-sharing) rules for your Cosmos DB account if you need to develop for browsers. Follow the instructions in the linked document to create new CORS rules for your Cosmos DB.

### Install this package

```Bash
npm install @azure/cosmos
```

### Get Account Credentials

You will need your Cosmos DB **Account Endpoint** and **Key**. You can find these in the [Azure Portal](https://portal.azure.com/#blade/hubsextension/browseresource/resourcetype/microsoft.documentdb%2fdatabaseaccounts) or use the [Azure CLI][azure_cli] snippet below. The snippet is formatted for the Bash shell.

```Bash
az cosmosdb show --resource-group <your-resource-group> --name <your-account-name> --query documentEndpoint --output tsv
az cosmosdb keys list --resource-group <your-resource-group> --name <your-account-name> --query primaryMasterKey --output tsv
```

### Create an instance of `CosmosClient`

Interaction with Cosmos DB starts with an instance of the [CosmosClient](https://docs.microsoft.com/javascript/api/@azure/cosmos/cosmosclient?view=azure-node-latest) class

```js
const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://your-account.documents.azure.com";
const key = "<database account masterkey>";
const client = new CosmosClient({ endpoint, key });

async function main() {
  // The rest of the README samples are designed to be pasted into this function body
}

main().catch((error) => {
  console.error(error);
});
```

For simplicity we have included the `key` and `endpoint` directly in the code but you will likely want to load these from a file not in source control using a project such as [dotenv](https://www.npmjs.com/package/dotenv) or loading from environment variables

In production environments, secrets like keys should be stored in [Azure Key Vault](https://azure.microsoft.com/services/key-vault/)

## Key concepts

Once you've initialized a [CosmosClient](https://docs.microsoft.com/javascript/api/@azure/cosmos/cosmosclient?view=azure-node-lates), you can interact with the primary resource types in Cosmos DB:

- [Database](https://docs.microsoft.com/javascript/api/@azure/cosmos/database?view=azure-node-latest): A Cosmos DB account can contain multiple databases. When you create a database, you specify the API you'd like to use when interacting with its documents: SQL, MongoDB, Gremlin, Cassandra, or Azure Table. Use the [Database](https://docs.microsoft.com/javascript/api/@azure/cosmos/database?view=azure-node-latest) object to manage its containers.

- [Container](https://docs.microsoft.com/javascript/api/@azure/cosmos/container?view=azure-node-latest): A container is a collection of JSON documents. You create (insert), read, update, and delete items in a container by using methods on the [Container](https://docs.microsoft.com/javascript/api/@azure/cosmos/container?view=azure-node-latest) object.

- [Item](https://docs.microsoft.com/javascript/api/@azure/cosmos/item?view=azure-node-latest): An Item is a JSON document stored in a container. Each Item must include an `id` key with a value that uniquely identifies the item within the container. If you do not provide an `id`, the SDK will generate one automatically.

For more information about these resources, see [Working with Azure Cosmos databases, containers and items][cosmos_resources].

## Examples

The following sections provide several code snippets covering some of the most common Cosmos DB tasks, including:

- [Create a database](#create-a-database)
- [Create a container](#create-a-container)
- [Using Partition Keys](#using-partition-keys)
- [Insert items](#insert-items)
- [Query documents](#query-the-database)
- [Read an item](#read-an-item)
- [Delete an item](#delete-an-data)
- [CRUD on Container with hierarchical partition key](#container-hierarchical-partition-key)
### Create a database

After authenticating your [CosmosClient](https://docs.microsoft.com/javascript/api/@azure/cosmos/cosmosclient?view=azure-node-latest), you can work with any resource in the account. The code snippet below creates a NOSQL API database.

```js
const { database } = await client.databases.createIfNotExists({ id: "Test Database" });
console.log(database.id);
```

### Create a container

This example creates a container with default settings

```js
const { container } = await database.containers.createIfNotExists({ id: "Test Database" });
console.log(container.id);
```

### Using Partition Keys
This example shows various types of partition Keys supported.
```js
await container.item("id", "1").read();        // string type
await container.item("id", 2).read();          // number type
await container.item("id", true).read();       // boolean type
await container.item("id", {}).read();         // None type
await container.item("id", undefined).read();  // None type
await container.item("id", null).read();       // null type
```

If the Partition Key consists of a single value, it could be supplied either as a literal value, or an array.

```js
await container.item("id", "1").read();
await container.item("id", ["1"]).read();
```

If the Partition Key consists of more than one values, it should be supplied as an array.
```js
await container.item("id", ["a", "b"]).read();
await container.item("id", ["a", 2]).read();
await container.item("id", [{}, {}]).read();
await container.item("id", ["a", {}]).read();
await container.item("id", [2, null]).read();

```

### Insert items

To insert items into a container, pass an object containing your data to [Items.upsert](https://docs.microsoft.com/javascript/api/@azure/cosmos/items?view=azure-node-latest#upsert-t--requestoptions-). The Azure Cosmos DB service requires each item has an `id` key. If you do not provide one, the SDK will generate an `id` automatically.

This example inserts several items into the container

```js
const cities = [
  { id: "1", name: "Olympia", state: "WA", isCapitol: true },
  { id: "2", name: "Redmond", state: "WA", isCapitol: false },
  { id: "3", name: "Chicago", state: "IL", isCapitol: false }
];
for (const city of cities) {
  await container.items.create(city);
}
```

### Read an item

To read a single item from a container, use [Item.read](https://docs.microsoft.com/javascript/api/@azure/cosmos/item?view=azure-node-latest#read-requestoptions-). This is a less expensive operation than using SQL to query by `id`.

```js
await container.item("1", "1").read();
```
### CRUD on Container with hierarchical partition key

Create a Container with hierarchical partition key
```js
const containerDefinition = {
  id: "Test Database",
  partitionKey: {
    paths: ["/name", "/address/zip"],
    version: PartitionKeyDefinitionVersion.V2,
    kind: PartitionKeyKind.MultiHash,
  },
}
const { container } = await database.containers.createIfNotExists(containerDefinition);
console.log(container.id);
```
Insert an item with hierarchical partition key defined as - `["/name", "/address/zip"]`
```js
const item = {
  id: 1,
  name: 'foo',
  address: {
    zip: 100
  },
  active: true
}
await container.items.create(item);
```

To read a single item from a container with hierarchical partition key defined as - `["/name", "/address/zip"],`
```js
await container.item("1", ["foo", 100]).read();
```
Query an item with hierarchical partition key with hierarchical partition key defined as - `["/name", "/address/zip"],`
```js
const { resources } = await container.items
  .query("SELECT * from c WHERE c.active = true", {
          partitionKey: ["foo", 100],
        })
  .fetchAll();
for (const item of resources) {
  console.log(`${item.name}, ${item.address.zip} `);
}
```
### Delete an item

To delete items from a container, use [Item.delete](https://docs.microsoft.com/javascript/api/@azure/cosmos/item?view=azure-node-latest#delete-requestoptions-).

```js
// Delete the first item returned by the query above
await container.item("1").delete();
```

### Query the database

A Cosmos DB SQL API database supports querying the items in a container with [Items.query](https://docs.microsoft.com/javascript/api/@azure/cosmos/items?view=azure-node-latest#query-string---sqlqueryspec--feedoptions-) using SQL-like syntax:

```js
const { resources } = await container.items
  .query("SELECT * from c WHERE c.isCapitol = true")
  .fetchAll();
for (const city of resources) {
  console.log(`${city.name}, ${city.state} is a capitol `);
}
```

Perform parameterized queries by passing an object containing the parameters and their values to [Items.query](https://docs.microsoft.com/javascript/api/@azure/cosmos/items?view=azure-node-latest#query-string---sqlqueryspec--feedoptions-):

```js
const { resources } = await container.items
  .query({
    query: "SELECT * from c WHERE c.isCapitol = @isCapitol",
    parameters: [{ name: "@isCapitol", value: true }]
  })
  .fetchAll();
for (const city of resources) {
  console.log(`${city.name}, ${city.state} is a capitol `);
}
```

For more information on querying Cosmos DB databases using the SQL API, see [Query Azure Cosmos DB data with SQL queries][cosmos_sql_queries].

### Change Feed Pull Model

Change feed can be fetched for a partition key, a feed range or an entire container.

To process the change feed, create an instance of `ChangeFeedPullModelIterator`. When you initially create `ChangeFeedPullModelIterator`, you must specify a required `changeFeedStartFrom` value inside the `ChangeFeedIteratorOptions` which consists of both the starting position for reading changes and the resource(a partition key or a FeedRange) for which changes are to be fetched. You can optionally use `maxItemCount` in `ChangeFeedIteratorOptions` to set the maximum number of items received per page.

Note: If no `changeFeedStartFrom` value is specified, then changefeed will be fetched for an entire container from Now().

There are four starting positions for change feed:

- `Beginning`

```js
// Signals the iterator to read changefeed from the beginning of time.
const options = {
  changeFeedStartFrom: ChangeFeedStartFrom.Beginning();
}
const iterator = container.getChangeFeedIterator(options);
```

- `Time`

```js
// Signals the iterator to read changefeed from a particular point of time.
const time = new Date("2023/09/11") // some sample date
const options = {
  changeFeedStartFrom: ChangeFeedStartFrom.Time(time);
}
```

- `Now`

```js
// Signals the iterator to read changefeed from this moment onward.
const options = {
  changeFeedStartFrom: ChangeFeedStartFrom.Now();
}
```

- `Continuation`

```js
// Signals the iterator to read changefeed from a saved point.
const continuationToken = "some continuation token recieved from previous request";
const options = {
  changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken);
}
```

Here's an example of fetching change feed for a partition key

```js
const partitionKey = "some-partition-Key-value";
const options = {
  changeFeedStartFrom: ChangeFeedStartFrom.Beginning(partitionKey),
};

const iterator = container.items.getChangeFeedIterator(options);

while (iterator.hasMoreResults) {
  const response = await iterator.readNext();
  // process this response
}
```
Because the change feed is effectively an infinite list of items that encompasses all future writes and updates, the value of `hasMoreResults` is always `true`. When you try to read the change feed and there are no new changes available, you receive a response with `NotModified` status.

More detailed usage guidelines and examples of change feed can be found [here](https://learn.microsoft.com/azure/cosmos-db/nosql/change-feed-pull-model?tabs=javascript).

## Error Handling

The SDK generates various types of errors that can occur during an operation.

1. `ErrorResponse` is thrown if the response of an operation returns an error code of >=400.
2. `TimeoutError` is thrown if Abort is called internally due to timeout.
3. `AbortError` is thrown if any user passed signal caused the abort.
4. `RestError` is thrown in case of failure of underlying system call due to network issues.
5. Errors generated by any devDependencies. For Eg. `@azure/identity` package could throw `CredentialUnavailableError`.

Following is an example for handling errors of type `ErrorResponse`, `TimeoutError`, `AbortError`, and `RestError`.

```js
try {
  // some code
} catch (err) {
  if (err instanceof ErrorResponse) {
    // some specific error handling.
  } else if (err instanceof RestError) {
    // some specific error handling.
  }
  // handle other type of errors in similar way.
  else {
    // for any other error.
  }
}
```

It's important to properly handle these errors to ensure that your application can gracefully recover from any failures and continue functioning as expected. More details about some of these errors and their possible solutions can be found [here](https://learn.microsoft.com/azure/cosmos-db/nosql/conceptual-resilient-sdk-applications#should-my-application-retry-on-errors).

## Troubleshooting

### General

When you interact with Cosmos DB errors returned by the service correspond to the same HTTP status codes returned for REST API requests:

[HTTP Status Codes for Azure Cosmos DB][cosmos_http_status_codes]

#### Conflicts

For example, if you try to create an item using an `id` that's already in use in your Cosmos DB database, a `409` error is returned, indicating the conflict. In the following snippet, the error is handled gracefully by catching the exception and displaying additional information about the error.

```js
try {
  await containers.items.create({ id: "existing-item-id" });
} catch (error) {
  if (error.code === 409) {
    console.log("There was a conflict with an existing item");
  }
}
```

### Transpiling

The Azure SDKs are designed to support ES5 JavaScript syntax and [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule). If you need support for earlier JavaScript runtimes such as Internet Explorer or Node 6, you will need to transpile the SDK code as part of your build process.

### Handle transient errors with retries

While working with Cosmos DB, you might encounter transient failures caused by [rate limits][cosmos_request_units] enforced by the service, or other transient problems like network outages. For information about handling these types of failures, see [Retry pattern][azure_pattern_retry] in the Cloud Design Patterns guide, and the related [Circuit Breaker pattern][azure_pattern_circuit_breaker].

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`. While using `AZURE_LOG_LEVEL` make sure to set it before logging library is initialized.
Ideally pass it through command line, if using libraries like `dotenv` make sure such libraries are initialized before logging library.

```javascript
const { setLogLevel } = require("@azure/logger");
setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

### Diagnostics

Cosmos Diagnostics feature provides enhanced insights into all your client operations. A CosmosDiagnostics object is added to response of all client operations. such as 
- Point look up operation reponse - `item.read()`, `container.create()`, `database.delete()`
- Query operation reponse -`queryIterator.fetchAll()`, 
- Bulk and Batch operations -`item.batch()`.
- Error/Exception response objects.

A CosmosDiagnostics object is added to response of all client operations.
There are 3 Cosmos Diagnostic levels, info, debug and debug-unsafe. Where only info is meant for production systems and debug and debug-unsafe are meant to be used during development and debugging, since they consume significantly higher resources. Cosmos Diagnostic level can be set in 2 ways
- Programatically
```js
  const client = new CosmosClient({ endpoint, key, diagnosticLevel: CosmosDbDiagnosticLevel.debug });
```
- Using environment variables. (Diagnostic level set by Environment variable has higher priority over setting it through client options.)
```bash
  export AZURE_COSMOSDB_DIAGNOSTICS_LEVEL="debug"
```

Cosmos Diagnostic has three members
- ClientSideRequestStatistics Type: Contains aggregates diagnostic details, including metadata lookups, retries, endpoints contacted, and request and response statistics like payload size and duration. (is always collected, can be used in production systems.) 

- DiagnosticNode: Is a tree-like structure that captures detailed diagnostic information. Similar to `har` recording present in browsers. This feature is disabled by default and is intended for debugging non-production environments only. (collected at diagnostic level debug and debug-unsafe) 

- ClientConfig: Captures essential information related to client's configuration settings during client initialization. (collected at diagnostic level debug and debug-unsafe) 

Please make sure to never set diagnostic level to `debug-unsafe` in production environment, since it this level `CosmosDiagnostics` captures request and response payloads and if you choose to log it (it is by default logged by @azure/logger at `verbose` level). These payloads might get captured in your log sinks.

#### Consuming Diagnostics

- Since `diagnostics` is added to all Response objects. You could programatically access `CosmosDiagnostic` as follows. 
```js
  // For point look up operations
  const { container, diagnostics: containerCreateDiagnostic } =
    await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: {
        paths: ["/key1"],
      },
  });

  // For Batch operations
   const operations: OperationInput[] = [
    {
      operationType: BulkOperationType.Create,
      resourceBody: { id: 'A', key: "A", school: "high" },
    },
  ];
  const response = await container.items.batch(operations, "A"); 
  
  // For query operations
  const queryIterator = container.items.query("select * from c");
  const { resources, diagnostics } = await queryIterator.fetchAll();

  // While error handling
  try {
    // Some operation that might fail
  } catch (err) {
    const diagnostics = err.diagnostics
  }
```
- You could also log `diagnostics` using `@azure/logger`, diagnostic is always logged using `@azure/logger` at `verbose` level. So if you set Diagnostic level to `debug` or `debug-unsafe` and `@azure/logger` level to `verbose`, `diagnostics` will be logged.
## Next steps

### More sample code

[Several samples][cosmos_samples] are available to you in the SDK's GitHub repository. These samples provide example code for additional scenarios commonly encountered while working with Cosmos DB:

- Database Operations
- Container Operations
- Item Operations
- Configuring Indexing
- Reading a container Change Feed
- Stored Procedures
- Changing Database/Container throughput settings
- Multi Region Write Operations

### Limitations 

Currently the features below are **not supported**. For alternatives options, check the **Workarounds** section below.

### Data Plane Limitations:

* Queries with COUNT from a DISTINCT subquery​
* Direct TCP Mode access​
* Aggregate cross-partition queries, like sorting, counting, and distinct, don't support continuation tokens.       Streamable queries, like SELECT \* FROM <table> WHERE <condition>, support continuation tokens. See the "Workaround" section for executing non-streamable queries without a continuation token.
* Change Feed: Processor
* Change Feed: Read multiple partitions key values
* Change Feed pull model all versions and delete mode [#27058](https://github.com/Azure/azure-sdk-for-js/issues/27058)
* Change Feed pull model support for partial hierarchical partition keys [#27059](https://github.com/Azure/azure-sdk-for-js/issues/27059)
* Cross-partition ORDER BY for mixed types

### Control Plane Limitations:

* Get CollectionSizeUsage, DatabaseUsage, and DocumentUsage metrics​
* Create Geospatial Index
* Update Autoscale throughput

## Workarounds

### Continuation token for cross partitions queries
You can achieve cross partition queries with continuation token support by using
[Side car pattern](https://github.com/Azure-Samples/Cosmosdb-query-sidecar).
This pattern can also enable applications to be composed of heterogeneous components and technologies.

### Executing non-stremable cross-partition query

To execute non-streamable queries without the use of continuation tokens, you can create a query iterator with the required query specification and options. The following sample code demonstrates how to use a query iterator to fetch all results without the need for a continuation token:

```javascript
const querySpec = {
  query: "SELECT * FROM c WHERE c.status = @status",
  parameters: [{ name: "@status", value: "active" }],
};
const queryOptions = {
  maxItemCount: 10, // maximum number of items to return per page
  enableCrossPartitionQuery: true,
};
const querIterator = await container.items.query(querySpec, queryOptions);
while (querIterator.hasMoreResults()) {
  const { resources: result } = await querIterator.fetchNext();
  //Do something with result
}
```

This approach can also be used for streamable queries.

### Control Plane operations
Typically, you can use [Azure Portal](https://portal.azure.com/), [Azure Cosmos DB Resource Provider REST API](https://docs.microsoft.com/rest/api/cosmos-db-resource-provider), [Azure CLI](https://docs.microsoft.com/cli/azure/azure-cli-reference-for-cosmos-db) or [PowerShell](https://docs.microsoft.com/azure/cosmos-db/manage-with-powershell) for the control plane unsupported limitations.


### Additional documentation

For more extensive documentation on the Cosmos DB service, see the [Azure Cosmos DB documentation][cosmos_docs] on docs.microsoft.com.

## Useful links

- [Welcome to Azure Cosmos DB](https://docs.microsoft.com/azure/cosmos-db/community)
- [Quick start](https://docs.microsoft.com/azure/cosmos-db/sql-api-nodejs-get-started)
- [Tutorial](https://docs.microsoft.com/azure/cosmos-db/sql-api-nodejs-application)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cosmosdb/cosmos/samples)
- [Introduction to Resource Model of Azure Cosmos DB Service](https://docs.microsoft.com/azure/cosmos-db/sql-api-resources)
- [Introduction to SQL API of Azure Cosmos DB Service](https://docs.microsoft.com/azure/cosmos-db/sql-api-sql-query)
- [Partitioning](https://docs.microsoft.com/azure/cosmos-db/sql-api-partition-data)
- [API Documentation](https://docs.microsoft.com/javascript/api/%40azure/cosmos/?view=azure-node-latest)

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcosmosdb%2Fcosmos%2FREADME.png)

<!-- LINKS -->

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_pattern_circuit_breaker]: https://docs.microsoft.com/azure/architecture/patterns/circuit-breaker
[azure_pattern_retry]: https://docs.microsoft.com/azure/architecture/patterns/retry
[azure_portal]: https://portal.azure.com
[azure_sub]: https://azure.microsoft.com/free/
[cloud_shell]: https://docs.microsoft.com/azure/cloud-shell/overview
[cloud_shell_bash]: https://shell.azure.com/bash
[cosmos_account_create]: https://docs.microsoft.com/azure/cosmos-db/how-to-manage-database-account
[cosmos_account]: https://docs.microsoft.com/azure/cosmos-db/account-overview
[cosmos_container]: https://docs.microsoft.com/azure/cosmos-db/databases-containers-items#azure-cosmos-containers
[cosmos_database]: https://docs.microsoft.com/azure/cosmos-db/databases-containers-items#azure-cosmos-databases
[cosmos_docs]: https://docs.microsoft.com/azure/cosmos-db/
[cosmos_http_status_codes]: https://docs.microsoft.com/rest/api/cosmos-db/http-status-codes-for-cosmosdb
[cosmos_item]: https://docs.microsoft.com/azure/cosmos-db/databases-containers-items#azure-cosmos-items
[cosmos_request_units]: https://docs.microsoft.com/azure/cosmos-db/request-units
[cosmos_resources]: https://docs.microsoft.com/azure/cosmos-db/databases-containers-items
[cosmos_samples]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cosmosdb/cosmos/samples
[cosmos_sql_queries]: https://docs.microsoft.com/azure/cosmos-db/how-to-sql-query
[cosmos_ttl]: https://docs.microsoft.com/azure/cosmos-db/time-to-live
[npm]: https://www.npmjs.com/package/@azure/cosmos
