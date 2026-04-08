// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Credential
 *
 * @summary get a Credential
 * x-ms-original-file: 2026-03-01-preview/Get_Credentials.json
 */
async function getCredentials() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.credentials.get("rgdeviceregistry", "mynamespace");
  console.log(result);
}

async function main() {
  await getCredentials();
}

main().catch(console.error);
