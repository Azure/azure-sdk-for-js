// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of all possible traffic between resources for the subscription and location, based on connection type.
 *
 * @summary gets the list of all possible traffic between resources for the subscription and location, based on connection type.
 * x-ms-original-file: 2020-01-01/AllowedConnections/GetAllowedConnections_example.json
 */
async function getAllowedConnections(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3eeab341-f466-499c-a8be-85427e154bad";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.allowedConnections.get("myResourceGroup", "centralus", "Internal");
  console.log(result);
}

async function main(): Promise<void> {
  await getAllowedConnections();
}

main().catch(console.error);
