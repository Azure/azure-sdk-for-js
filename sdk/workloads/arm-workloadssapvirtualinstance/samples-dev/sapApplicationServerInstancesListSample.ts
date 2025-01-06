// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WorkloadsClient } from "@azure/arm-workloadssapvirtualinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource.
 *
 * @summary lists the SAP Application Server Instance resources for a given Virtual Instance for SAP solutions resource.
 * x-ms-original-file: 2024-09-01/SapApplicationServerInstances_ListBySapVirtualInstance.json
 */
async function sapApplicationServerInstancesListBySapVirtualInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6d875e77-e412-4d7d-9af4-8895278b4443";
  const client = new WorkloadsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.sAPApplicationServerInstances.list(
    "test-rg",
    "X00",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  sapApplicationServerInstancesListBySapVirtualInstance();
}

main().catch(console.error);
