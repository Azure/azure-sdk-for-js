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
  const subscriptionId = "61641157-140c-4b97-b365-30ff76d9f82e";
  const client = new ObservabilityEvalClient(credential, subscriptionId);
  const result = await client.organizations.update("yashika-rg-arize", "test-org-1", {
    tags: {},
    identity: { type: "None", userAssignedIdentities: {} },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsUpdateGeneratedByMaximumSetRule();
}

main().catch(console.error);
