// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AppConfigurationManagementClient } = require("@azure/arm-appconfiguration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a snapshot. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead.
 *
 * @summary creates a snapshot. NOTE: This operation is intended for use in ARM Template deployments. For all other scenarios involving App Configuration snapshots the data plane API should be used instead.
 * x-ms-original-file: 2025-06-01-preview/ConfigurationStoresCreateSnapshot.json
 */
async function snapshotsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c80fb759-c965-4c6a-9110-9b2b2d038882";
  const client = new AppConfigurationManagementClient(credential, subscriptionId);
  const result = await client.snapshots.create("myResourceGroup", "contoso", "mySnapshot", {
    filters: [{ key: "app1/*", label: "Production" }],
    retentionPeriod: 3600,
  });
  console.log(result);
}

async function main() {
  await snapshotsCreate();
}

main().catch(console.error);
