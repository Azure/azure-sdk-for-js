// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the user on a databox edge/gateway device.
 *
 * @summary deletes the user on a databox edge/gateway device.
 * x-ms-original-file: 2023-12-01/UserDelete.json
 */
async function userDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.users.delete("testedgedevice", "user1", "GroupForEdgeAutomation");
}

async function main() {
  await userDelete();
}

main().catch(console.error);
