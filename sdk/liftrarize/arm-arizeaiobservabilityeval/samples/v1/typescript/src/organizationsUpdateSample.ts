// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityEvalClient } from "@azure/arm-arizeaiobservabilityeval";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a OrganizationResource
 *
 * @summary update a OrganizationResource
 * x-ms-original-file: 2024-10-01/Organizations_Update_MaximumSet_Gen.json
 */
async function organizationsUpdateGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4DEBE8B4-8BA4-42F8-AE50-FBEF318751D1";
  const client = new ObservabilityEvalClient(credential, subscriptionId);
  const result = await client.organizations.update("rgopenapi", "test-organization-1", {
    tags: {},
    identity: { type: "None", userAssignedIdentities: {} },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
