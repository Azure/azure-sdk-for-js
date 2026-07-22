// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to posts the device capacity request info to check feasibility.
 *
 * @summary posts the device capacity request info to check feasibility.
 * x-ms-original-file: 2023-12-01/DeviceCapacityRequestPost.json
 */
async function deviceCapacityRequestPost() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  await client.deviceCapacityCheck.checkResourceCreationFeasibility(
    "GroupForEdgeAutomation",
    "testedgedevice",
    { vmPlacementQuery: [["Standard_D2_v2"]] },
  );
}

async function main() {
  await deviceCapacityRequestPost();
}

main().catch(console.error);
