// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all NGINX deployments under the specified resource group.
 *
 * @summary list all NGINX deployments under the specified resource group.
 * x-ms-original-file: 2025-03-01-preview/Deployments_ListByResourceGroup.json
 */
async function deploymentsListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deployments.listByResourceGroup("myResourceGroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await deploymentsListByResourceGroup();
}

main().catch(console.error);
