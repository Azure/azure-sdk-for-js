// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Reset the Nginx Waf Policy of given Nginx deployment to default
 *
 * @summary Reset the Nginx Waf Policy of given Nginx deployment to default
 * x-ms-original-file: specification/nginx/resource-manager/Nginx.NginxPlus/preview/2025-03-01-preview/examples/WafPolicy_Delete.json
 */
async function wafPolicyDelete() {
  const subscriptionId =
    process.env["NGINX_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NGINX_RESOURCE_GROUP"] || "myResourceGroup";
  const deploymentName = "myDeployment";
  const wafPolicyName = "myWafPolicy";
  const credential = new DefaultAzureCredential();
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.wafPolicy.beginDeleteAndWait(
    resourceGroupName,
    deploymentName,
    wafPolicyName,
  );
  console.log(result);
}

async function main() {
  await wafPolicyDelete();
}

main().catch(console.error);
