// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadsClient } = require("@azure/arm-workloadssapvirtualinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource.
 *
 * @summary lists the SAP Central Services Instance resource for the given Virtual Instance for SAP solutions resource.
 * x-ms-original-file: 2024-09-01/SapCentralServerInstances_ListBySapVirtualInstance.json
 */
async function sapCentralInstancesListBySAPVirtualInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sapCentralServerInstances.list("test-rg", "X00")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await sapCentralInstancesListBySAPVirtualInstance();
}

main().catch(console.error);
