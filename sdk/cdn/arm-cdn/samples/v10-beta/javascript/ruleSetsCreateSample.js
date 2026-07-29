// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or update a batch rule set within the specified profile along with the rules associate to it.
 *
 * @summary creates or update a batch rule set within the specified profile along with the rules associate to it.
 * x-ms-original-file: 2025-12-01/RuleSets_Create.json
 */
async function ruleSetsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.ruleSets.create("RG", "profile1", "ruleSet1");
  console.log(result);
}

async function main() {
  await ruleSetsCreate();
}

main().catch(console.error);
