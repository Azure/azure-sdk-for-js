// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to apply maintenance updates to resource with parent
 *
 * @summary apply maintenance updates to resource with parent
 * x-ms-original-file: 2023-10-01-preview/ApplyUpdates_CreateOrUpdateParent.json
 */
async function applyUpdatesCreateOrUpdateParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.applyUpdates.createOrUpdateParent(
    "examplerg",
    "Microsoft.Compute",
    "virtualMachineScaleSets",
    "smdtest1",
    "virtualMachines",
    "smdvm1",
  );
  console.log(result);
}

async function main() {
  await applyUpdatesCreateOrUpdateParent();
}

main().catch(console.error);
