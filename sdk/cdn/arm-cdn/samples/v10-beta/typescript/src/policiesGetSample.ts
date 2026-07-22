// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve protection policy with specified name within a resource group.
 *
 * @summary retrieve protection policy with specified name within a resource group.
 * x-ms-original-file: 2025-12-01/WafPolicyGet.json
 */
async function getPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.policies.get("rg1", "MicrosoftCdnWafPolicy");
  console.log(result);
}

async function main(): Promise<void> {
  await getPolicy();
}

main().catch(console.error);
