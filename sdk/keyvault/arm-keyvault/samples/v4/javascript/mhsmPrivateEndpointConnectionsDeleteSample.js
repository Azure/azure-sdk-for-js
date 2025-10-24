// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified private endpoint connection associated with the managed hsm pool.
 *
 * @summary deletes the specified private endpoint connection associated with the managed hsm pool.
 * x-ms-original-file: 2025-05-01/ManagedHsm_deletePrivateEndpointConnection.json
 */
async function managedHsmDeletePrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.mhsmPrivateEndpointConnections.delete(
    "sample-group",
    "sample-mhsm",
    "sample-pec",
  );
  console.log(result);
}

async function main() {
  await managedHsmDeletePrivateEndpointConnection();
}

main().catch(console.error);
