// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets Ssl predefined policy with the specified policy name.
 *
 * @summary Gets Ssl predefined policy with the specified policy name.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/ApplicationGatewayAvailableSslOptionsPredefinedPolicyGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

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
