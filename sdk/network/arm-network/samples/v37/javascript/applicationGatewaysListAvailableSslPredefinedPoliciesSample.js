// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all SSL predefined policies for configuring Ssl policy.
 *
 * @summary lists all SSL predefined policies for configuring Ssl policy.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayAvailableSslOptionsPredefinedPoliciesGet.json
 */
async function getAvailableSslPredefinedPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationGateways.listAvailableSslPredefinedPolicies()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAvailableSslPredefinedPolicies();
}

main().catch(console.error);
