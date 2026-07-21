// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureReservationAPI } from "@azure/arm-reservations";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of current quotas (service limits) and usage for all resources. The response from the list quota operation can be leveraged to request quota updates.
 *
 * @summary gets a list of current quotas (service limits) and usage for all resources. The response from the list quota operation can be leveraged to request quota updates.
 * x-ms-original-file: 2020-10-25/getComputeUsages.json
 */
async function quotasListUsagesForCompute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.quota.list(
    "00000000-0000-0000-0000-000000000000",
    "Microsoft.Compute",
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of current quotas (service limits) and usage for all resources. The response from the list quota operation can be leveraged to request quota updates.
 *
 * @summary gets a list of current quotas (service limits) and usage for all resources. The response from the list quota operation can be leveraged to request quota updates.
 * x-ms-original-file: 2020-10-25/getMachineLearningServicesUsages.json
 */
async function quotasListUsagesMachineLearningServices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AzureReservationAPI(credential);
  const resArray = new Array();
  for await (const item of client.quota.list(
    "00000000-0000-0000-0000-000000000000",
    "Microsoft.MachineLearningServices",
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await quotasListUsagesForCompute();
  await quotasListUsagesMachineLearningServices();
}

main().catch(console.error);
