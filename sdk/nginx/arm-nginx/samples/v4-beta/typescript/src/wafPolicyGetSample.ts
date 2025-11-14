// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NginxManagementClient } from "@azure/arm-nginx";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the Nginx Waf Policy of given Nginx deployment
 *
 * @summary Get the Nginx Waf Policy of given Nginx deployment
 * x-ms-original-file: specification/nginx/resource-manager/Nginx.NginxPlus/preview/2025-03-01-preview/examples/WafPolicy_Get.json
 */
async function wafPolicyGet(): Promise<void> {
  const subscriptionId =
    process.env["NGINX_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["NGINX_RESOURCE_GROUP"] || "myResourceGroup";
  const deploymentName = "myDeployment";
  const wafPolicyName = "myWafPolicy";
  const credential = new DefaultAzureCredential();
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.wafPolicy.get(
    resourceGroupName,
    deploymentName,
    wafPolicyName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await wafPolicyGet();
}

main().catch(console.error);
