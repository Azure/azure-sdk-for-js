// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the Nginx Waf Policy for given Nginx deployment
 *
 * @summary create or update the Nginx Waf Policy for given Nginx deployment
 * x-ms-original-file: 2025-03-01-preview/WafPolicy_Create.json
 */
async function wafPolicyCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const result = await client.wafPolicy.create("myResourceGroup", "myDeployment", "myWafPolicy");
  console.log(result);
}

async function main() {
  await wafPolicyCreate();
}

main().catch(console.error);
