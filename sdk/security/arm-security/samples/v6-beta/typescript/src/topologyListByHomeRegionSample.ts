// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list that allows to build a topology view of a subscription and location.
 *
 * @summary gets a list that allows to build a topology view of a subscription and location.
 * x-ms-original-file: 2020-01-01/Topology/GetTopologySubscriptionLocation_example.json
 */
async function getTopologyOnASubscriptionFromSecurityDataLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3eeab341-f466-499c-a8be-85427e154bad";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topology.listByHomeRegion("centralus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTopologyOnASubscriptionFromSecurityDataLocation();
}

main().catch(console.error);
