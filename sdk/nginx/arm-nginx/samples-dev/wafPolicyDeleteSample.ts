// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reset the Nginx Waf Policy of given Nginx deployment to default
 *
 * @summary reset the Nginx Waf Policy of given Nginx deployment to default
 * x-ms-original-file: 2025-03-01-preview/WafPolicy_Delete.json
 */
async function wafPolicyDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  await client.wafPolicy.delete("myResourceGroup", "myDeployment", "myWafPolicy");
}

async function main(): Promise<void> {
  await wafPolicyDelete();
}

main().catch(console.error);
