// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers support package on the device
 *
 * @summary triggers support package on the device
 * x-ms-original-file: 2023-12-01/TriggerSupportPackage.json
 */
async function triggerSupportPackage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.supportPackages.triggerSupportPackage("testedgedevice", "GroupForEdgeAutomation", {
    include: "DefaultWithDumps",
    maximumTimeStamp: new Date("2018-12-18T02:19:51.4270267Z"),
    minimumTimeStamp: new Date("2018-12-18T02:18:51.4270267Z"),
  });
}

async function main() {
  await triggerSupportPackage();
}

main().catch(console.error);
