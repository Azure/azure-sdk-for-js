// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetAppManagementClient } = require("@azure/arm-netapp");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the details of a volume bucket.
 *
 * @summary updates the details of a volume bucket.
 * x-ms-original-file: 2025-09-01-preview/Buckets_Update.json
 */
async function bucketsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.buckets.update("myRG", "account1", "pool1", "volume1", "bucket1", {
    properties: {
      permissions: "ReadWrite",
      server: {
        certificateObject: "<REDACTED>",
        fqdn: "fullyqualified.domainname.com",
      },
    },
  });
  console.log(result);
}

async function main() {
  await bucketsUpdate();
}

main().catch(console.error);
