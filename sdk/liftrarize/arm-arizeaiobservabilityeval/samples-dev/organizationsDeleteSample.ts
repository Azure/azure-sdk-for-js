// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityEvalClient } from "@azure/arm-arizeaiobservabilityeval";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a OrganizationResource
 *
 * @summary delete a OrganizationResource
 * x-ms-original-file: 2024-10-01/Organizations_Delete_MaximumSet_Gen.json
 */
async function organizationsDeleteGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "61641157-140c-4b97-b365-30ff76d9f82e";
  const client = new ObservabilityEvalClient(credential, subscriptionId);
  await client.organizations.delete("yashika-rg-arize", "test-org-1");
}

async function main(): Promise<void> {
  await organizationsDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
