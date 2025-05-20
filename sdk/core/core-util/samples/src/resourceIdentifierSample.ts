// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use the parseResourceId utility
 */

import { parseResourceId } from "@azure/core-util";

// Sample Azure resource IDs
const resourceIds = [
  "/subscriptions/00000000-0000-0000-0000-000000000000",
  "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup",
  "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
  "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myVNet/subnets/mySubnet",
  "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Sql/servers/myServer/databases/myDB/tables/myTable",
  "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/someParent/parentName/childResource/myResource"
];

// Example usage
async function main(): Promise<void> {
  for (const resourceId of resourceIds) {
    console.log(`\nParsing resource ID: ${resourceId}`);
    try {
      const parsed = parseResourceId(resourceId);
      console.log("Parsed components:");
      console.log(`  Subscription ID: ${parsed.subscriptionId ?? "<none>"}`);
      console.log(`  Resource Group: ${parsed.resourceGroupName ?? "<none>"}`);
      console.log(`  Provider: ${parsed.provider ?? "<none>"}`);
      console.log(`  Resource Type: ${parsed.resourceType ?? "<none>"}`);
      console.log(`  Resource Name: ${parsed.name ?? "<none>"}`);
      console.log(`  Parent Resources: ${parsed.parentResources.length > 0 ? JSON.stringify(parsed.parentResources) : "<none>"}`);
    } catch (error) {
      console.error(`Error parsing resource ID: ${error.message}`);
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});