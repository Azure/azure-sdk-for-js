// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the view for the defined scope by view name.
 *
 * @summary Gets the view for the defined scope by view name.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ViewByResourceGroup.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resourceGroupView(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG";
  const viewName = "swaggerExample";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.views.getByScope(scope, viewName);
  console.log(result);
}

async function main(): Promise<void> {
  await resourceGroupView();
}

main().catch(console.error);
