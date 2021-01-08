// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { TableClient } = require("@azure/data-tables");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";

async function batchOperations() {
  console.log("== Batch Operations Sample ==");

  // Note that this sample assumes that a table with tableName exists
  const tableName = "batch";

  // See authenticationMethods sample for other options of creating a new client
  const client = TableClient.fromConnectionString(connectionString, tableName);

  const partitionKey = "Stationery";

  const entities = [
    {
      partitionKey,
      rowKey: "A1",
      name: "Marker Set",
      price: 5.0,
      quantity: 21
    },
    {
      partitionKey,
      rowKey: "A2",
      name: "Pen Set",
      price: 2.0,
      quantity: 6
    },
    {
      partitionKey,
      rowKey: "A3",
      name: "Pencil",
      price: 1.5,
      quantity: 100
    }
  ];

  // Create the new batch. All the operations within a batch must target the same partition key
  const batch = await client.createBatch(partitionKey);

  // Add a createEntities operation to the batch
  await batch.createEntities(entities);

  // Submit the batch
  const response = await batch.submitBatch();

  console.log(response.subResponses);
  // Output:
  // [
  //   {
  //     status: 204,
  //     rowKey: 'A1',
  //     etag: `W/"datetime'2020-10-02T03%3A31%3A09.9324186Z'"`
  //   },
  //   {
  //     status: 204,
  //     rowKey: 'A2',
  //     etag: `W/"datetime'2020-10-02T03%3A31%3A09.9324186Z'"`
  //   },
  //   {
  //     status: 204,
  //     rowKey: 'A3',
  //     etag: `W/"datetime'2020-10-02T03%3A31%3A09.9324186Z'"`
  //   }
  // ]
}

batchOperations().catch((err) => {
  console.error("The sample encountered an error:", err);
});
