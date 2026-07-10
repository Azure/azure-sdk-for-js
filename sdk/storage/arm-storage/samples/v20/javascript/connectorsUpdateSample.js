// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Storage Connector.
 *
 * @summary update a Storage Connector.
 * x-ms-original-file: 2026-04-01/StorageConnectorCRUD/StorageConnectors_Update.json
 */
async function updateConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.connectors.update("testrg", "teststorageaccount", "testconnector", {
    properties: {
      source: {
        type: "DataShare",
        authProperties: {
          type: "ManagedIdentity",
          identityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/newTestIdentity",
        },
      },
    },
  });
  console.log(result);
}

async function main() {
  await updateConnector();
}

main().catch(console.error);
