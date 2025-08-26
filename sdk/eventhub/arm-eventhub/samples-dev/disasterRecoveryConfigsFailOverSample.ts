// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Invokes GEO DR failover and reconfigure the alias to point to the secondary namespace
 *
 * @summary Invokes GEO DR failover and reconfigure the alias to point to the secondary namespace
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/disasterRecoveryConfigs/EHAliasFailOver.json
 */

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function ehAliasFailOver(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "exampleSubscriptionId";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "exampleResourceGroup";
  const namespaceName = "sdk-Namespace-8859";
  const alias = "sdk-DisasterRecovery-3814";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.failOver(
    resourceGroupName,
    namespaceName,
    alias,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await ehAliasFailOver();
}

main().catch(console.error);
