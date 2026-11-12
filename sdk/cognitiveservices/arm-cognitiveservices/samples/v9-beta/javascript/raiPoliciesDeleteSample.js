// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary deletes the specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-09-15-preview/DeleteRaiPolicy.json
 */
async function deleteRaiPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiPolicies.delete("resourceGroupName", "accountName", "raiPolicyName");
}

/**
 * This sample demonstrates how to deletes the specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary deletes the specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-09-15-preview/DeleteRaiPolicyAcs.json
 */
async function deleteAnACSPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  await client.raiPolicies.delete("resource-group", "safety-account", "agent-guard", {
    ifMatch: '"00000000-0000-0000-0000-000000000003"',
  });
}

async function main() {
  await deleteRaiPolicy();
  await deleteAnACSPolicy();
}

main().catch(console.error);
