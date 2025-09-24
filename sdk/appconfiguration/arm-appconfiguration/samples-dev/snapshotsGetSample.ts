// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the properties of the specified snapshot. NOTE: This operation is intended for use in Azure Resource Manager (ARM) Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead.
 *
 * @summary Gets the properties of the specified snapshot. NOTE: This operation is intended for use in Azure Resource Manager (ARM) Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/ConfigurationStoresGetSnapshot.json
 */

import { AppConfigurationManagementClient } from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function snapshotsGet(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName =
    process.env["APPCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const configStoreName = "contoso";
  const snapshotName = "mySnapshot";
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.snapshots.get(
    resourceGroupName,
    configStoreName,
    snapshotName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await snapshotsGet();
}

main().catch(console.error);
