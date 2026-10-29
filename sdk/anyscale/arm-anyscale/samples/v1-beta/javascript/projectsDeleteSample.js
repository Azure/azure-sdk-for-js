// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a project.
 *
 * @summary deletes a project.
 * x-ms-original-file: 2026-09-01/Projects_Delete.json
 */
async function projectsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  await client.projects.delete("rganyscale", "testcloud", "testproject");
}

async function main() {
  await projectsDelete();
}

main().catch(console.error);
