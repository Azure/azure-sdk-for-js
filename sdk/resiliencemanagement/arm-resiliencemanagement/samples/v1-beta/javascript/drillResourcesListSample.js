// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DrillResource resources by Drill
 *
 * @summary list DrillResource resources by Drill
 * x-ms-original-file: 2026-04-01-preview/DrillResources_List_MaximumSet_Gen.json
 */
async function drillResourcesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.drillResources.list("sampleServiceGroupName", "drill1", {
    skipToken: "xntbyoswztnmvitj",
    top: 69,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await drillResourcesListMaximumSet();
}

main().catch(console.error);
