// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentPlatformClient } from "@azure/arm-koreaiartemis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get an Organization.
 *
 * @summary get an Organization.
 * x-ms-original-file: 2026-07-01-preview/Organizations_Get.json
 */
async function organizationsGet(): Promise<void> {
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
async function organizationsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const result = await client.organizations.get("contoso-rg", "contoso-org");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGet();
  await organizationsGetMaximumSetGen();
}

main().catch(console.error);
