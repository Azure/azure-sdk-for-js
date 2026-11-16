// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkSecurityManagementClient } = require("@azure/arm-networksecurity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the tags or properties of a NeuroShield resource.
 *
 * @summary updates the tags or properties of a NeuroShield resource.
 * x-ms-original-file: 2026-10-01-preview/NeuroShields_Update.json
 */
async function updateNeuroShieldResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkSecurityManagementClient(credential, subscriptionId);
  const result = await client.neuroShields.update(
    "myResourceGroup",
    "myNeuroShield",
    {
      tags: {
        additionalProperties: {
          env: "production",
        },
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
async function updateTagsWhilePreservingOmittedPatchProperties() {
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

async function main() {
  await updateNeuroShieldResource();
  await updateTagsWhilePreservingOmittedPatchProperties();
}

main().catch(console.error);
