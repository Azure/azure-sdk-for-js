// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxEdgeManagementClient } = require("@azure/arm-databoxedge");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new share or updates an existing share on the device.
 *
 * @summary creates a new share or updates an existing share on the device.
 * x-ms-original-file: 2023-12-01/SharePut.json
 */
async function sharePut() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.shares.createOrUpdate(
    "testedgedevice",
    "smbshare",
    "GroupForEdgeAutomation",
    {
      description: "",
      accessProtocol: "SMB",
      azureContainerInfo: {
        containerName: "testContainerSMB",
        dataFormat: "BlockBlob",
        storageAccountCredentialId:
          "/subscriptions/4385cf00-2d3a-425a-832f-f4285b1c9dce/resourceGroups/GroupForEdgeAutomation/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/testedgedevice/storageAccountCredentials/sac1",
      },
      dataPolicy: "Cloud",
      monitoringStatus: "Enabled",
      shareStatus: "Online",
      userAccessRights: [
        {
          accessType: "Change",
          userId:
            "/subscriptions/4385cf00-2d3a-425a-832f-f4285b1c9dce/resourceGroups/GroupForEdgeAutomation/providers/Microsoft.DataBoxEdge/dataBoxEdgeDevices/testedgedevice/users/user2",
        },
      ],
    },
  );
  console.log(result);
}

async function main() {
  await sharePut();
}

main().catch(console.error);
