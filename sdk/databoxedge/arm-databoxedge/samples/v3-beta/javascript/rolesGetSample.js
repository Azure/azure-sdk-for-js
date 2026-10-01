// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a specific role by name.
 *
 * @summary gets a specific role by name.
 * x-ms-original-file: 2023-12-01/RoleGet.json
 */
async function roleGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.roles.get("testedgedevice", "IoTRole1", "GroupForEdgeAutomation");
  console.log(result);
}

async function main() {
  await roleGet();
}

main().catch(console.error);
