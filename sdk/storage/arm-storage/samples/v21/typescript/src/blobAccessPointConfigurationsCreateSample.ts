// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a Blob Access Point configuration.
 *
 * @summary creates or updates a Blob Access Point configuration.
 * x-ms-original-file: 2026-09-01/BlobAccessPointConfigurations_Create.json
 */
async function createBlobAccessPointConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobAccessPointConfigurations.create(
    "testrg",
    "teststorageaccount",
    "testaccesspointconfig",
    {
      location: "eastus",
      properties: {
        state: "Active",
        description: "NetApp ONTAP S3-compatible source",
        source: {
          sourceType: "NetAppOntap",
          connection: {
            connectionType: "Endpoint",
            endpoint: "https://netapp.contoso.com/bucket1",
            tlsVerification: "Perform",
          },
          auth: {
            authType: "AccessKey",
            accessKeyId: "example-access-key",
            secretAccessKey: "example-secret-key",
            signingRegion: "us-east-1",
          },
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a Blob Access Point configuration.
 *
 * @summary creates or updates a Blob Access Point configuration.
 * x-ms-original-file: 2026-09-01/BlobAccessPointConfigurations_Create_AzureNetAppFilesPrivateLink.json
 */
async function createBlobAccessPointConfigurationWithAzureNetAppFilesPrivateLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobAccessPointConfigurations.create(
    "testrg",
    "teststorageaccount",
    "anfprivatelinkaccesspoint",
    {
      location: "eastus",
      properties: {
        state: "Active",
        description: "Azure NetApp Files S3-compatible source over Private Link",
        source: {
          sourceType: "AzureNetAppFiles",
          connection: {
            connectionType: "PrivateLink",
            privateLinkIdType: "ResourceId",
            privateLinkId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.Network/privateLinkServices/anfpls",
            privateLinkGroupId: "s3",
            privateLinkLocation: "eastus",
            requestMessage: "Blob Access Point connection request for Azure NetApp Files",
            endpoint: "https://anf.contoso.com/bucket1",
            tlsVerification: "Perform",
          },
          auth: {
            authType: "AccessKey",
            accessKeyId: "example-access-key",
            secretAccessKey: "example-secret-key",
            signingRegion: "us-east-1",
          },
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createBlobAccessPointConfiguration();
  await createBlobAccessPointConfigurationWithAzureNetAppFilesPrivateLink();
}

main().catch(console.error);
