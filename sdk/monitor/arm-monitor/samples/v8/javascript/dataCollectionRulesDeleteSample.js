// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a data collection rule.
 *
 * @summary deletes a data collection rule.
 * x-ms-original-file: 2024-03-11/DataCollectionRulesDelete.json
 */
async function deleteDataCollectionRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "703362b3-f278-4e4b-9179-c76eaf41ffc2";
  const client = new MonitorClient(credential, subscriptionId);
  await client.dataCollectionRules.delete("myResourceGroup", "myCollectionRule");
}

async function main() {
  await deleteDataCollectionRule();
}

main().catch(console.error);
