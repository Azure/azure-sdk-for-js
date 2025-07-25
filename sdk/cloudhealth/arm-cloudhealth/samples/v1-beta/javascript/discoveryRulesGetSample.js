// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DiscoveryRule
 *
 * @summary get a DiscoveryRule
 * x-ms-original-file: 2025-05-01-preview/DiscoveryRules_Get.json
 */
async function discoveryRulesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.discoveryRules.get(
    "myResourceGroup",
    "myHealthModel",
    "myDiscoveryRule",
  );
  console.log(result);
}

async function main() {
  await discoveryRulesGet();
}

main().catch(console.error);
