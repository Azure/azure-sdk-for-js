// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This sample demonstrates how to use the different methods of authentication
 * to make calls to the Azure Tables Service
 *
 * @summary authenticates using different authentication methods
 */
import {
  TableServiceClient,
  AzureNamedKeyCredential,
  AzureSASCredential
} from "@azure/data-tables";

import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
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
 * Create a TableServiceCLient using a SAS connection String
 */
async function tableServiceClientWithAAD() {
  // DefaultAzureCredential expects the following three environment variables:
  // - AZURE_TENANT_ID: The tenant ID in Azure Active Directory
  // - AZURE_CLIENT_ID: The application (client) ID registered in the AAD tenant
  // - AZURE_CLIENT_SECRET: The client secret for the registered application
  const credential = new DefaultAzureCredential();
  const client = new TableServiceClient(tablesUrl, credential);
  countTablesWithClient(client);
}

/**
 * Create a TableServiceCLient using a SAS token
 */
async function tableServiceClientWithSasToken() {
  const client = new TableServiceClient(tablesUrl, new AzureSASCredential(sasToken));
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
  const creds = new AzureNamedKeyCredential(accountName, accountKey);
  const client = new TableServiceClient(tablesUrl, creds);
  countTablesWithClient(client);
}

async function countTablesWithClient(client: TableServiceClient) {
  const tablesIterator = client.listTables();
  let count = 0;
  for await (const _table of tablesIterator) {
    count++;
  }

  console.log(`Listed ${count} tables`);
}

export async function main() {
  console.log("== Client Authentication Methods Sample ==");

  await tableServiceClientWithSasConnectionString();
  await tableServiceClientWithSasToken();

  await tableServiceClientWithAccountConnectionString();
  await tableServiceClientWithAccountKey();

  await tableServiceClientWithAAD();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
