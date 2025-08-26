// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a privateLinkHub
 *
 * @summary Creates or updates a privateLinkHub
 * x-ms-original-file: specification/synapse/resource-manager/Microsoft.Synapse/stable/2021-06-01/examples/CreateOrUpdatePrivateLinkHub.json
 */

import type { PrivateLinkHub } from "@azure/arm-synapse";
import { SynapseManagementClient } from "@azure/arm-synapse";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAPrivateLinkHub(): Promise<void> {
  const subscriptionId =
    process.env["SYNAPSE_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SYNAPSE_RESOURCE_GROUP"] || "resourceGroup1";
  const privateLinkHubName = "privateLinkHub1";
  const privateLinkHubInfo: PrivateLinkHub = {
    location: "East US",
    tags: { key: "value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new SynapseManagementClient(credential, subscriptionId);
  const result = await client.privateLinkHubs.createOrUpdate(
    resourceGroupName,
    privateLinkHubName,
    privateLinkHubInfo,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAPrivateLinkHub();
}

main().catch(console.error);
