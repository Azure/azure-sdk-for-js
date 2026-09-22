// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a trigger.
 *
 * @summary creates or updates a trigger.
 * x-ms-original-file: 2023-12-01/TriggerPut.json
 */
async function triggerPut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.triggers.createOrUpdate(
    "testedgedevice",
    "trigger1",
    "GroupForEdgeAutomation",
    {
      kind: "FileEvent",
      customContextTag: "CustomContextTags-1235346475",
      sinkInfo: {
        roleId:
          "/subscriptions/4385cf00-2d3a-425a-832f-f4285b1c9dce/resourceGroups/GroupForEdgeAutomation/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/testedgedevice/roles/role1",
      },
      sourceInfo: {
        shareId:
          "/subscriptions/4385cf00-2d3a-425a-832f-f4285b1c9dce/resourceGroups/GroupForEdgeAutomation/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/testedgedevice/shares/share1",
      },
    },
  );
  console.log(result);
}

async function main() {
  await triggerPut();
}

main().catch(console.error);
