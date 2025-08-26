// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Check the give Namespace name availability.
 *
 * @summary Check the give Namespace name availability.
 * x-ms-original-file: specification/eventhub/resource-manager/Microsoft.EventHub/preview/2024-05-01-preview/examples/disasterRecoveryConfigs/EHAliasCheckNameAvailability.json
 */

import {
  CheckNameAvailabilityParameter,
  EventHubManagementClient,
} from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function namespacesCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["EVENTHUB_SUBSCRIPTION_ID"] || "exampleSubscriptionId";
  const resourceGroupName =
    process.env["EVENTHUB_RESOURCE_GROUP"] || "exampleResourceGroup";
  const namespaceName = "sdk-Namespace-9080";
  const parameters: CheckNameAvailabilityParameter = {
    name: "sdk-DisasterRecovery-9474",
  };
  const credential = new DefaultAzureCredential();
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.disasterRecoveryConfigs.checkNameAvailability(
    resourceGroupName,
    namespaceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await namespacesCheckNameAvailability();
}

main().catch(console.error);
