// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the trigger on the gateway device.
 *
 * @summary deletes the trigger on the gateway device.
 * x-ms-original-file: 2023-12-01/TriggerDelete.json
 */
async function triggerDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.triggers.delete("testedgedevice", "trigger1", "GroupForEdgeAutomation");
}

async function main() {
  await triggerDelete();
}

main().catch(console.error);
