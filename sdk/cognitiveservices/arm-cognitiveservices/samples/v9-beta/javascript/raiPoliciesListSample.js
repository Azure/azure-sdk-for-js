// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the content filters associated with the Azure OpenAI account.
 *
 * @summary gets the content filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-11-15-preview/ListRaiPolicies.json
 */
async function listRaiPolicies() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiPolicies.list("resourceGroupName", "accountName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets the content filters associated with the Azure OpenAI account.
 *
 * @summary gets the content filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-11-15-preview/ListRaiPoliciesAcsWithAnnotationsAndEgress.json
 */
async function listACSPoliciesWithOptionalAnnotationsAndEgressCompanions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiPolicies.list("resource-group", "safety-account")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRaiPolicies();
  await listACSPoliciesWithOptionalAnnotationsAndEgressCompanions();
}

main().catch(console.error);
