// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Unregister configuration for resource.
 *
 * @summary Unregister configuration for resource.
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/ConfigurationAssignments_DeleteParent.json
 */

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configurationAssignmentsDeleteParent(): Promise<void> {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const resourceGroupName = process.env["MAINTENANCE_RESOURCE_GROUP"] || "examplerg";
  const providerName = "Microsoft.Compute";
  const resourceParentType = "virtualMachineScaleSets";
  const resourceParentName = "smdtest1";
  const resourceType = "virtualMachines";
  const resourceName = "smdvm1";
  const configurationAssignmentName = "workervmConfiguration";
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignments.deleteParent(
    resourceGroupName,
    providerName,
    resourceParentType,
    resourceParentName,
    resourceType,
    resourceName,
    configurationAssignmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationAssignmentsDeleteParent();
}

main().catch(console.error);
