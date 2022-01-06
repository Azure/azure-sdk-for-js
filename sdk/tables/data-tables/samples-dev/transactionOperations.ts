// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates how to send a transactional request
 * with multiple operations in a single request
 *
 * @summary sends transactional batch requests
 * @azsdk-weight 50
 */

import { TableClient, TransactionAction } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";

async function batchOperations() {
  console.log("== Batch Operations Sample ==");
  const tableName = `transactionsSample`;

  // See authenticationMethods sample for other options of creating a new client
  const client = TableClient.fromConnectionString(connectionString, tableName);

  // Create the table
  await client.createTable();

  const partitionKey = "Stationery";

  const actions: TransactionAction[] = [
    [
      "create",
      {
        partitionKey,
        rowKey: "A1",
        name: "Marker Set",
        price: 5.0,
        quantity: 21,
      },
    ],
    [
      "create",
      {
        partitionKey,
        rowKey: "A2",
        name: "Pen Set",
        price: 2.0,
        quantity: 6,
      },
    ],
    [
      "create",
      {
        partitionKey,
        rowKey: "A3",
        name: "Pencil",
        price: 1.5,
        quantity: 100,
      },
    ],
  ];

  // Submit the transaction with the list of actions.
  // Note that all the operations within a transaction must target the same partition key
  const transactionResult = await client.submitTransaction(actions);

  console.log(transactionResult.subResponses);
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

  // We can also send transactions with update operations
  const updateTransaction: TransactionAction[] = [
    // The default update mode is "Merge" which only replaces the properties in the entity we send
    // all other properties are kept as they are stored
    ["update", { partitionKey, rowKey: "A1", name: "[Updated - Merge] Marker Set" }],
    // If we set the update mode to "Replace", the original entity will be replaced with exactly what we send.
    // We need to be careful when using replace, because if we forget to pass a property it will get deleted.
    [
      "update",
      { partitionKey, rowKey: "A2", name: "[Updated - Replace] Pen Set", price: 99, quantity: 33 },
      "Replace",
    ],
  ];

  const updateResult = await client.submitTransaction(updateTransaction);

  console.log(updateResult);

  // Now we'll query our entities
  const entities = client.listEntities();

  for await (const entity of entities) {
    console.log(entity);
  }

  // Delete the table to clean up
  await client.deleteTable();
}

batchOperations().catch((err) => {
  console.error("The sample encountered an error:", err);
});
