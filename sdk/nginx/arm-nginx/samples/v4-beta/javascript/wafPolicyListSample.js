// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NginxManagementClient } = require("@azure/arm-nginx");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Waf Policies of given Nginx deployment
 *
 * @summary list Waf Policies of given Nginx deployment
 * x-ms-original-file: 2025-03-01-preview/WafPolicy_List.json
 */
async function wafPolicyList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NginxManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.wafPolicy.list("myResourceGroup", "myDeployment")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await wafPolicyList();
}

main().catch(console.error);
