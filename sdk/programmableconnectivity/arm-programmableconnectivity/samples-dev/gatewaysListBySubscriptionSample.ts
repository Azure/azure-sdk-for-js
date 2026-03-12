// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list Gateway resources by subscription ID.
 *
 * @summary list Gateway resources by subscription ID.
 * x-ms-original-file: 2024-01-15-preview/Gateways_ListBySubscription_MaximumSet_Gen.json
 */

import { ProgrammableConnectivityClient } from "@azure/arm-programmableconnectivity";
import { DefaultAzureCredential } from "@azure/identity";

async function gatewaysListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.gateways.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await gatewaysListBySubscription();
}

main().catch(console.error);
