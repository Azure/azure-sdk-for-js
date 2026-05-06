// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new baseboard management controller key set or update the existing one for the provided cluster.
 *
 * @summary create a new baseboard management controller key set or update the existing one for the provided cluster.
 * x-ms-original-file: 2026-05-01-preview/BmcKeySets_Create.json
 */
async function createOrUpdateBaseboardManagementControllerKeySetOfCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bmcKeySets.createOrUpdate(
    "resourceGroupName",
    "clusterName",
    "bmcKeySetName",
    {
      extendedLocation: {
        name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
        type: "CustomLocation",
      },
      location: "location",
      azureGroupId: "f110271b-XXXX-4163-9b99-214d91660f0e",
      expiration: new Date("2022-12-31T23:59:59.008Z"),
      privilegeLevel: "Administrator",
      userList: [
        {
          azureUserName: "userABC",
          description: "Needs access for troubleshooting as a part of the support team",
          sshPublicKey: {
            keyData:
              "ssh-rsa AAtsE3njSONzDYRIZv/WLjVuMfrUSByHp+jfaaOLHTIIB4fJvo6dQUZxE20w2iDHV3tEkmnTo84eba97VMueQD6OzJPEyWZMRpz8UYWOd0IXeRqiFu1lawNblZhwNT/ojNZfpB3af/YDzwQCZgTcTRyNNhL4o/blKUmug0daSsSXISTRnIDpcf5qytjs1Xo+yYyJMvzLL59mhAyb3p/cD+Y3/s3WhAx+l0XOKpzXnblrv9d3q4c2tWmm/SyFqthaqd0= admin@vm",
          },
          userPrincipalName: "userABC@contoso.com",
        },
        {
          azureUserName: "userXYZ",
          description: "Needs access for troubleshooting as a part of the support team",
          sshPublicKey: {
            keyData:
              "ssh-rsa AAtsE3njSONzDYRIZv/WLjVuMfrUSByHp+jfaaOLHTIIB4fJvo6dQUZxE20w2iDHV3tEkmnTo84eba97VMueQD6OzJPEyWZMRpz8UYWOd0IXeRqiFu1lawNblZhwNT/ojNZfpB3af/YDzwQCZgTcTRyNNhL4o/blKUmug0daSsSXISTRnIDpcf5qytjs1Xo+yYyJMvzLL59mhAyb3p/cD+Y3/s3WhAx+l0XOKpzXnblrv9d3q4c2tWmm/SyFqthaqd0= admin@vm",
          },
          userPrincipalName: "userABC@contoso.com",
        },
      ],
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateBaseboardManagementControllerKeySetOfCluster();
}

main().catch(console.error);
