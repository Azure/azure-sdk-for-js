// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the view by view name.
 *
 * @summary Gets the view by view name.
 * x-ms-original-file: specification/cost-management/resource-manager/Microsoft.CostManagement/stable/2022-10-01/examples/PrivateView.json
 */

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function privateView(): Promise<void> {
  const viewName = "swaggerExample";
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.views.get(viewName);
  console.log(result);
}

async function main(): Promise<void> {
  await privateView();
}

main().catch(console.error);
