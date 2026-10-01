// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of a specified job on a Data Box Edge/Data Box Gateway device.
 *
 * @summary gets the details of a specified job on a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/OperationsStatusGet.json
 */
async function operationsStatusGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.operationsStatus.get(
    "testedgedevice",
    "159a00c7-8543-4343-9435-263ac87df3bb",
    "GroupForEdgeAutomation",
  );
  console.log(result);
}

async function main() {
  await operationsStatusGet();
}

main().catch(console.error);
