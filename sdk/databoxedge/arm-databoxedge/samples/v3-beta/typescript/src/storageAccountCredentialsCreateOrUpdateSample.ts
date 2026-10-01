// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the storage account credential.
 *
 * @summary creates or updates the storage account credential.
 * x-ms-original-file: 2023-12-01/SACPut.json
 */
async function sacPut(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.storageAccountCredentials.createOrUpdate(
    "testedgedevice",
    "sac1",
    "GroupForEdgeAutomation",
    {
      accountKey: {
        encryptionAlgorithm: "AES256",
        encryptionCertThumbprint: "2A9D8D6BE51574B5461230AEF02F162C5F01AD31",
        value:
          "lAeZEYi6rNP1/EyNaVUYmTSZEYyaIaWmwUsGwek0+xiZj54GM9Ue9/UA2ed/ClC03wuSit2XzM/cLRU5eYiFBwks23rGwiQOr3sruEL2a74EjPD050xYjA6M1I2hu/w2yjVHhn5j+DbXS4Xzi+rHHNZK3DgfDO3PkbECjPck+PbpSBjy9+6Mrjcld5DIZhUAeMlMHrFlg+WKRKB14o/og56u5/xX6WKlrMLEQ+y6E18dUwvWs2elTNoVO8PBE8SM/CfooX4AMNvaNdSObNBPdP+F6Lzc556nFNWXrBLRt0vC7s9qTiVRO4x/qCNaK/B4y7IqXMllwQFf4Np9UQ2ECA==",
      },
      accountType: "BlobStorage",
      alias: "sac1",
      sslStatus: "Disabled",
      userName: "cisbvt",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sacPut();
}

main().catch(console.error);
