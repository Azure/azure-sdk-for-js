// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a list of Azure Bare Metal Instances in the specified subscription. The operations returns various properties of each Azure Bare Metal Instance.
 *
 * @summary Returns a list of Azure Bare Metal Instances in the specified subscription. The operations returns various properties of each Azure Bare Metal Instance.
 * x-ms-original-file: specification/baremetalinfrastructure/resource-manager/Microsoft.BareMetalInfrastructure/preview/2023-08-04-preview/examples/AzureBareMetalInstances_ListBySubscription.json
 */

import { BareMetalInfrastructureClient } from "@azure/arm-baremetalinfrastructure";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAllAzureBareMetalInstancesInASubscription(): Promise<void> {
  const subscriptionId =
    process.env["BAREMETALINFRASTRUCTURE_SUBSCRIPTION_ID"] ||
    "f0f4887f-d13c-4943-a8ba-d7da28d2a3fd";
  const credential = new DefaultAzureCredential();
  const client = new BareMetalInfrastructureClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.azureBareMetalInstances.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllAzureBareMetalInstancesInASubscription();
}

main().catch(console.error);
