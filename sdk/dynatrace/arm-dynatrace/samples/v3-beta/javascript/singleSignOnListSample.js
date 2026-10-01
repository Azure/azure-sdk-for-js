// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DynatraceObservability } = require("@azure/arm-dynatrace");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all DynatraceSingleSignOnResource by monitorName
 *
 * @summary list all DynatraceSingleSignOnResource by monitorName
 * x-ms-original-file: 2024-04-24/SingleSignOn_List_MaximumSet_Gen.json
 */
async function singleSignOnListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.singleSignOn.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list all DynatraceSingleSignOnResource by monitorName
 *
 * @summary list all DynatraceSingleSignOnResource by monitorName
 * x-ms-original-file: 2024-04-24/SingleSignOn_List_MinimumSet_Gen.json
 */
async function singleSignOnListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DynatraceObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.singleSignOn.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await singleSignOnListMaximumSetGen();
  await singleSignOnListMinimumSetGen();
}

main().catch(console.error);
