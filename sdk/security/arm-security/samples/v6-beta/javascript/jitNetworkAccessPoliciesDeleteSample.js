// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Just-in-Time access control policy.
 *
 * @summary delete a Just-in-Time access control policy.
 * x-ms-original-file: 2020-01-01/JitNetworkAccessPolicies/DeleteJitNetworkAccessPolicy_example.json
 */
async function deleteAJITNetworkAccessPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.jitNetworkAccessPolicies.delete("myRg1", "westeurope", "default");
}

async function main() {
  await deleteAJITNetworkAccessPolicy();
}

main().catch(console.error);
