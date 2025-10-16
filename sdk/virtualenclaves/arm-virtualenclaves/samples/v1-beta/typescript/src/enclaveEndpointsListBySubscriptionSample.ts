// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MissionClient } from "@azure/arm-virtualenclaves";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list EnclaveEndpointResource resources by subscription ID
 *
 * @summary list EnclaveEndpointResource resources by subscription ID
 * x-ms-original-file: 2025-05-01-preview/EnclaveEndpoints_ListBySubscription.json
 */
async function enclaveEndpointsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "73CEECEF-2C30-488E-946F-D20F414D99BA";
  const client = new MissionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.enclaveEndpoints.listBySubscription("TestMyEnclave")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await enclaveEndpointsListBySubscription();
}

main().catch(console.error);
