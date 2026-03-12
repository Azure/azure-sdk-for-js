// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Unregister configuration for resource.
 *
 * @summary Unregister configuration for resource.
 * x-ms-original-file: specification/maintenance/resource-manager/Microsoft.Maintenance/preview/2023-10-01-preview/examples/ConfigurationAssignmentsForSubscriptions_Delete.json
 */

import { MaintenanceManagementClient } from "@azure/arm-maintenance";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function configurationAssignmentsForSubscriptionsDelete(): Promise<void> {
  const subscriptionId =
    process.env["MAINTENANCE_SUBSCRIPTION_ID"] || "5b4b650e-28b9-4790-b3ab-ddbd88d727c4";
  const configurationAssignmentName = "workervmConfiguration";
  const credential = new DefaultAzureCredential();
  const client = new MaintenanceManagementClient(credential, subscriptionId);
  const result = await client.configurationAssignmentsForSubscriptions.delete(
    configurationAssignmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await configurationAssignmentsForSubscriptionsDelete();
}

main().catch(console.error);
