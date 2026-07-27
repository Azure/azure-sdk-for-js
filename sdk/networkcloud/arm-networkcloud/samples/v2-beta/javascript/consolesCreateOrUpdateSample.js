// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new virtual machine console or update the properties of the existing virtual machine console.
 *
 * @summary create a new virtual machine console or update the properties of the existing virtual machine console.
 * x-ms-original-file: 2026-05-01-preview/Consoles_Create.json
 */
async function createOrUpdateVirtualMachineConsole() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.consoles.createOrUpdate(
    "resourceGroupName",
    "virtualMachineName",
    "default",
    {
      extendedLocation: {
        name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterManagerExtendedLocationName",
        type: "CustomLocation",
      },
      location: "location",
      enabled: "True",
      expiration: new Date("2022-06-01T01:27:03.008Z"),
      sshPublicKey: {
        keyData:
          "ssh-rsa AAtsE3njSONzDYRIZv/WLjVuMfrUSByHp+jfaaOLHTIIB4fJvo6dQUZxE20w2iDHV3tEkmnTo84eba97VMueQD6OzJPEyWZMRpz8UYWOd0IXeRqiFu1lawNblZhwNT/ojNZfpB3af/YDzwQCZgTcTRyNNhL4o/blKUmug0daSsSXISTRnIDpcf5qytjs1Xo+yYyJMvzLL59mhAyb3p/cD+Y3/s3WhAx+l0XOKpzXnblrv9d3q4c2tWmm/SyFqthaqd0= admin@vm",
      },
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateVirtualMachineConsole();
}

main().catch(console.error);
