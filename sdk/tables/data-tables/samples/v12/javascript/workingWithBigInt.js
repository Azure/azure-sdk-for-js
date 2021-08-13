// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to create and consume Int64 values using bigint
 *
 * @summary creates and works with an entity containing a bigint
 */

const { TableClient, AzureNamedKeyCredential } = require("@azure/data-tables");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const tablesUrl = process.env["TABLES_URL"] || "";
const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";

async function workingWithBigint() {
  console.log("Working with bigint sample");
  const client = new TableClient(
    tablesUrl,
    "testbigint",
    new AzureNamedKeyCredential(accountName, accountKey)
  );

  await client.createTable();

  await client.createEntity({ partitionKey: "p1", rowKey: "1", foo: BigInt("12345") });

  const entity = await client.getEntity("p1", "1");

  // Do arithmetic operations with bigint
  const resultPlusOne = entity.foo + BigInt(1);

  console.log(resultPlusOne);

  await client.deleteTable();
}

async function main() {
  await workingWithBigint();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
