// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to removes the policy.
 *
 * @summary removes the policy.
 * x-ms-original-file: 2024-09-01/Policy_Delete.json
 */
async function deletesThePolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  await client.policy.delete("rgrecoveryservicesdatareplication", "4", "wqfscsdv");
}

async function main() {
  await deletesThePolicy();
}

main().catch(console.error);
