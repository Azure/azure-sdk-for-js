// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ChaosManagementClient } = require("@azure/arm-chaos");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a private access
 *
 * @summary create or update a private access
 * x-ms-original-file: 2026-05-01-preview/PrivateAccesses_CreateOrUpdate_Create_Or_Update_A_Private_Access_Resource.json
 */
async function createOrUpdateAPrivateAccessResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.privateAccesses.createOrUpdate("myResourceGroup", "myPrivateAccess", {
    location: "centraluseuap",
    properties: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a private access
 *
 * @summary create or update a private access
 * x-ms-original-file: 2026-05-01-preview/PrivateAccesses_CreateOrUpdate_Create_Or_Update_A_Private_Access_Resource_With_Public_Network_Access.json
 */
async function createOrUpdateAPrivateAccessResourceWithPublicNetworkAccess() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const result = await client.privateAccesses.createOrUpdate("myResourceGroup", "myPrivateAccess", {
    location: "centraluseuap",
    properties: { publicNetworkAccess: "Enabled" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAPrivateAccessResource();
  await createOrUpdateAPrivateAccessResourceWithPublicNetworkAccess();
}

main().catch(console.error);
