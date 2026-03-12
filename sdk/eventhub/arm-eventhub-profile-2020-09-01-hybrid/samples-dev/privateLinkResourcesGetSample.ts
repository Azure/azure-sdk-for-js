// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets lists of resources that supports Privatelinks.
 *
 * @summary Gets lists of resources that supports Privatelinks.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2018-01-01-preview/examples/NameSpaces/PrivateLinkResourcesGet.json
 */

import { EventHubManagementClient } from "@azure/arm-eventhub-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function nameSpacePrivateLinkResourcesGet(): Promise<void> {
  const subscriptionId = process.env["EVENTHUB_SUBSCRIPTION_ID"] || "subID";
  const resourceGroupName = process.env["EVENTHUB_RESOURCE_GROUP"] || "ArunMonocle";
  const namespaceName = "sdk-Namespace-2924";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(resourceGroupName, namespaceName);
  console.log(result);
}

async function main(): Promise<void> {
  await nameSpacePrivateLinkResourcesGet();
}

main().catch(console.error);
