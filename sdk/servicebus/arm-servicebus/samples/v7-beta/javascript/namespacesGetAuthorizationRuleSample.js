// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an authorization rule for a namespace by rule name.
 *
 * @summary gets an authorization rule for a namespace by rule name.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceAuthorizationRuleGet.json
 */
async function nameSpaceAuthorizationRuleGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.getAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-6914",
    "sdk-AuthRules-1788",
  );
  console.log(result);
}

async function main() {
  await nameSpaceAuthorizationRuleGet();
}

main().catch(console.error);
