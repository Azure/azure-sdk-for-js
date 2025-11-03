// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get configuration assignment for resource..
 *
 * @summary get configuration assignment for resource..
 * x-ms-original-file: 2023-10-01-preview/ConfigurationAssignments_GetParent.json
 */
async function configurationAssignmentsGetParent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignments.getParent(
    "examplerg",
    "Microsoft.Compute",
    "virtualMachineScaleSets",
    "smdtest1",
    "virtualMachines",
    "smdvm1",
    "workervmPolicy",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationAssignmentsGetParent();
}

main().catch(console.error);
