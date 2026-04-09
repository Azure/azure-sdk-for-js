// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Credential
 *
 * @summary update a Credential
 * x-ms-original-file: 2026-03-01-preview/Update_Credentials.json
 */
async function updateCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "17C6B0DE-82CA-4A56-946C-5DD9701D30D3";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.credentials.update("rgdeviceregistry", "mynamespace", {
    tags: { key9580: "tpbwnljiiwtlyuiayalpkxyfwnrz" },
  });
  console.log(result);
}

async function main() {
  await updateCredentials();
}

main().catch(console.error);
