// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a specific project.
 *
 * @summary gets a specific project.
 * x-ms-original-file: 2026-01-01-preview/Projects_Get.json
 */
async function projectsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projects.get("rg1", "DevProject");
  console.log(result);
}

async function main() {
  await projectsGet();
}

main().catch(console.error);
