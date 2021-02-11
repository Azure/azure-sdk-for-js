// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { TableServiceClient, TablesSharedKeyCredential } = require("@azure/data-tables");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// URL of the tables endpoint
const tablesUrl = process.env["TABLES_URL"] || "";

// You can find your storage account's name, connection strings and keys in the Azure portal.
// Navigate to Settings > Access keys in your storage account's menu blade to see connection strings for both primary and secondary access keys
const accountConnectionString = process.env["ACCOUNT_CONNECTION_STRING"] || "";
const accountName = process.env["ACCOUNT_NAME"] || "";
const accountKey = process.env["ACCOUNT_KEY"] || "";

// You can generate a SAS connection string and token for your storage account in the Azure Portal
// Navigate to Settings > "Shared access signature" in your storage account's menu blade select the Allowed services, resource types, permissions and expiry options
// and generate your SAS and connection string.
const sasConnectionString = process.env["SAS_CONNECTION_STRING"] || "";
const sasToken = process.env["SAS_TOKEN"] || "";

/**
 * Create a TableServiceCLient using a SAS connection String
 */
async function tableServiceClientWithSasConnectionString() {
  const client = TableServiceClient.fromConnectionString(sasConnectionString);
  countTablesWithClient(client);
}

/**
 * Create a TableServiceCLient using a SAS token
 */
async function tableServiceClientWithSasToken() {
  const client = new TableServiceClient(`${tablesUrl}${sasToken}`);
  countTablesWithClient(client);
}

/**
 * Create a TableServiceCLient using an Account connection String.
 * Note that this authentication method is only supported in Node,
 * and it is not available for browsers
 */
async function tableServiceClientWithAccountConnectionString() {
  const client = TableServiceClient.fromConnectionString(accountConnectionString);
  countTablesWithClient(client);
}

/**
 * Create a TableServiceCLient using account name and account key
 * Note that this authentication method is only supported in Node,
 * and it is not available for browsers
 */
async function tableServiceClientWithAccountKey() {
  const creds = new TablesSharedKeyCredential(accountName, accountKey);
  const client = new TableServiceClient(tablesUrl, creds);
  countTablesWithClient(client);
}

async function countTablesWithClient(client) {
  const tablesIterator = client.listTables();
  let count = 0;
  for await (const _table of tablesIterator) {
    count++;
  }

  console.log(`Listed ${count} tables`);
}

async function main() {
  console.log("== Client Authentication Methods Sample ==");

  await tableServiceClientWithSasConnectionString();
  await tableServiceClientWithSasToken();

  await tableServiceClientWithAccountConnectionString();
  await tableServiceClientWithAccountKey();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
