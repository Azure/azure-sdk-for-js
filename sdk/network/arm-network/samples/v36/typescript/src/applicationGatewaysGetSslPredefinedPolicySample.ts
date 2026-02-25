// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets Ssl predefined policy with the specified policy name.
 *
 * @summary Gets Ssl predefined policy with the specified policy name.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ApplicationGatewayAvailableSslOptionsPredefinedPolicyGet.json
 */
async function getAvailableSslPredefinedPolicyByName(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const predefinedPolicyName = "AppGwSslPolicy20150501";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result =
    await client.applicationGateways.getSslPredefinedPolicy(
      predefinedPolicyName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getAvailableSslPredefinedPolicyByName();
}

main().catch(console.error);
