// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ResourceManagementClient } from "@azure/arm-resources";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to captures the specified resource group as a template.
 *
 * @summary captures the specified resource group as a template.
 * x-ms-original-file: 2025-04-01/ExportResourceGroup.json
 */
async function exportAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.resourceGroups.exportTemplate("my-resource-group", {
    options: "IncludeParameterDefaultValue,IncludeComments",
    resources: ["*"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to captures the specified resource group as a template.
 *
 * @summary captures the specified resource group as a template.
 * x-ms-original-file: 2025-04-01/ExportResourceGroupAsBicep.json
 */
async function exportAResourceGroupAsBicep(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.resourceGroups.exportTemplate("my-resource-group", {
    options: "IncludeParameterDefaultValue,IncludeComments",
    outputFormat: "Bicep",
    resources: ["*"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to captures the specified resource group as a template.
 *
 * @summary captures the specified resource group as a template.
 * x-ms-original-file: 2025-04-01/ExportResourceGroupWithFiltering.json
 */
async function exportAResourceGroupWithFiltering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ResourceManagementClient(credential, subscriptionId);
  const result = await client.resourceGroups.exportTemplate("my-resource-group", {
    options: "SkipResourceNameParameterization",
    resources: [
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/my-resource-group/providers/My.RP/myResourceType/myFirstResource",
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await exportAResourceGroup();
  await exportAResourceGroupAsBicep();
  await exportAResourceGroupWithFiltering();
}

main().catch(console.error);
