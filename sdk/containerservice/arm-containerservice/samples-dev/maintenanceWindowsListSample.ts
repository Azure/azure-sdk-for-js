// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists maintenance windows in the specified resource group.
 *
 * @summary lists maintenance windows in the specified resource group.
 * x-ms-original-file: 2026-04-02-preview/MaintenanceWindowsList.json
 */
async function listMaintenanceWindowsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.maintenanceWindows.list("rg-maintenance")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listMaintenanceWindowsByResourceGroup();
}

main().catch(console.error);
