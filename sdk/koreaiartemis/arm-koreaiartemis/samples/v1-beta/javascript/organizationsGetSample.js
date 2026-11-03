// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an Organization.
 *
 * @summary get an Organization.
 * x-ms-original-file: 2026-07-01-preview/Organizations_Get.json
 */
async function organizationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.organizations.get("contoso-rg", "contoso-org");
  console.log(result);
}

/**
 * This sample demonstrates how to get an Organization.
 *
 * @summary get an Organization.
 * x-ms-original-file: 2026-07-01-preview/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.organizations.get("contoso-rg", "contoso-org");
  console.log(result);
}

async function main() {
  await organizationsGet();
  await organizationsGetMaximumSetGen();
}

main().catch(console.error);
