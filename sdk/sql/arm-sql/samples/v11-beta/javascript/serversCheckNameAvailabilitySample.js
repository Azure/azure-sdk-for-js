// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Determines whether a resource can be created with the specified name.
 *
 * @summary Determines whether a resource can be created with the specified name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/CheckNameAvailabilityServerAlreadyExists.json
 */
async function checkForAServerNameThatAlreadyExists() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const parameters = {
    name: "server1",
    type: "Microsoft.Sql/servers",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.checkNameAvailability(parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Determines whether a resource can be created with the specified name.
 *
 * @summary Determines whether a resource can be created with the specified name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/CheckNameAvailabilityServerAvailable.json
 */
async function checkForAServerNameThatIsAvailable() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const parameters = {
    name: "server1",
    type: "Microsoft.Sql/servers",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.checkNameAvailability(parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Determines whether a resource can be created with the specified name.
 *
 * @summary Determines whether a resource can be created with the specified name.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/CheckNameAvailabilityServerInvalid.json
 */
async function checkForAServerNameThatIsInvalid() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const parameters = {
    name: "SERVER1",
    type: "Microsoft.Sql/servers",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.servers.checkNameAvailability(parameters);
  console.log(result);
}

async function main() {
  await checkForAServerNameThatAlreadyExists();
  await checkForAServerNameThatIsAvailable();
  await checkForAServerNameThatIsInvalid();
}

main().catch(console.error);
