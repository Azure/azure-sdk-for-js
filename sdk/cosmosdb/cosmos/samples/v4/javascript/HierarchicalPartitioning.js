// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Shows various operations on containers with Hierarchical Partitioning.
 */

require("dotenv").config();

const { handleError, logSampleHeader, finish } = require("./Shared/handleError");
const {
  CosmosClient,
  BulkOperationType,
  PartitionKeyKind,
  PartitionKeyBuilder,
} = require("@azure/cosmos");

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
logSampleHeader("Demonstrating Usage of Hierarchical Partitioning.");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  console.log("    ## Database with id " + database.id + " created.");

  const containerDef = {
    id: "hierarchical_partition_container",
    partitionKey: {
      paths: ["/name", "/address/zip"],
      version: 2,
      kind: PartitionKeyKind.MultiHash,
    },
    throughput: 400,
  };
  const { container } = await database.containers.createIfNotExists(containerDef);

  console.log(
    "    ## Container with id " + container.id + " created with hierarchical partition:",
    ["/name", "/address/zip"],
  );

  const itemWithBothPartitionPresent = "item1";
  await container.items.create({
    id: itemWithBothPartitionPresent,
    name: itemWithBothPartitionPresent,
    key: "asdf",
    address: {
      zip: 23,
    },
    removable: "prev",
  });

  const itemWithBothPartitionPresentKey = new PartitionKeyBuilder()
    .addValue("item1")
    .addValue(23)
    .build();
  console.log(
    "    ## Item with id " + itemWithBothPartitionPresent + " created. with partition key: ",
    itemWithBothPartitionPresentKey,
  );

  const itemWithOneMissingPartition = "item2";
  await container.items.create({
    // address field is missing alltogether.
    id: itemWithOneMissingPartition,
    name: itemWithOneMissingPartition,
    key: "asdf",
  });

  const itemWithOneMissingPartitionKey = new PartitionKeyBuilder()
    .addValue("item2")
    .addNoneValue()
    .build();
  console.log(
    "    ## Item with id " + itemWithOneMissingPartition + " created. with partition key: ",
    itemWithOneMissingPartitionKey,
  );

  const itemWithNullPartition = "item3";
  await container.items.create({
    id: itemWithNullPartition,
    name: itemWithNullPartition,
    key: "asdf",
    address: {
      zip: null,
    },
  });

  const itemWithNullPartitionKey = new PartitionKeyBuilder()
    .addValue(itemWithNullPartition)
    .addNullValue()
    .build();
  console.log(
    "    ## Item with id " + itemWithNullPartition + " created. with partition key: ",
    itemWithNullPartitionKey,
  );

  // Reading item created, while specifying it's hierarchical partition key.
  const { item: item1 } = await container
    .item(itemWithBothPartitionPresent, itemWithBothPartitionPresentKey)
    .read();
  console.log(
    "    ## Item with id " + item1.id + " read. with partition key: ",
    itemWithBothPartitionPresentKey,
  );

  // Patch item created, while specifying it's hierarchical partition key.
  const operations = [
    {
      op: "add",
      path: "/laster",
      value: "c",
    },
    {
      op: "replace",
      path: "/removable",
      value: "b",
    },
  ];

  const { resource: patchedItem } = await container
    .item(itemWithBothPartitionPresent, itemWithBothPartitionPresentKey)
    .patch(operations);
  console.log(
    "    ## Item with id " + patchedItem.id + " patched. with partition key: ",
    itemWithBothPartitionPresentKey,
  );

  const bulkOperations = [
    {
      operationType: BulkOperationType.Create,
      //Providing partition key is not necessary while create, it can be automatically derived from resourceBody.
      resourceBody: { id: "item3", name: "sample", address: { zip: 345 } },
    },
    {
      operationType: BulkOperationType.Upsert,
      // partitionKey: item1PartitionKey, // Providing partition key is not necessary while upsert, it can be automatically derived from resourceBody
      resourceBody: {
        id: itemWithBothPartitionPresent,
        name: itemWithBothPartitionPresent,
        newValue: "newvalue",
        address: { zip: 23 },
      },
    },
    {
      operationType: BulkOperationType.Read,
      id: itemWithOneMissingPartition,
      partitionKey: itemWithOneMissingPartitionKey, // Providing partition key is necessary for read operations.
    },
    {
      operationType: BulkOperationType.Delete,
      id: itemWithBothPartitionPresent,
      partitionKey: itemWithBothPartitionPresentKey, // Providing partition key is necessary for delete operations.
    },
    {
      operationType: BulkOperationType.Replace,
      partitionKey: itemWithNullPartitionKey,
      id: itemWithNullPartition,
      resourceBody: {
        id: itemWithNullPartition,
        name: itemWithNullPartition,
        key: 5,
        address: { zip: null },
      }, // changed key
    },
  ];

  const response = await container.items.bulk(bulkOperations);
  console.log(
    "    ## bulk operation executed. responses -",
    response.map((e) => e.statusCode),
  );
  await finish();
}

run().catch(handleError);
