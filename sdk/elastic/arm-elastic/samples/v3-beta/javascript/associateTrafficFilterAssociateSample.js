// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to associate a traffic filter with your Elastic monitor resource to control and manage network traffic.
 *
 * @summary associate a traffic filter with your Elastic monitor resource to control and manage network traffic.
 * x-ms-original-file: 2025-06-01/AssociateTrafficFilter_Update.json
 */
async function associateTrafficFilterAssociate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.associateTrafficFilter.associate("myResourceGroup", "myMonitor", {
    rulesetId: "31d91b5afb6f4c2eaaf104c97b1991dd",
  });
}

async function main() {
  await associateTrafficFilterAssociate();
}

main().catch(console.error);
