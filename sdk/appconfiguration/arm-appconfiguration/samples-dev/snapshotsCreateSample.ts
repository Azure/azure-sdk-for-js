// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a snapshot. NOTE: This operation is intended for use in Azure Resource Manager (ARM) Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead.
 *
 * @summary Creates a snapshot. NOTE: This operation is intended for use in Azure Resource Manager (ARM) Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead.
 * x-ms-original-file: specification/appconfiguration/resource-manager/Microsoft.AppConfiguration/stable/2024-06-01/examples/ConfigurationStoresCreateSnapshot.json
 */

import {
  Snapshot,
  AppConfigurationManagementClient,
} from "@azure/arm-appconfiguration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function snapshotsCreate(): Promise<void> {
  const subscriptionId =
    process.env["APPCONFIGURATION_SUBSCRIPTION_ID"] ||
    "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const resourceGroupName =
    process.env["APPCONFIGURATION_RESOURCE_GROUP"] || "myResourceGroup";
  const configStoreName = "contoso";
  const snapshotName = "mySnapshot";
  const body: Snapshot = {
    filters: [{ key: "app1/*", label: "Production" }],
    retentionPeriod: 3600,
  };
  const credential = new DefaultAzureCredential();
  const client = new AppConfigurationManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.snapshots.beginCreateAndWait(
    resourceGroupName,
    configStoreName,
    snapshotName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await snapshotsCreate();
}

main().catch(console.error);
