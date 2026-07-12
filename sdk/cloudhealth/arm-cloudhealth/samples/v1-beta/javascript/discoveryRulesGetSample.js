// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DiscoveryRule
 *
 * @summary get a DiscoveryRule
 * x-ms-original-file: 2026-05-01-preview/DiscoveryRules_Get.json
 */
async function discoveryRulesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.discoveryRules.get(
    "online-store-rg",
    "online-store",
    "discover-web-apps",
  );
  console.log(result);
}

async function main() {
  await discoveryRulesGet();
}

main().catch(console.error);
