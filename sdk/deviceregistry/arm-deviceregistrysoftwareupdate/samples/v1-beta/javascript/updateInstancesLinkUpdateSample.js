// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceUpdateClient } = require("@azure/arm-deviceregistrysoftwareupdate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update linking properties (e.g., identity rotation).
 *
 * @summary update linking properties (e.g., identity rotation).
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_LinkUpdate.json
 */
async function updateLinkingProperties() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  await client.updateInstances.linkUpdate("test-rg", "contoso", {
    inboundCallerIdentity: {
      type: "UserAssigned",
      userAssignedIdentity:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/contoso-mi",
    },
    dataAddress: "eastus2.api.deviceregistry.com",
  });
}

async function main() {
  await updateLinkingProperties();
}

main().catch(console.error);
