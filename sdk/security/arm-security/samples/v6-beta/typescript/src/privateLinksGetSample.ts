// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a private link resource. Returns the configuration and status of private endpoint connectivity for Microsoft Defender for Cloud services in the specified region.
 *
 * @summary get a private link resource. Returns the configuration and status of private endpoint connectivity for Microsoft Defender for Cloud services in the specified region.
 * x-ms-original-file: 2026-01-01/PrivateLinks/PrivateLinks_Get.json
 */
async function getPrivateLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.privateLinks.get("rg", "spl");
  console.log(result);
}

async function main(): Promise<void> {
  await getPrivateLink();
}

main().catch(console.error);
