// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to create and consume Int64 values
 *
 * @summary creates and works with an entity containing an Int64 value
 * @azsdk-weight 70
 */

import { Edm, TableClient, AzureNamedKeyCredential } from "@azure/data-tables";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";

async function workingWithInt64() {
  console.log("working with Int64 sample");
  const client = new TableClient(
    tablesUrl,
    "testInt64",
    new AzureNamedKeyCredential(accountName, accountKey)
  );

  await client.createTable();

  type FooEntity = {
    foo: Edm<"Int64">;
  };

  await client.createEntity<FooEntity>({
    partitionKey: "p1",
    rowKey: "1",
    // To work with Int64 we need to use an object that includes
    // the value as a string and a notation of the type, in this case Int64
    foo: { value: "12345", type: "Int64" },
  });

  const entity = await client.getEntity<FooEntity>("p1", "1", { disableTypeConversion: true });

  // In order to do arithmetic operations with Int64 you need to use
  // bigint or a third party library such as 'long'
  console.log(entity);

  await client.deleteTable();
}

export async function main() {
  await workingWithInt64();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
