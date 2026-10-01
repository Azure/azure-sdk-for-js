// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of authorization rules for a Namespace.
 *
 * @summary gets a list of authorization rules for a Namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceAuthorizationRuleListAll.json
 */
async function listAuthorizationRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaces.listAuthorizationRules(
    "ArunMonocle",
    "sdk-Namespace-2702",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAuthorizationRules();
}

main().catch(console.error);
