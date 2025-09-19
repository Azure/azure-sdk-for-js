// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to detach and delete an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities.
 *
 * @summary detach and delete an existing traffic filter from your Elastic monitor resource, removing its network traffic control capabilities.
 * x-ms-original-file: 2025-06-01/DetachAndDeleteTrafficFilter_Delete.json
 */
async function detachAndDeleteTrafficFilterDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.detachAndDeleteTrafficFilter.delete("myResourceGroup", "myMonitor", {
    rulesetId: "31d91b5afb6f4c2eaaf104c97b1991dd",
  });
}

async function main() {
  await detachAndDeleteTrafficFilterDelete();
}

main().catch(console.error);
