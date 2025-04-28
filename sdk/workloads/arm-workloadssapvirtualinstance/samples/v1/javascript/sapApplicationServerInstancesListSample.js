// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource.
 *
 * @summary lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_ListBySapVirtualInstance.json
 */
async function sapApplicationServerInstancesListBySAPVirtualInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sapApplicationServerInstances.list("test-rg", "X00")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await sapApplicationServerInstancesListBySAPVirtualInstance();
}

main().catch(console.error);
