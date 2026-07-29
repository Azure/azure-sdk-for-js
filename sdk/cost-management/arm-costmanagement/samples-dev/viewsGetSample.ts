// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementClient } from "@azure/arm-costmanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the view by view name.
 *
 * @summary gets the view by view name.
 * x-ms-original-file: 2025-03-01/PrivateView.json
 */
async function privateView(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new CostManagementClient(credential);
  const result = await client.views.get("swaggerExample");
  console.log(result);
}

async function main(): Promise<void> {
  await privateView();
}

main().catch(console.error);
