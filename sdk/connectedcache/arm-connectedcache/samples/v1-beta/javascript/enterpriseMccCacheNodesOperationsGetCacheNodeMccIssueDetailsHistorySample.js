// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedCacheClient } = require("@azure/arm-connectedcache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this api gets ispCacheNode resource issues details histrory information
 *
 * @summary this api gets ispCacheNode resource issues details histrory information
 * x-ms-original-file: 2024-11-30-preview/EnterpriseMccCacheNodesOperations_GetCacheNodeMccIssueDetailsHistory_MaximumSet_Gen.json
 */
async function enterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseMccCacheNodesOperations.getCacheNodeMccIssueDetailsHistory(
    "rgConnectedCache",
    "MccRPTest1",
    "MCCCachenode1",
  );
  console.log(result);
}

async function main() {
  await enterpriseMccCacheNodesOperationsGetCacheNodeMccIssueDetailsHistoryMaximumSet();
}

main().catch(console.error);
