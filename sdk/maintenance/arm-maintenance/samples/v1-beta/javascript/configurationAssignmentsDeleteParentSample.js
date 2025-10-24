// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unregister configuration for resource.
 *
 * @summary unregister configuration for resource.
 * x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_DeleteParent.json
 */
async function configurationAssignmentsDeleteParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignments.deleteParent(
    "examplerg",
    "Microsoft.Compute",
    "virtualMachineScaleSets",
    "smdtest1",
    "virtualMachines",
    "smdvm1",
    "workervmConfiguration",
  );
  console.log(result);
}

async function main() {
  await configurationAssignmentsDeleteParent();
}

main().catch(console.error);
