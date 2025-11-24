// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a IscsiPath
 *
 * @summary create a IscsiPath
 * x-ms-original-file: 2025-09-01/IscsiPaths_CreateOrUpdate.json
 */
async function iscsiPathsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.iscsiPaths.createOrUpdate("group1", "cloud1", {
    properties: { networkBlock: "192.168.0.0/24" },
  });
  console.log(result);
}

async function main() {
  await iscsiPathsCreateOrUpdate();
}

main().catch(console.error);
