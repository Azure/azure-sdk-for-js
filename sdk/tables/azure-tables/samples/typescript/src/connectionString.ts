import { TableServiceClient, TableClient } from "../../../";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// const connectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";
const connectionString = process.env["SAS_CONNECTION_STRING"] || "";

async function listTables() {
  const client = TableServiceClient.fromConnectionString(connectionString);

  const tables = await client.listTables(
    {},
    { requestOptions: { customHeaders: { accept: "application/json" } } }
  );

  console.log(tables.value);
}

async function listEntities() {
  const client = TableClient.fromConnectionString(connectionString, "test1");

  const entities = await client.listEntities(
    {},
    { requestOptions: { customHeaders: { accept: "application/json" } } }
  );

  console.log(entities.value);
}

async function main() {
  await listTables();
  await listEntities();
}

main().catch(console.error);
