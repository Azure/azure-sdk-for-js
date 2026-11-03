// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PaloAltoNetworksCloudngfw } = require("@azure/arm-paloaltonetworksngfw");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a PreRulesResource
 *
 * @summary delete a PreRulesResource
 * x-ms-original-file: 2026-05-11-preview/PreRules_Delete_MaximumSet_Gen.json
 */
async function preRulesDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.preRules.delete("lrs1", "1");
}

/**
 * This sample demonstrates how to delete a PreRulesResource
 *
 * @summary delete a PreRulesResource
 * x-ms-original-file: 2026-05-11-preview/PreRules_Delete_MinimumSet_Gen.json
 */
async function preRulesDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  await client.preRules.delete("lrs1", "1");
}

async function main() {
  await preRulesDeleteMaximumSetGen();
  await preRulesDeleteMinimumSetGen();
}

main().catch(console.error);
