// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DiscoveryRule
 *
 * @summary delete a DiscoveryRule
 * x-ms-original-file: 2026-05-01-preview/DiscoveryRules_Delete.json
 */
async function discoveryRulesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.discoveryRules.delete("online-store-rg", "online-store", "discover-web-apps");
}

async function main() {
  await discoveryRulesDelete();
}

main().catch(console.error);
