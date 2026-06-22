// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the roles configured in a Data Box Edge/Data Box Gateway device.
 *
 * @summary lists all the roles configured in a Data Box Edge/Data Box Gateway device.
 * x-ms-original-file: 2023-12-01/RoleGetAllInDevice.json
 */
async function roleGetAllInDevice() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.roles.listByDataBoxEdgeDevice(
    "testedgedevice",
    "GroupForEdgeAutomation",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await roleGetAllInDevice();
}

main().catch(console.error);
