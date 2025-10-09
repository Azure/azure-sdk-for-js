// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update the Nginx Waf Policy for given Nginx deployment
 *
 * @summary create or update the Nginx Waf Policy for given Nginx deployment
 * x-ms-original-file: 2025-03-01-preview/WafPolicy_Create.json
 */
async function wafPolicyCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.wafPolicy.create("myResourceGroup", "myDeployment", "myWafPolicy");
  console.log(result);
}

async function main(): Promise<void> {
  await wafPolicyCreate();
}

main().catch(console.error);
