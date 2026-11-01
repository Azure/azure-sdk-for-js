// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to test a proposed Blob Access Point connection before the configuration is created. The connection is validated in the context of the storage account in the request path, so no Blob Access Point configuration needs to exist beforehand.
 *
 * @summary test a proposed Blob Access Point connection before the configuration is created. The connection is validated in the context of the storage account in the request path, so no Blob Access Point configuration needs to exist beforehand.
 * x-ms-original-file: 2026-09-01/BlobAccessPointConnectionTests_TestProposedConnection.json
 */
async function blobAccessPointTestProposedConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobAccessPointConnectionTests.testProposedConnection(
    "testrg",
    "teststorageaccount",
    {
      source: {
        sourceType: "S3Compatible",
        connection: {
          connectionType: "PrivateLink",
          privateLinkIdType: "ResourceId",
          privateLinkId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/testrg/providers/Microsoft.Network/privateLinkServices/testpls",
          privateLinkGroupId: "s3",
          privateLinkLocation: "eastus",
          requestMessage: "Blob Access Point connection request",
          endpoint: "https://s3.contoso.com/bucket1",
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
  );
  console.log(result);
}

async function main(): Promise<void> {
  await blobAccessPointTestProposedConnection();
}

main().catch(console.error);
