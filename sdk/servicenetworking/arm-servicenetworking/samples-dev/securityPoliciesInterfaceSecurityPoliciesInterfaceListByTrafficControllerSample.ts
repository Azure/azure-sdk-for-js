// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SecurityPolicy resources by TrafficController
 *
 * @summary list SecurityPolicy resources by TrafficController
 * x-ms-original-file: 2025-01-01/SecurityPoliciesGetList.json
 */
async function getSecurityPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.securityPoliciesInterface.SecurityPoliciesInterface_listByTrafficController(
    "rg1",
    "tc1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  getSecurityPolicies();
}

main().catch(console.error);
