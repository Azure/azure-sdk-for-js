// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the addons configured in the role.
 *
 * @summary lists all the addons configured in the role.
 * x-ms-original-file: 2023-12-01/RoleListAddOns.json
 */
async function roleListAddOns() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.addons.listByRole(
    "testedgedevice",
    "IoTRole1",
    "GroupForEdgeAutomation",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await roleListAddOns();
}

main().catch(console.error);
