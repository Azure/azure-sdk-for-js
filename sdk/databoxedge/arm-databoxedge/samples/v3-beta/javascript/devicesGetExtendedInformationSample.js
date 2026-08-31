// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets additional information for the specified Azure Stack Edge/Data Box Gateway device.
 *
 * @summary gets additional information for the specified Azure Stack Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/ExtendedInfoPost.json
 */
async function extendedInfoPost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.devices.getExtendedInformation(
    "testedgedevice",
    "GroupForEdgeAutomation",
  );
  console.log(result);
}

async function main() {
  await extendedInfoPost();
}

main().catch(console.error);
