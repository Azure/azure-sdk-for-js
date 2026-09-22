// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets applicable inherited settings for this project.
 *
 * @summary gets applicable inherited settings for this project.
 * x-ms-original-file: 2026-01-01-preview/Projects_GetInheritedSettings.json
 */
async function projectsGetInheritedSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.getInheritedSettings("rg1", "Contoso");
  console.log(result);
}

async function main() {
  await projectsGetInheritedSettings();
}

main().catch(console.error);
