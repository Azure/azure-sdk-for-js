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

const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";

const endpoint = "https://accountname-region1.table.cosmos.azure.com:443/";
// TableClient also supports Table Storage RA-GRS replicas.
const tablesUrls = [
  "https://accountname-region2.table.cosmos.azure.com:443/",
  "https://accountname-region3.table.cosmos.azure.com:443/",
];

async function replication() {
  console.log("Working with table replicas");
  const options = {
    readFailoverHosts: tablesUrls,
    // Table Storage RA-GRS replicas are read-only. Cosmos replicas can also be configured to be read-only. In these cases, omit this field.
    writeFailoverHosts: tablesUrls,
  };

  const client = new TableClient(
    endpoint,
    "testreplication",
    new AzureNamedKeyCredential(accountName, accountKey),
    options
  );

  await client.createTable();

  // The client API is no different with replication configured.
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
