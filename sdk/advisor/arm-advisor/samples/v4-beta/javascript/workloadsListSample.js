// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get list of Workloads.
 *
 * @summary get list of Workloads.
 * x-ms-original-file: 2026-02-01-preview/ListWorkloads.json
 */
async function getWorkloads() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workloads.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getWorkloads();
}

main().catch(console.error);
