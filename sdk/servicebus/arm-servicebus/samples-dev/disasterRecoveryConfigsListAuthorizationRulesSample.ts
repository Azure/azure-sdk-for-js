// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the authorization rules for a namespace.
 *
 * @summary Gets the authorization rules for a namespace.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/preview/2022-10-01-preview/examples/disasterRecoveryConfigs/SBAliasAuthorizationRuleListAll.json
 */

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nameSpaceAuthorizationRuleListAll(): Promise<void> {
  const subscriptionId = process.env["SERVICEBUS_SUBSCRIPTION_ID"] || "exampleSubscriptionId";
  const resourceGroupName = process.env["SERVICEBUS_RESOURCE_GROUP"] || "exampleResourceGroup";
  const namespaceName = "sdk-Namespace-9080";
  const alias = "sdk-DisasterRecovery-4047";
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.disasterRecoveryConfigs.listAuthorizationRules(
    resourceGroupName,
    namespaceName,
    alias,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await nameSpaceAuthorizationRuleListAll();
}

main().catch(console.error);
