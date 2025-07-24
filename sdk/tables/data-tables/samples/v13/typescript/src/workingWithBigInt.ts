// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and consume Int64 values using bigint
 *
 * @summary creates and works with an entity containing a bigint
 */

import { TableClient } from "@azure/data-tables";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const tablesUrl = process.env["TABLES_URL"] || "";

async function workingWithBigint(): Promise<void> {
  console.log("Working with bigint sample");
  const client = new TableClient(tablesUrl, "testbigint", new DefaultAzureCredential());

  await client.createTable();

  type FooEntity = {
    foo: bigint;
  };

  await client.createEntity<FooEntity>({ partitionKey: "p1", rowKey: "1", foo: BigInt("12345") });

  const entity = await client.getEntity<FooEntity>("p1", "1");

  // Do arithmetic operations with bigint
  const resultPlusOne = entity.foo + BigInt(1);

  console.log(resultPlusOne);

  await client.deleteTable();
}

export async function main(): Promise<void> {
  await workingWithBigint();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
