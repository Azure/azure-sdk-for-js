// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Nginx Waf Policy of given Nginx deployment
 *
 * @summary get the Nginx Waf Policy of given Nginx deployment
 * x-ms-original-file: 2025-03-01-preview/DefaultWafPolicy_List.json
 */
async function defaultWafPolicyList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.defaultWafPolicy.list("myResourceGroup", "myDeployment");
  console.log(result);
}

async function main(): Promise<void> {
  await defaultWafPolicyList();
}

main().catch(console.error);
