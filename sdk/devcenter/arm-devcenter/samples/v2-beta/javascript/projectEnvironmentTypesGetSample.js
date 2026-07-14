// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a project environment type.
 *
 * @summary gets a project environment type.
 * x-ms-original-file: 2026-01-01-preview/ProjectEnvironmentTypes_Get.json
 */
async function projectEnvironmentTypesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectEnvironmentTypes.get("rg1", "ContosoProj", "DevTest");
  console.log(result);
}

async function main() {
  await projectEnvironmentTypesGet();
}

main().catch(console.error);
