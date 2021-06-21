# Guide for migrating to `@azure/data-tables` from `azure-storage`

This guide is intended to assist in the migration to `@azure/data-tables` from the legacy `azure-storage` package. It will focus on side-by-side comparisons for similar operations between the two packages.

We assume that you are familiar with `azure-storage`. If you are new to the Azure Tables client library for JavaScript, please refer to the [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tables/data-tables/README.md) and [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/tables/data-tables/samples/v12) rather than this guide.

## Table of contents

- [Migration benefits](#migration-benefits)
  - [Cross Service SDK improvements](#cross-service-sdk-improvements)
- [Important changes](#important-changes)
  - [Package name and structure](#package-name-and-structure)
  - [Constructing the clients](#constructing-the-clients)
  - [Creating a Table](#creating-a-table)
  - [Adding data to the table](#adding-data-to-the-table)
  - [Fetching a single entity from the table](#fetching-a-single-entity-from-the-table)
  - [Querying data from the table](#querying-data-from-the-table)
  - [Delete table entities](#delete-table-entities)
  - [Batch Transactions](#batch-transactions)
  - [Sequential Actions](#sequential-actions)
- [Additional samples](#additional-samples)

## Migration benefits

As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [TypeScript & JavaScript Guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) was also introduced to ensure that TypeScript clients have a natural and idiomatic feel with respect to the TypeScript and JavaScript ecosystems. The new `@azure/data-tables` follows these guidelines.

### Cross Service SDK improvements

The modern `@azure/data-tables` client library also provides the ability to share in some of the cross-service improvements made to the Azure development experience, such as

- A unified logging and diagnostics pipeline offering a common view of the activities across each of the client libraries
- Use of promises rather than callbacks for a simplified programming experience
- Use of async iterators in paging APIs

## Important changes

### Package name and structure

The modern client library is named `@azure/data-tables` and was released beginning with version 12. The legacy client library is named `azure-storage` with version of 2.x.x or below.

The legacy library `azure-storage` grouped functionality to work with multiple services in the same package such as `Blob`, `Queue`, `Files` and `Tables`. The new `@azure/data-tables` is dedicated to `Tables` there are new generation packages for the other storage services `@azure/storage-blob`, `@azure/storage-queue`, `@azure/storage-files` this provides more granular control on which dependencies to take on your project.

### Constructing the clients

Previously in `azure-storage`, you would use `createTableService` which can be used to get an instance of the `TableService` in order to perform service level operations.

```javascript
const azure = require("azure-storage");
const tableService = azure.createTableService("<connection-string>");
```

Now, in `@azure/data-tables`, we need a TableServiceClient for service level operations.

```javascript
const { TableServiceClient } = require("@azure/data-tables");
const tableService = TableServiceClient.fromConnectionString("<connection-string>");
```

### Creating a Table

Previously in `azure-storage`, you would use a `TableService` instance to create a table. The `createTable` method would take a callback to execute once the table has been created. This forces sequential operations to be inside the callback, potentially creating a callback chain

```javascript
const azure = require("azure-storage");
const tableService = azure.createTableService("<connection-string>");

const tableName = "<table-name>";
tableService.createTable(tableName, function() {
  console.log(`Table created`);
});
```

With `@azure/data-tables` you have access to all table level operations directly from the `TableServiceClient`. Because the table service client is not affinitized to any one table, it is ideal for scenarios where you need to create, delete, or list more than one table.

```javascript
const { TableServiceClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableService = new TableServiceClient(
  tablesEndpoint,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);

// Creates the table with `tableName` if it doesn't exist
const table = await tableService.createTable(tableName);
console.log(`Table created`);
```

If your intention is to work only in the context of a single table, it's also possible to create a table from the `TableClient`.

```javascript
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableClient = new TableClient(
  tablesEndpoint,
  tableName,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);

// Creates the table with `tableName` if it doesn't exist
const table = await tableClient.createTable();
console.log(`Table created`);
```

### Adding data to the table

Previously in `azure-storage`, we would create our entity as an object with a specific structure for representing values, also keeping in mind that there are 2 required properties `PartitionKey` and `RowKey` in which the capital `P` and `R` respectively are important as the service is case sensitive.

There were 2 ways to set the property values in `azure-storage` the raw way in which the value of each property is an object with a property named `_`containing the value and an optional property named `$` to specify the `Edm` type. If no type is passed it is inferred

```javascript
const azure = require("azure-storage");
const tableName = "<table-name>";
const tableService = azure.createTableService("<connection-string>");

const task1 = {
  PartitionKey: { _: "hometasks" },
  RowKey: { _: "1" },
  description: { _: "take out the trash" },
  dueDate: { _: new Date(2015, 6, 20), $: "Edm.DateTime" }
};

tableService.insertEntity(tableName, task1, function() {
  console.log("Entity inserted");
});
```

The other way in `azure-storage` to insert an entity was to use the entityGenerator which helped abstracting the creation of the value object described above

```javascript
const azure = require("azure-storage");
const entGen = azure.TableUtilities.entityGenerator;
const tableName = "<table-name>";
const tableService = azure.createTableService("<connection-string>");

const task1 = {
  PartitionKey: entGen.String("hometasks"),
  RowKey: entGen.String("1"),
  description: entGen.String("take out the trash"),
  dueDate: entGen.DateTime(new Date(2015, 6, 20))
};

tableService.insertEntity(tableName, task1, function() {
  console.log("Entity inserted");
});
```

Now in the new `@azure/data-tables` SDK, in order to have more idiomatic property names in our entities we have moved to `partitionKey` and `rowKey` (camel case). Also you no longer need to use the value object structure or entityGenerator anymore, instead use normal JavaScript values.

```javascript
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableClient = new TableClient(
  tablesEndpoint,
  tableName,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);

// Creates the table with `tableName` if it doesn't exist
const task1 = {
  partitionKey: "hometasks",
  rowKey: "1",
  description: "take out the trash",
  dueDate: new Date(2015, 6, 20)
};

await tableClient.createEntity(task1);
```

If you are using TypeScript, the `@azure/data-tables` package provides a type, `TableEntity`, that can help you build your entities providing static check to make sure the required `rowKey` and `partitionKey` properties are present.

```typescript
const { TableClient, AzureNamedKeyCredential, TableEntity } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableClient = new TableClient(
  tablesEndpoint,
  tableName,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);

const task1: TableEntity = {
  partitionKey: "hometasks",
  rowKey: "1",
  description: "take out the trash",
  dueDate: new Date(2015, 6, 20)
};

await tableClient.createEntity(task1);
```

### Fetching a single entity from the table

Both clients allow for fetching a single entity from the table if the partitionKey and rowKey are known.

Previously in `azure-storage`, to access the entity we'd need to do it inside the callback on `retrieveEntity`

```javascript
const azure = require("azure-storage");
const tableService = azure.createTableService("<connection-string>");

const tableName = "<table-name>";
tableService.retrieveEntity(tableName, "hometasks", "1", function(error, result, response) {
  if (!error) {
    // result contains the entity
    console.log(result);
  }
});
```

Now with `@azure/data-tables` we use `getEntity` on the TableClient, the return type is a Promise of the entity which can be awaited, making the code cleaner.

```javascript
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableClient = new TableClient(
  tablesEndpoint,
  tableName,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);

const entity = await tableClient.getEntity("hometasks", "1");
console.log(entity);
```

### Querying data from the table

Previously in `azure-storage`, querying a table didn't provide a built in way to handle pagination, looking as follows.

```javascript
const azure = require("azure-storage");
const tableService = azure.createTableService("<connection-string>");
const tableName = "<table-name>";
const query = new azure.TableQuery().where("PartitionKey eq ?", "part2");

let entities = [];

function listEntities(query, continuationToken, callback) {
  tableService.queryEntities(tableName, query, null, function(error, result) {
    entities.push(result.entries);
    const token = result.continuationToken;
    if (token) {
      listEntities(query, continuationToken, callback);
    } else {
      console.log("completed getting all entities");
      callback();
    }
  });
}

listEntities(query, null, function() {
  console.log(entities);
});
```

In the new `@azure/data-tables` we return a `PagedAsyncIterableIterator` that handles the details of pagination internally, simplifying the task of iteration.

```javascript
const { TableClient, AzureNamedKeyCredential, odata } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableClient = new TableClient(
  tablesEndpoint,
  tableName,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);
const partitionKey = "part2";

const entities = tableClient.listEntities({
  queryOptions: { filter: odata`PartitionKey eq ${partitionKey}` }
});

for await (const entity of entities) {
  console.log(entity);
}
```

### Delete table entities

Previously with `azure-storage`, deleting a table entity was accomplished with the following code.

```javascript
const azure = require("azure-storage");
const tableService = azure.createTableService("<connection-string>");

const tableName = "<table-name>";
const task = {
  PartitionKey: { _: "hometasks" },
  RowKey: { _: "1" }
};

tableService.deleteEntity(tableName, task, function(error, response) {
  if (!error) {
    console.log("Entity deleted");
  }
});
```

Now in `@azure/data-tables`, deleting an entity requires just the paritionKey and rowKey values.

```javascript
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableClient = new TableClient(
  tablesEndpoint,
  tableName,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);

await tableClient.deleteEntity("hometasks", "1");
console.log("Entity deleted");
```

### Batch Transactions

Previously with `azure-storage`, creating and executing a transactional batch operation involved creating a `TableBatch` which contained the TableOperation(s) to be executed. The result from ExecuteBatch was a TableBatchResult which is essentially a collection of TableResults.

```javascript
const azure = require("azure-storage");
const tableService = azure.createTableService("<connection-string>");

const tableName = "<table-name>";

const task1 = {
  PartitionKey: { _: "hometasks" },
  RowKey: { _: "1" },
  description: { _: "Take out the trash" },
  dueDate: { _: new Date(2015, 6, 20) }
};
const task2 = {
  PartitionKey: { _: "hometasks" },
  RowKey: { _: "2" },
  description: { _: "Wash the dishes" },
  dueDate: { _: new Date(2015, 6, 20) }
};

const batch = new azure.TableBatch();

batch.insertEntity(task1, { echoContent: true });
batch.insertEntity(task2, { echoContent: true });

tableService.executeBatch(tableName, batch, function(error, result, response) {
  if (!error) {
    console.log("Batch completed");
  }
});
```

Now in `@azure/data-tables`, you just need to create an array of operations and pass it to the `submitTransaction` method on the `TableClient`

```javascript
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableClient = new TableClient(
  tablesEndpoint,
  tableName,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);

const task1 = {
  partitionKey: "hometasks",
  rowKey: "1",
  description: "Take out the trash",
  dueDate: new Date(2015, 6, 20)
};
const task2 = {
  partitionKey: "hometasks",
  rowKey: "2",
  description: "Wash the dishes",
  dueDate: new Date(2015, 6, 20)
};

const tableActions = [
  ["create", task1],
  ["create", task2]
];

await tableClient.submitTransaction(tableActions);
console.log("Transaction completed");
```

For convenience also provide a helper that works in a similar way as `TableBatch` in `azure-storage`.

```javascript
const { TableClient, AzureNamedKeyCredential, TableTransaction } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableClient = new TableClient(
  tablesEndpoint,
  tableName,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);

const task1 = {
  partitionKey: "hometasks",
  rowKey: "1",
  description: "Take out the trash",
  dueDate: new Date(2015, 6, 20)
};
const task2 = {
  partitionKey: "hometasks",
  rowKey: "2",
  description: "Wash the dishes",
  dueDate: new Date(2015, 6, 20)
};

const transaction = new TableTransaction();
transaction.createEntity(task1);
transaction.createEntity(task2);

await tableClient.submitTransaction(transaction.actions);
console.log("Transaction completed");
```

### Sequential Actions

Previously in `azure-storage`, all the operations took a callback which would be executed once the operation completed. For example, to create a table and then insert two entities we would like to write the following nested code

```javascript
const azure = require("azure-storage");
const tableService = azure.createTableService("<connection-string>");

const tableName = "<table-name>";
tableService.createTable(tableName, function() {
  tableService.insertEntity(
    tableName,
    { PartitionKey: "p1", RowKey: "r1", foo: "bar" },
    function() {
      tableService.insertEntity(
        tableName,
        { PartitionKey: "p2", RowKey: "r2", foo: "baz" },
        function() {
          console.log("Inserted Entity");
        }
      );
    }
  );
});
```

With `@azure/data-tables` we work with promises which makes the programming experience better, leveraging async/await we no longer need nested code blocks to perform sequential actions

```javascript
const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");
const tableName = "<table-name>";
const tablesEndpoint = "https://<account-name>.table.core.windows.net";

const tableClient = new TableClient(
  tablesEndpoint,
  tableName,
  new AzureNamedKeyCredential("<accountName>", "<accountKey>")
);

await tableClient.createTable();
await tableClient.createEntity({ partitionKey: "p1", rowKey: "r1", foo: "bar" });
await tableClient.createEntity({ partitionKey: "p2", rowKey: "r2", foo: "baz" });
```

## Additional samples

More samples can be found [here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/tables/data-tables/samples/v12)
