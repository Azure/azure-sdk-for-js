// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Shows CRUD operations using executeBulkOperations API.
 */

require("dotenv/config");
const { handleError, finish, logStep } = require("./Shared/handleError.js");
const { BulkOperationType, CosmosClient, PatchOperationType } = require("@azure/cosmos");
const { DefaultAzureCredential } = require("@azure/identity");

const credentials = new DefaultAzureCredential();
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
function addEntropy(name) {
  return name + getEntropy();
}

function getEntropy() {
  return `${Math.floor(Math.random() * 10000)}`;
}

async function run() {
  const containerId = "bulkContainer";
  const client = new CosmosClient({
    endpoint: endpoint,
    aadCredentials: credentials,
  });

  const { database } = await client.databases.create({ id: addEntropy("bulk db") });
  logStep(`Create multi-partition container '${containerId}' with partition key /key`);
  const { container } = await database.containers.create({
    id: containerId,
    partitionKey: {
      paths: ["/key"],
      version: 2,
    },
    throughput: 25100,
  });

  const readItemId = addEntropy("item1");
  const deleteItemId = addEntropy("item2");
  const replaceItemId = addEntropy("item3");
  const patchItemId = addEntropy("item4");
  logStep(
    `Create items ${readItemId}, ${deleteItemId}, ${replaceItemId},${patchItemId} for reading, deleting, replacing and patching`,
  );
  await container.items.create({
    id: readItemId,
    key: true,
    class: "2010",
  });

  await container.items.create({
    id: deleteItemId,
    key: {},
    class: "2011",
  });

  await container.items.create({
    id: replaceItemId,
    key: 5,
    class: "2012",
  });

  await container.items.create({
    id: patchItemId,
    key: 5,
    class: "2019",
  });

  const operations = [
    {
      operationType: BulkOperationType.Create,
      partitionKey: "A",
      resourceBody: { id: addEntropy("doc1"), name: "sample", key: "A" },
    },
    {
      operationType: BulkOperationType.Upsert,
      partitionKey: "U",
      resourceBody: { id: addEntropy("doc1"), name: "other", key: "U" },
    },
    {
      operationType: BulkOperationType.Read,
      id: readItemId,
      partitionKey: true,
    },
    {
      operationType: BulkOperationType.Delete,
      id: deleteItemId,
      partitionKey: {},
    },
    {
      operationType: BulkOperationType.Replace,
      partitionKey: 5,
      id: replaceItemId,
      resourceBody: { id: replaceItemId, name: "nice", key: 5 },
    },
    {
      operationType: BulkOperationType.Patch,
      partitionKey: 5,
      id: patchItemId,
      resourceBody: {
        operations: [{ op: PatchOperationType.add, path: "/great", value: "goodValue" }],
      },
    },
  ];
  logStep(
    `Execute a simple bulk request with 5 operations: Create, Upsert, Read, Delete, Replace , Patch`,
  );
  logStep(
    `Bulk Operations Input to 'container.items.executeBulkOperations(operations): ${operations}`,
  );

  const response = await container.items.executeBulkOperations(operations);
  logStep(`Bulk response => ${response}`);
  await finish();
}

run().catch(handleError);
