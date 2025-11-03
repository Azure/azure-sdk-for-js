// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get configuration assignment for resource..
 *
 * @summary get configuration assignment for resource..
 * x-ms-original-file: 2023-10-01-preview/ConfigurationAssignmentsForResourceGroup_Get.json
 */
async function configurationAssignmentsForResourceGroupGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignmentsForResourceGroup.get(
    "examplerg",
    "workervmConfiguration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationAssignmentsForResourceGroupGet();
}

main().catch(console.error);
