// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a NeuroShield resource.
 *
 * @summary creates or updates a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShields_CreateOrUpdate.json
 */
async function createOrUpdateNeuroShieldResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShields.createOrUpdate(
    "myResourceGroup",
    "myNeuroShield",
    {
      location: "eastus2",
      tags: { env: "test" },
      properties: {
        responseMode: "Manual",
        severityThreshold: "Medium",
        description: "Test NeuroShield resource",
      },
    },
    { ifMatch: '"neuroshield-etag"' },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates a NeuroShield resource.
 *
 * @summary creates or updates a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShields_CreateOrUpdate_OmittedOptionalProperties.json
 */
async function createOrUpdateNeuroShieldWithOmittedOptionalProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShields.createOrUpdate(
    "myResourceGroup",
    "myNeuroShield",
    { location: "eastus2", properties: { responseMode: "Manual" } },
    { ifMatch: '"neuroshield-etag"' },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateNeuroShieldResource();
  await createOrUpdateNeuroShieldWithOmittedOptionalProperties();
}

main().catch(console.error);
