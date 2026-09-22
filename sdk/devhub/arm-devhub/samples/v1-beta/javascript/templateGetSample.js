// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeveloperHubServiceClient } = require("@azure/arm-devhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of supported templates.
 *
 * @summary gets a list of supported templates.
 * x-ms-original-file: 2025-03-01-preview/Template_Get.json
 */
async function getTemplates() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a0a37f63-7183-4e86-9ac7-ce8036a3ed31";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.template.get("test-template");
  console.log(result);
}

async function main() {
  await getTemplates();
}

main().catch(console.error);
