// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a ResourceGuard resource from the resource group.
 *
 * @summary Deletes a ResourceGuard resource from the resource group.
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/ResourceGuardCRUD/DeleteResourceGuard.json
 */

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteResourceGuard(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "SampleResourceGroup";
  const resourceGuardsName = "swaggerExample";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.resourceGuards.delete(
    resourceGroupName,
    resourceGuardsName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteResourceGuard();
}

main().catch(console.error);
