// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkSecurityManagementClient } from "@azure/arm-networksecurity";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the tags or properties of a NeuroShield resource.
 *
 * @summary updates the tags or properties of a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShields_Update.json
 */
async function updateNeuroShieldResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShields.update(
    "myResourceGroup",
    "myNeuroShield",
    {
      tags: {
        env: "production",
      },
      properties: {
        responseMode: "Auto",
        severityThreshold: "High",
        description: "Updated NeuroShield resource",
      },
    },
    { ifMatch: '"neuroshield-etag"' },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates the tags or properties of a NeuroShield resource.
 *
 * @summary updates the tags or properties of a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShields_Update_OmittedProperties.json
 */
async function updateTagsWhilePreservingOmittedPatchProperties(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShields.update(
    "myResourceGroup",
    "myNeuroShield",
    { tags: {} },
    { ifMatch: '"neuroshield-etag"' },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateNeuroShieldResource();
  await updateTagsWhilePreservingOmittedPatchProperties();
}

main().catch(console.error);
