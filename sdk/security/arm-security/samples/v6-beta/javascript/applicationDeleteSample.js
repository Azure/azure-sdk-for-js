// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an Application over a given scope
 *
 * @summary delete an Application over a given scope
 * x-ms-original-file: 2022-07-01-preview/Applications/DeleteApplication_example.json
 */
async function deleteSecurityApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.application.delete("ad9a8e26-29d9-4829-bb30-e597a58cdbb8");
}

async function main() {
  await deleteSecurityApplication();
}

main().catch(console.error);
