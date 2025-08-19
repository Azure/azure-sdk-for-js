// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to delete a view.
 *
 * @summary The operation to delete a view.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/ViewDeleteByResourceGroup.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function resourceGroupDeleteView(): Promise<void> {
  const scope = "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/MYDEVTESTRG";
  const viewName = "TestView";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.views.deleteByScope(scope, viewName);
  console.log(result);
}

async function main(): Promise<void> {
  await resourceGroupDeleteView();
}

main().catch(console.error);
