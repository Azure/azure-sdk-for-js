// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DisconnectedOperationsManagementClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get artifact download link.
 *
 * @summary get artifact download link.
 * x-ms-original-file: 2025-06-01-preview/Artifact_ListDownloadUri_MaximumSet_Gen.json
 */
async function artifactsListDownloadUri() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "301DCB09-82EC-4777-A56C-6FFF26BCC814";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const result = await client.artifacts.listDownloadUri(
    "rgdisconnectedoperations",
    "L4z_-S",
    "B-Ra--W0",
    "artifact1",
  );
  console.log(result);
}

async function main() {
  await artifactsListDownloadUri();
}

main().catch(console.error);
