// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusManagementClient } from "@azure/arm-servicebus";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an authorization rule for a namespace.
 *
 * @summary creates or updates an authorization rule for a namespace.
 * x-ms-original-file: 2025-05-01-preview/NameSpaces/SBNameSpaceAuthorizationRuleCreate.json
 */
async function nameSpaceAuthorizationRuleCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const result = await client.namespaces.createOrUpdateAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-6914",
    "sdk-AuthRules-1788",
    { properties: { rights: ["Listen", "Send"] } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceAuthorizationRuleCreate();
}

main().catch(console.error);
