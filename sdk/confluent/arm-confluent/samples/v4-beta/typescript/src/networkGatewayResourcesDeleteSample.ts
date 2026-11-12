// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete confluent network gateway by id
 *
 * @summary delete confluent network gateway by id
 * x-ms-original-file: 2026-06-02-preview/NetworkGatewayResources_Delete_MaximumSet_Gen.json
 */
async function networkGatewayResourcesDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.networkGatewayResources.delete(
    "rgconfluent",
    "myOrganization",
    "env-abc123",
    "gw-def456",
  );
}

async function main(): Promise<void> {
  await networkGatewayResourcesDeleteMaximumSet();
}

main().catch(console.error);
