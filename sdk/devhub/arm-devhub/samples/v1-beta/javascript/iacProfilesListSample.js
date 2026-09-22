// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of IacProfiles associated with the specified subscription.
 *
 * @summary gets a list of IacProfiles associated with the specified subscription.
 * x-ms-original-file: 2025-03-01-preview/IacProfile_List.json
 */
async function listIacProfiles() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.iacProfiles.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listIacProfiles();
}

main().catch(console.error);
