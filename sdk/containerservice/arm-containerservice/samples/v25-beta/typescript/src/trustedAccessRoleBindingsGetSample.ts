// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a trusted access role binding.
 *
 * @summary get a trusted access role binding.
 * x-ms-original-file: 2025-10-02-preview/TrustedAccessRoleBindings_Get.json
 */
async function getATrustedAccessRoleBinding(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.trustedAccessRoleBindings.get("rg1", "clustername1", "binding1");
  console.log(result);
}

async function main(): Promise<void> {
  await getATrustedAccessRoleBinding();
}

main().catch(console.error);
