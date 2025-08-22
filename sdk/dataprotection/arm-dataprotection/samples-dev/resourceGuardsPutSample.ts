// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a ResourceGuard resource belonging to a resource group.
 *
 * @summary Creates or updates a ResourceGuard resource belonging to a resource group.
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/ResourceGuardCRUD/PutResourceGuard.json
 */

import type { ResourceGuardResource } from "@azure/arm-dataprotection";
import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createResourceGuard(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "SampleResourceGroup";
  const resourceGuardsName = "swaggerExample";
  const parameters: ResourceGuardResource = {
    location: "WestUS",
    tags: { key1: "val1" },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.resourceGuards.put(
    resourceGroupName,
    resourceGuardsName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createResourceGuard();
}

main().catch(console.error);
