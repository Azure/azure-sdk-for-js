// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/**
 * This sample demonstrates how to send a transactional batch request
 * with multiple operations in a single request
 *
 * @summary sends transactional batch requests
 * @azsdk-weight 40
 */

import { TableClient } from "@azure/data-tables";
import { v4 } from "uuid";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";
const tableSufix = v4().replace(/-/g, "");

interface Entity {
  partitionKey: string;
  rowKey: string;
  name: string;
  price: number;
  quantity: number;
}

async function batchOperations() {
  console.log("== Batch Operations Sample ==");

  // Note that this sample assumes that a table with tableName exists
  const tableName = `batch${tableSufix}`;

  // See authenticationMethods sample for other options of creating a new client
  const client = TableClient.fromConnectionString(connectionString, tableName);

  // Create the table
  await client.createTableIfNotExists();

  const partitionKey = "Stationery";

  const entities: Entity[] = [
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
  const batch = client.createBatch(partitionKey);

  // Add each entity operation to the batch
  for (const entity of entities) {
    batch.createEntity(entity);
  }


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

  // Delete the table to clean up
  await client.deleteTableIfExists();
}

batchOperations().catch((err) => {
  console.error("The sample encountered an error:", err);
});
