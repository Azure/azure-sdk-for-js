// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List registries by subscription
 *
 * @summary List registries by subscription
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Registries/listBySubscription.json
 */

import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listRegistriesBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registries.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listRegistriesBySubscription();
}

main().catch(console.error);
