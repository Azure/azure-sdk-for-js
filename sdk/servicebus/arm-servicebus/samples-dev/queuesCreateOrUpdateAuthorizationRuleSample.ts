// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates an authorization rule for a queue.
 *
 * @summary Creates an authorization rule for a queue.
 * x-ms-original-file: specification/servicebus/resource-manager/Microsoft.ServiceBus/preview/2022-10-01-preview/examples/Queues/SBQueueAuthorizationRuleCreate.json
 */

import type { SBAuthorizationRule } from "@azure/arm-servicebus";
import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function queueAuthorizationRuleCreate(): Promise<void> {
  const subscriptionId =
    process.env["SERVICEBUS_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = process.env["SERVICEBUS_RESOURCE_GROUP"] || "ArunMonocle";
  const namespaceName = "sdk-Namespace-7982";
  const queueName = "sdk-Queues-2317";
  const authorizationRuleName = "sdk-AuthRules-5800";
  const parameters: SBAuthorizationRule = { rights: ["Listen", "Send"] };
  const credential = new DefaultAzureCredential();
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.queues.createOrUpdateAuthorizationRule(
    resourceGroupName,
    namespaceName,
    queueName,
    authorizationRuleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queueAuthorizationRuleCreate();
}

main().catch(console.error);
