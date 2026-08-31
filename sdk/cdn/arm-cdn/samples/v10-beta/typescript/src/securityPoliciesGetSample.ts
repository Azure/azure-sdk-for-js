// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an existing security policy within a profile.
 *
 * @summary gets an existing security policy within a profile.
 * x-ms-original-file: 2025-12-01/SecurityPolicies_Get.json
 */
async function securityPoliciesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.securityPolicies.get("RG", "profile1", "securityPolicy1");
  console.log(result);
}

async function main(): Promise<void> {
  await securityPoliciesGet();
}

main().catch(console.error);
