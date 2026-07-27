// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific trigger by name.
 *
 * @summary get a specific trigger by name.
 * x-ms-original-file: 2023-12-01/TriggerGet.json
 */
async function triggerGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.triggers.get("testedgedevice", "trigger1", "GroupForEdgeAutomation");
  console.log(result);
}

async function main() {
  await triggerGet();
}

main().catch(console.error);
