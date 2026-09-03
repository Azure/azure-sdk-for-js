// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RedHatOpenShiftClient } = require("@azure/arm-redhatopenshifthcp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list HcpOpenShiftCluster resources by subscription ID
 *
 * @summary list HcpOpenShiftCluster resources by subscription ID
 * x-ms-original-file: 2026-09-01-preview/HcpOpenShiftClusters_ListBySubscription_MaximumSet_Gen.json
 */
async function hcpOpenShiftClustersListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "FDEA43EA-0230-4A7D-BDEE-F3AFF2183B1D";
  const client = new RedHatOpenShiftClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.hcpOpenShiftClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await hcpOpenShiftClustersListBySubscription();
}

main().catch(console.error);
