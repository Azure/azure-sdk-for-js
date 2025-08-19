// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a publisher.
 *
 * @summary Creates or updates a publisher.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/PublisherCreate.json
 */

import type { Publisher, PublishersCreateOrUpdateOptionalParams } from "@azure/arm-hybridnetwork";
import { HybridNetworkManagementClient } from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAPublisherResource(): Promise<void> {
  const subscriptionId = process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const publisherName = "TestPublisher";
  const parameters: Publisher = {
    location: "eastus",
    properties: { scope: "Public" },
  };
  const options: PublishersCreateOrUpdateOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.publishers.beginCreateOrUpdateAndWait(
    resourceGroupName,
    publisherName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAPublisherResource();
}

main().catch(console.error);
