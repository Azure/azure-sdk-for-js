// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing delivery rule within a rule set.
 *
 * @summary deletes an existing delivery rule within a rule set.
 * x-ms-original-file: 2025-12-01/Rules_Delete.json
 */
async function rulesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  await client.rules.delete("RG", "profile1", "ruleSet1", "rule1");
}

async function main() {
  await rulesDelete();
}

main().catch(console.error);
