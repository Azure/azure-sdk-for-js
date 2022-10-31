// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to configure and use replication
 *
 * @summary creates a client that works with replicated services
 * @azsdk-weight 70
 */

import { TableClient, AzureNamedKeyCredential } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const tablesUrls = [process.env["TABLES_URL_1"] || "", process.env["TABLES_URL_2"] || ""];
const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";

async function replication() {
  console.log("Working with table replicas");
  const client = new TableClient(
    tablesUrls[0],
    "testbigint",
    new AzureNamedKeyCredential(accountName, accountKey),
    // The client supports an arbitrary number of failover hosts
    {
      readFailoverHosts: tablesUrls.slice(1),
      // Omit this if the service doesn't support writing to replicas
      writeFailoverHosts: tablesUrls.slice(1),
    }
  );

  await client.createTable();

  // The client API is no different with replication configured
  // If the first URL is unavailable, the client will cycle through the others.

  type Foo = {
    foo: string;
  };

  await client.createEntity<Foo>({ partitionKey: "p1", rowKey: "1", foo: "bar" });

  const entity = await client.getEntity<Foo>("p1", "1");

  console.log(entity.foo);

  await client.deleteTable();
}

export async function main() {
  await replication();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
