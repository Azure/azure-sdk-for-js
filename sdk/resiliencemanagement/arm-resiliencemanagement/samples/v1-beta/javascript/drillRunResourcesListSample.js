// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureResilienceManagementClient } = require("@azure/arm-resiliencemanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DrillRunResource resources by DrillRun
 *
 * @summary list DrillRunResource resources by DrillRun
 * x-ms-original-file: 2026-04-01-preview/DrillRunResources_List_MaximumSet_Gen.json
 */
async function drillRunResourcesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const client = new AzureResilienceManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.drillRunResources.list(
    "sampleServiceGroupName",
    "drill1",
    "ca92602e-53bf-43d2-ae62-d3fc940474b3",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await drillRunResourcesListMaximumSet();
}

main().catch(console.error);
