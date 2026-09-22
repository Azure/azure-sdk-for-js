// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Just-in-Time access control policy.
 *
 * @summary delete a Just-in-Time access control policy.
 * x-ms-original-file: 2020-01-01/JitNetworkAccessPolicies/DeleteJitNetworkAccessPolicy_example.json
 */
async function deleteAJITNetworkAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  await client.jitNetworkAccessPolicies.delete("myRg1", "westeurope", "default");
}

async function main(): Promise<void> {
  await deleteAJITNetworkAccessPolicy();
}

main().catch(console.error);
