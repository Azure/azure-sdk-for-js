// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a specific topology component.
 *
 * @summary gets a specific topology component.
 * x-ms-original-file: 2020-01-01/Topology/GetTopology_example.json
 */
async function getTopology(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3eeab341-f466-499c-a8be-85427e154bad";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.topology.get("myservers", "centralus", "vnets");
  console.log(result);
}

async function main(): Promise<void> {
  await getTopology();
}

main().catch(console.error);
