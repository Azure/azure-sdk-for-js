// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TableServiceClient, TableClient, TableEntity } from "../../..";

// Load the .env file if it exists
//import * as dotenv from "dotenv";
//dotenv.config();

const connectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";
// const connectionString = process.env["SAS_CONNECTION_STRING"] || "";
async function listTables() {
  const client = TableServiceClient.fromConnectionString(connectionString);

  const tables = await client.listTables();

  for (let table of tables) {
    console.log(table);
  }
}

interface Foo {
  bar: string;
}

async function listEntities() {
                                const client = TableClient.fromConnectionString(
                                  connectionString,
                                  "test1"
                                );
                                const TableEntity: TableEntity<Foo> = {
                                  PartitionKey: "p1",
                                  RowKey: "r2",
                                  bar: "Bar"
                                };;
                                client.createEntity<Foo>(TableEntity);;
                                const entities = await client.listEntities();

                                for (let entity of entities) {
                                  console.log(entity);
                                }
                              }

async function main() {
  await listTables();
  await listEntities();
}

main().catch(console.error);
