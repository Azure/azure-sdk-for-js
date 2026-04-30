// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedCacheClient } = require("@azure/arm-connectedcache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this api gets secrets of the ispCacheNode resource install details
 *
 * @summary this api gets secrets of the ispCacheNode resource install details
 * x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_GetCacheNodeInstallDetails_MaximumSet_Gen.json
 */
async function getsRequiredPropertiesForEnterpriseMccCacheNodeResourceInstallKeyDetailsGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseMccCacheNodesOperations.getCacheNodeInstallDetails(
    "rgConnectedCache",
    "fzwxcjmdpxxzayecabqqlh",
    "ccexmqqttritxvtctivraso",
  );
  console.log(result);
}

async function main() {
  await getsRequiredPropertiesForEnterpriseMccCacheNodeResourceInstallKeyDetailsGeneratedByMaximumSetRule();
}

main().catch(console.error);
