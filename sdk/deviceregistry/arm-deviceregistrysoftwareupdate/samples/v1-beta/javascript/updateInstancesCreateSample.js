// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceUpdateClient } = require("@azure/arm-deviceregistrysoftwareupdate");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an Update Instance.
 *
 * @summary creates or updates an Update Instance.
 * x-ms-original-file: 2026-11-02-preview/UpdateInstances_Create.json
 */
async function createsOrUpdatesAnUpdateInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceUpdateClient(credential, subscriptionId);
  const result = await client.updateInstances.create("test-rg", "contoso", {
    location: "eastus2",
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/contoso-mi":
          {},
      },
    },
    properties: {},
    tags: { env: "prod" },
  });
  console.log(result);
}

async function main() {
  await createsOrUpdatesAnUpdateInstance();
}

main().catch(console.error);
