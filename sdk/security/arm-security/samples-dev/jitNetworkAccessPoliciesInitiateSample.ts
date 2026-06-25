// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to initiate a JIT access from a specific Just-in-Time policy configuration.
 *
 * @summary initiate a JIT access from a specific Just-in-Time policy configuration.
 * x-ms-original-file: 2020-01-01/JitNetworkAccessPolicies/InitiateJitNetworkAccessPolicy_example.json
 */
async function initiateAnActionOnAJITNetworkAccessPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.jitNetworkAccessPolicies.initiate("myRg1", "westeurope", "default", {
    justification: "testing a new version of the product",
    virtualMachines: [
      {
        id: "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/myRg1/providers/Microsoft.Compute/virtualMachines/vm1",
        ports: [{ allowedSourceAddressPrefix: "192.127.0.2", number: 3389 }],
      },
    ],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await initiateAnActionOnAJITNetworkAccessPolicy();
}

main().catch(console.error);
