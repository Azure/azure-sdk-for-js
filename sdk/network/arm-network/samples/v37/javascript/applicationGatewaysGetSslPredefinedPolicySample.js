// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Ssl predefined policy with the specified policy name.
 *
 * @summary gets Ssl predefined policy with the specified policy name.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayAvailableSslOptionsPredefinedPolicyGet.json
 */
async function getAvailableSslPredefinedPolicyByName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.getSslPredefinedPolicy("AppGwSslPolicy20150501");
  console.log(result);
}

async function main() {
  await getAvailableSslPredefinedPolicyByName();
}

main().catch(console.error);
