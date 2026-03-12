// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Regenerates the primary or secondary connection strings for the specified Namespace.
 *
 * @summary Regenerates the primary or secondary connection strings for the specified Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/stable/2017-04-01/examples/NameSpaces/EHNameSpaceAuthorizationRuleRegenerateKey.json
 */

import type { RegenerateAccessKeyParameters } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nameSpaceAuthorizationRuleRegenerateKey(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const resourceGroupName = process.env["EVENTHUB_RESOURCE_GROUP"] || "ArunMonocle";
  const namespaceName = "sdk-Namespace-8980";
  const authorizationRuleName = "sdk-Authrules-8929";
  const parameters: RegenerateAccessKeyParameters = { keyType: "PrimaryKey" };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.regenerateKeys(
    resourceGroupName,
    namespaceName,
    authorizationRuleName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceAuthorizationRuleRegenerateKey();
}

main().catch(console.error);
