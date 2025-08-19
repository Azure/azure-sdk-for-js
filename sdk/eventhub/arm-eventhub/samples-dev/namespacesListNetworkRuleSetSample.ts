// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets NetworkRuleSet for a Namespace.
 *
 * @summary Gets NetworkRuleSet for a Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/NameSpaces/VirtualNetworkRule/EHNetworkRuleSetList.json
 */

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nameSpaceNetworkRuleSetList(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "Subscription";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "ResourceGroup";
  const namespaceName = "sdk-Namespace-6019";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.namespaces.listNetworkRuleSet(
    resourceGroupName,
    namespaceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpaceNetworkRuleSetList();
}

main().catch(console.error);
