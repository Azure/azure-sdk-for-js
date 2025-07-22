// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to unregister configuration for resource.
 *
 * @summary unregister configuration for resource.
 * x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_Delete.json
 */
async function configurationAssignmentsForResourceGroupDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignmentsForResourceGroup.delete(
    "examplerg",
    "workervmConfiguration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationAssignmentsForResourceGroupDelete();
}

main().catch(console.error);
