// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update an existing CdnWebApplicationFirewallPolicy with the specified policy name under the specified subscription and resource group
 *
 * @summary update an existing CdnWebApplicationFirewallPolicy with the specified policy name under the specified subscription and resource group
 * x-ms-original-file: 2026-09-01-preview/WafPatchPolicy.json
 */
async function wafPatchPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.policies.update("rg1", "MicrosoftCdnWafPolicy", {
    tags: { foo: "bar" },
  });
  console.log(result);
}

async function main() {
  await wafPatchPolicy();
}

main().catch(console.error);
