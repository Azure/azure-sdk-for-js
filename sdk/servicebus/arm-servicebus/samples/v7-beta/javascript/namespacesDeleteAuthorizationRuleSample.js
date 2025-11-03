// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a namespace authorization rule.
 *
 * @summary deletes a namespace authorization rule.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceAuthorizationRuleDelete.json
 */
async function nameSpaceAuthorizationRuleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  await client.namespaces.deleteAuthorizationRule(
    "ArunMonocle",
    "sdk-namespace-6914",
    "sdk-AuthRules-1788",
  );
}

async function main() {
  await nameSpaceAuthorizationRuleDelete();
}

main().catch(console.error);
