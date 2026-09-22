// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of all possible traffic between resources for the subscription and location.
 *
 * @summary gets the list of all possible traffic between resources for the subscription and location.
 * x-ms-original-file: 2020-01-01/AllowedConnections/GetAllowedConnectionsSubscriptionLocation_example.json
 */
async function getAllowedConnectionsOnASubscriptionFromSecurityDataLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3eeab341-f466-499c-a8be-85427e154bad";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.allowedConnections.listByHomeRegion("centralus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAllowedConnectionsOnASubscriptionFromSecurityDataLocation();
}

main().catch(console.error);
