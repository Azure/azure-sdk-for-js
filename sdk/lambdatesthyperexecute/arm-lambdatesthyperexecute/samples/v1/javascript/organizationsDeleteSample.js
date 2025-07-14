// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HyperExecuteClient } = require("@azure/arm-lambdatesthyperexecute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a OrganizationResource
 *
 * @summary delete a OrganizationResource
 * x-ms-original-file: 2024-02-01/Organizations_Delete_MaximumSet_Gen.json
 */
async function organizationsDeleteMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "171E7A75-341B-4472-BC4C-7603C5AB9F32";
  const client = new HyperExecuteClient(credential, subscriptionId);
  await client.organizations.delete("rgopenapi", "testorg");
}

async function main() {
  await organizationsDeleteMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
