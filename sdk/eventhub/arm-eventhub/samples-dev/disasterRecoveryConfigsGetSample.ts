// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 *
 * @summary Retrieves Alias(Disaster Recovery configuration) for primary or secondary namespace
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/disasterRecoveryConfigs/EHAliasGet.json
 */

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function ehAliasGet(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "exampleSubscriptionId";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "exampleResourceGroup";
  const namespaceName = "sdk-Namespace-8859";
  const alias = "sdk-DisasterRecovery-3814";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.get(
    resourceGroupName,
    namespaceName,
    alias,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ehAliasGet();
}

main().catch(console.error);
