// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an AuthorizationRule for a Namespace.
 *
 * @summary deletes an AuthorizationRule for a Namespace.
 * x-ms-original-file: 2026-01-01/NameSpaces/EHNameSpaceAuthorizationRuleDelete.json
 */
async function nameSpaceAuthorizationRuleDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.namespaces.deleteAuthorizationRule(
    "ArunMonocle",
    "sdk-Namespace-8980",
    "sdk-Authrules-8929",
  );
}

async function main(): Promise<void> {
  await nameSpaceAuthorizationRuleDelete();
}

main().catch(console.error);
