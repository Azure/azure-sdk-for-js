// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to determines whether a resource can be created with the specified name.
 *
 * @summary determines whether a resource can be created with the specified name.
 * x-ms-original-file: 2025-02-01-preview/CheckNameAvailabilityServerAlreadyExists.json
 */
async function checkForAServerNameThatAlreadyExists() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.servers.checkNameAvailability({
    name: "server1",
    type: "Microsoft.Sql/servers",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to determines whether a resource can be created with the specified name.
 *
 * @summary determines whether a resource can be created with the specified name.
 * x-ms-original-file: 2025-02-01-preview/CheckNameAvailabilityServerAvailable.json
 */
async function checkForAServerNameThatIsAvailable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.servers.checkNameAvailability({
    name: "server1",
    type: "Microsoft.Sql/servers",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to determines whether a resource can be created with the specified name.
 *
 * @summary determines whether a resource can be created with the specified name.
 * x-ms-original-file: 2025-02-01-preview/CheckNameAvailabilityServerInvalid.json
 */
async function checkForAServerNameThatIsInvalid() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.servers.checkNameAvailability({
    name: "SERVER1",
    type: "Microsoft.Sql/servers",
  });
  console.log(result);
}

async function main() {
  await checkForAServerNameThatAlreadyExists();
  await checkForAServerNameThatIsAvailable();
  await checkForAServerNameThatIsInvalid();
}

main().catch(console.error);
