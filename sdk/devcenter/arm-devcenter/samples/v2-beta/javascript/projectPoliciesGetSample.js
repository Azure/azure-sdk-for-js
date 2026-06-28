// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a specific project policy.
 *
 * @summary gets a specific project policy.
 * x-ms-original-file: 2026-01-01-preview/ProjectPolicies_Get.json
 */
async function projectPoliciesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58ffff1";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.projectPolicies.get("rg1", "Contoso", "DevOnlyResources");
  console.log(result);
}

async function main() {
  await projectPoliciesGet();
}

main().catch(console.error);
