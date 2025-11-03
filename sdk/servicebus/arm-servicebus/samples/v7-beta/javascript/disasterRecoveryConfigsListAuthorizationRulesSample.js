// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the authorization rules for a namespace.
 *
 * @summary gets the authorization rules for a namespace.
 * x-ms-original-file: 2025-05-01-preview/disasterRecoveryConfigs/SBAliasAuthorizationRuleListAll.json
 */
async function nameSpaceAuthorizationRuleListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disasterRecoveryConfigs.listAuthorizationRules(
    "exampleResourceGroup",
    "sdk-Namespace-9080",
    "sdk-DisasterRecovery-4047",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nameSpaceAuthorizationRuleListAll();
}

main().catch(console.error);
