// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all SSL predefined policies for configuring Ssl policy.
 *
 * @summary lists all SSL predefined policies for configuring Ssl policy.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayAvailableSslOptionsPredefinedPoliciesGet.json
 */
async function getAvailableSslPredefinedPolicies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationGateways.listAvailableSslPredefinedPolicies()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getAvailableSslPredefinedPolicies();
}

main().catch(console.error);
