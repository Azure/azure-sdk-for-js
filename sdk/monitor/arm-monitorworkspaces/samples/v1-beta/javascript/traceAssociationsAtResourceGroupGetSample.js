// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the trace association at the scope.
 *
 * @summary gets the trace association at the scope.
 * x-ms-original-file: 2026-09-03-preview/TraceAssociationsAtResourceGroup_Get_MaximumSet_Gen.json
 */
async function traceAssociationsAtResourceGroupGetMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.traceAssociationsAtResourceGroup.get("rgazuremonitorworkspace");
  console.log(result);
}

async function main() {
  await traceAssociationsAtResourceGroupGetMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
