// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Waf Policies of given Nginx deployment
 *
 * @summary list Waf Policies of given Nginx deployment
 * x-ms-original-file: 2025-03-01-preview/WafPolicy_List.json
 */
async function wafPolicyList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.wafPolicy.list("myResourceGroup", "myDeployment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await wafPolicyList();
}

main().catch(console.error);
