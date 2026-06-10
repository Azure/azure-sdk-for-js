// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to apply maintenance updates to resource
 *
 * @summary apply maintenance updates to resource
 * x-ms-original-file: 2023-10-01-preview/ApplyUpdates_CreateOrUpdate.json
 */
async function applyUpdatesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.applyUpdates.createOrUpdate(
    "examplerg",
    "Microsoft.Compute",
    "virtualMachineScaleSets",
    "smdtest1",
  );
  console.log(result);
}

async function main() {
  await applyUpdatesCreateOrUpdate();
}

main().catch(console.error);
