// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates part of a data collection rule.
 *
 * @summary updates part of a data collection rule.
 * x-ms-original-file: 2024-03-11/DataCollectionRulesUpdate.json
 */
async function updateDataCollectionRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionRules.update("myResourceGroup", "myCollectionRule", {
    body: { tags: { tag1: "A", tag2: "B", tag3: "C" } },
  });
  console.log(result);
}

async function main() {
  await updateDataCollectionRule();
}

main().catch(console.error);
