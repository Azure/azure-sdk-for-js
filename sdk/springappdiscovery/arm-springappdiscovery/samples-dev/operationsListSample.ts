// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List operations.
 *
 * @summary List operations.
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/Operations_List_MaximumSet_Gen.json
 */

import { SpringAppDiscoveryManagementClient } from "@azure/arm-springappdiscovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsListMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to List operations.
 *
 * @summary List operations.
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/Operations_List_MinimumSet_Gen.json
 */
async function operationsListMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await operationsListMaximumSetGen();
  await operationsListMinimumSetGen();
}

main().catch(console.error);
