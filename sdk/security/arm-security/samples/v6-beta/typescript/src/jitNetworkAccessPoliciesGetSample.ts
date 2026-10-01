// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to policies for protecting resources using Just-in-Time access control for the subscription, location
 *
 * @summary policies for protecting resources using Just-in-Time access control for the subscription, location
 * x-ms-original-file: 2020-01-01/JitNetworkAccessPolicies/GetJitNetworkAccessPolicy_example.json
 */
async function getJITNetworkAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.jitNetworkAccessPolicies.get("myRg1", "westeurope", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await getJITNetworkAccessPolicy();
}

main().catch(console.error);
