// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HDInsightManagementClient } = require("@azure/arm-hdinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the async operation status.
 *
 * @summary gets the async operation status.
 * x-ms-original-file: 2025-01-15-preview/GetRestartHostsAsyncOperationStatus.json
 */
async function getsTheAsyncOperationStatusOfRestartingHost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HDInsightManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.getAsyncOperationStatus(
    "rg1",
    "cluster1",
    "CF938302-6B4D-44A0-A6D2-C0D67E847AEC",
  );
  console.log(result);
}

async function main() {
  await getsTheAsyncOperationStatusOfRestartingHost();
}

main().catch(console.error);
