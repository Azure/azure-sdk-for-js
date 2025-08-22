// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes an ApplicationGroup for a Namespace.
 *
 * @summary Deletes an ApplicationGroup for a Namespace.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/ApplicationGroup/ApplicationGroupDelete.json
 */

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function applicationGroupDelete(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "contosotest";
  const namespaceName = "contoso-ua-test-eh-system-1";
  const applicationGroupName = "appGroup1";
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.applicationGroupOperations.delete(
    resourceGroupName,
    namespaceName,
    applicationGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await applicationGroupDelete();
}

main().catch(console.error);
