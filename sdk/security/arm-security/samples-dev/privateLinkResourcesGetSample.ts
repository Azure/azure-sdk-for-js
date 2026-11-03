// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified private link resource associated with the private link.
 *
 * @summary get the specified private link resource associated with the private link.
 * x-ms-original-file: 2026-01-01/PrivateLinkResources/PrivateLinkResources_Get.json
 */
async function getPrivateLinkResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.privateLinkResources.get("rg", "pls", "containers");
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateLinkResource();
}

main().catch(console.error);
