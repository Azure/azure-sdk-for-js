// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a VersionedTemplate.
 *
 * @summary gets a VersionedTemplate.
 * x-ms-original-file: 2025-03-01-preview/VersionedTemplate_Get.json
 */
async function getVersionedTemplate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.versionedTemplate.get("test-template", "0.0.1");
  console.log(result);
}

async function main() {
  await getVersionedTemplate();
}

main().catch(console.error);
