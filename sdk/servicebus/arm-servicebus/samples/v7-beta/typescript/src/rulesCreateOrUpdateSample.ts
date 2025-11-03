// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new rule and updates an existing rule
 *
 * @summary creates a new rule and updates an existing rule
 * x-ms-original-file: 2025-05-01-preview/Rules/RuleCreate.json
 */
async function rulesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.rules.createOrUpdate(
    "resourceGroupName",
    "sdk-Namespace-1319",
    "sdk-Topics-2081",
    "sdk-Subscriptions-8691",
    "sdk-Rules-6571",
    {},
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new rule and updates an existing rule
 *
 * @summary creates a new rule and updates an existing rule
 * x-ms-original-file: 2025-05-01-preview/Rules/RuleCreate_CorrelationFilter.json
 */
async function rulesCreateCorrelationFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.rules.createOrUpdate(
    "resourceGroupName",
    "sdk-Namespace-1319",
    "sdk-Topics-2081",
    "sdk-Subscriptions-8691",
    "sdk-Rules-6571",
    {
      properties: {
        correlationFilter: { properties: { topicHint: "Crop" } },
        filterType: "CorrelationFilter",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new rule and updates an existing rule
 *
 * @summary creates a new rule and updates an existing rule
 * x-ms-original-file: 2025-05-01-preview/Rules/RuleCreate_SqlFilter.json
 */
async function rulesCreateSqlFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.rules.createOrUpdate(
    "resourceGroupName",
    "sdk-Namespace-1319",
    "sdk-Topics-2081",
    "sdk-Subscriptions-8691",
    "sdk-Rules-6571",
    {
      properties: {
        filterType: "SqlFilter",
        sqlFilter: { sqlExpression: "myproperty=test" },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await rulesCreateOrUpdate();
  await rulesCreateCorrelationFilter();
  await rulesCreateSqlFilter();
}

main().catch(console.error);
