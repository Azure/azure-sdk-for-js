// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageAccountCredential } from "@azure/arm-databoxedge-profile-2020-09-01-hybrid";
import { DataBoxEdgeManagementClient } from "@azure/arm-databoxedge-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates the storage account credential.
 *
 * @summary Creates or updates the storage account credential.
 * x-ms-original-file: specification/databoxedge/resource-manager/Microsoft.DataBoxEdge/stable/2019-08-01/examples/SACPut.json
 */
async function sacPut(): Promise<void> {
  const subscriptionId =
    process.env["DATABOXEDGE_SUBSCRIPTION_ID"] || "4385cf00-2d3a-425a-832f-f4285b1c9dce";
  const deviceName = "testedgedevice";
  const name = "sac1";
  const resourceGroupName = process.env["DATABOXEDGE_RESOURCE_GROUP"] || "GroupForEdgeAutomation";
  const storageAccountCredential: StorageAccountCredential = {
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
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxEdgeManagementClient(credential, subscriptionId);
  const result = await client.storageAccountCredentials.beginCreateOrUpdateAndWait(
    deviceName,
    name,
    resourceGroupName,
    storageAccountCredential,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sacPut();
}

main().catch(console.error);
