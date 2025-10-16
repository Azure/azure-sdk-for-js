// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KeyVaultManagementClient } = require("@azure/arm-keyvault");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specified private endpoint connection associated with the managed hsm pool.
 *
 * @summary updates the specified private endpoint connection associated with the managed hsm pool.
 * x-ms-original-file: 2025-05-01/ManagedHsm_putPrivateEndpointConnection.json
 */
async function managedHsmPutPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new KeyVaultManagementClient(credential, subscriptionId);
  const result = await client.mhsmPrivateEndpointConnections.put(
    "sample-group",
    "sample-mhsm",
    "sample-pec",
    {
      properties: {
        privateLinkServiceConnectionState: {
          description: "My name is Joe and I'm approving this.",
          status: "Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await managedHsmPutPrivateEndpointConnection();
}

main().catch(console.error);
