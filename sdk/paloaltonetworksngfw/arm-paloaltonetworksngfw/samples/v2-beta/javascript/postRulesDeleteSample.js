// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a PostRulesResource
 *
 * @summary delete a PostRulesResource
 * x-ms-original-file: 2025-10-08/PostRules_Delete_MaximumSet_Gen.json
 */
async function postRulesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.postRules.delete("lrs1", "1");
}

/**
 * This sample demonstrates how to delete a PostRulesResource
 *
 * @summary delete a PostRulesResource
 * x-ms-original-file: 2025-10-08/PostRules_Delete_MinimumSet_Gen.json
 */
async function postRulesDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new PaloAltoNetworksCloudngfw(credential, subscriptionId);
  await client.postRules.delete("lrs1", "1");
}

async function main() {
  await postRulesDeleteMaximumSetGen();
  await postRulesDeleteMinimumSetGen();
}

main().catch(console.error);
