// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a list of AzureBareMetalStorage instances in the specified subscription. The operations returns various properties of each Azure Bare Metal Instance.
 *
 * @summary Gets a list of AzureBareMetalStorage instances in the specified subscription. The operations returns various properties of each Azure Bare Metal Instance.
 * x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalStorageInstances_ListBySubscription.json
 */

import { BareMetalInfrastructureClient } from "@azure/arm-baremetalinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllAzureBareMetalStorageInstancesInASubscription(): Promise<void> {
  const subscriptionId =
    process.env["BAREMETALINFRASTRUCTURE_SUBSCRIPTION_ID"] ||
    "f0f4887f-d13c-4943-a8ba-d7da28d2a3fd";
  const credential = new DefaultAzureCredential();
  const client = new BareMetalInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureBareMetalStorageInstances.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllAzureBareMetalStorageInstancesInASubscription();
}

main().catch(console.error);
