// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitorworkspaces");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the trace associations that apply to the scope.
 *
 * @summary lists the trace associations that apply to the scope.
 * x-ms-original-file: 2026-09-03-preview/TraceAssociationsAtResourceGroup_List_MaximumSet_Gen.json
 */
async function traceAssociationsAtResourceGroupListMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.traceAssociationsAtResourceGroup.list(
    "rgazuremonitorworkspace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await traceAssociationsAtResourceGroupListMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
