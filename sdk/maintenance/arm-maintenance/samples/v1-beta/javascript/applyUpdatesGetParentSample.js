// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to track maintenance updates to resource with parent
 *
 * @summary track maintenance updates to resource with parent
 * x-ms-original-file: 2023-10-01-preview/ApplyUpdates_GetParent.json
 */
async function applyUpdatesGetParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.applyUpdates.getParent(
    "examplerg",
    "Microsoft.Compute",
    "virtualMachineScaleSets",
    "smdtest1",
    "virtualMachines",
    "smdvm1",
    "e9b9685d-78e4-44c4-a81c-64a14f9b87b6",
  );
  console.log(result);
}

async function main() {
  await applyUpdatesGetParent();
}

main().catch(console.error);
