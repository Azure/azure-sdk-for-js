// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MaintenanceManagementClient } = require("@azure/arm-maintenance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list configurationAssignments for resource.
 *
 * @summary list configurationAssignments for resource.
 * x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_ListParent.json
 */
async function configurationAssignmentsListParent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.configurationAssignments.listParent(
    "examplerg",
    "Microsoft.Compute",
    "virtualMachineScaleSets",
    "smdtest1",
    "virtualMachines",
    "smdtestvm1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await configurationAssignmentsListParent();
}

main().catch(console.error);
