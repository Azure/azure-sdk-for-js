// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a project.
 *
 * @summary gets a project.
 * x-ms-original-file: 2026-09-01/Projects_Get.json
 */
async function projectsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.projects.get("rganyscale", "testcloud", "testproject");
  console.log(result);
}

async function main() {
  await projectsGet();
}

main().catch(console.error);
