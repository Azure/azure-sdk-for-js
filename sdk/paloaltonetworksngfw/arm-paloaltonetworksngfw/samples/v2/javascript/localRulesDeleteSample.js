// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a LocalRulesResource
 *
 * @summary delete a LocalRulesResource
 * x-ms-original-file: 2025-10-08/LocalRules_Delete_MaximumSet_Gen.json
 */
async function localRulesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRules.delete("firewall-rg", "lrs1", "1");
}

/**
 * This sample demonstrates how to delete a LocalRulesResource
 *
 * @summary delete a LocalRulesResource
 * x-ms-original-file: 2025-10-08/LocalRules_Delete_MinimumSet_Gen.json
 */
async function localRulesDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2bf4a339-294d-4c25-b0b2-ef649e9f5c27";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.localRules.delete("firewall-rg", "lrs1", "1");
}

async function main() {
  await localRulesDeleteMaximumSetGen();
  await localRulesDeleteMinimumSetGen();
}

main().catch(console.error);
