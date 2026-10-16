// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Blob Access Point configuration.
 *
 * @summary update a Blob Access Point configuration.
 * x-ms-original-file: 2026-09-01/BlobAccessPointConfigurations_Update.json
 */
async function updateBlobAccessPointConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobAccessPointConfigurations.update(
    "testrg",
    "teststorageaccount",
    "testaccesspointconfig",
    {
      properties: {
        state: "Inactive",
        description: "Updated NetApp ONTAP S3-compatible source",
        source: {
          sourceType: "NetAppOntap",
          auth: { authType: "AccessKey", secretAccessKey: "rotated-secret-key" },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateBlobAccessPointConfiguration();
}

main().catch(console.error);
