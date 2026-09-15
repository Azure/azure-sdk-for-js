// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate a letter of authorization for the requested ExpressRouteLag resource.
 *
 * @summary generate a letter of authorization for the requested ExpressRouteLag resource.
 * x-ms-original-file: 2025-09-01/GenerateExpressRouteLagsLOA.json
 */
async function generateExpressRouteLagLOA(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteLags.generateLoa("rg1", "lagName", {
    customerName: "Customer Name",
    members: ["member1", "member2", "member3", "member4"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await generateExpressRouteLagLOA();
}

main().catch(console.error);
