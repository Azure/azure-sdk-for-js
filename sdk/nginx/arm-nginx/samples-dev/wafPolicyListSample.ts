// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List Waf Policies of given Nginx deployment
 *
 * @summary List Waf Policies of given Nginx deployment
 * x-ms-original-file: specification/nginx/resource-manager/Nginx.NginxPlus/preview/2025-03-01-preview/examples/WafPolicy_List.json
 */
async function wafPolicyList(): Promise<void> {
  const subscriptionId =
    process.env["NGINX_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NGINX_RESOURCE_GROUP"] || "myResourceGroup";
  const deploymentName = "myDeployment";
  const credential = new DefaultAzureCredential();
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.wafPolicy.list(
    resourceGroupName,
    deploymentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await wafPolicyList();
}

main().catch(console.error);
