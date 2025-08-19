// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to delete a view.
 *
 * @summary The operation to delete a view.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/PrivateViewDelete.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deletePrivateView(): Promise<void> {
  const viewName = "TestView";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.views.delete(viewName);
  console.log(result);
}

async function main(): Promise<void> {
  await deletePrivateView();
}

main().catch(console.error);
