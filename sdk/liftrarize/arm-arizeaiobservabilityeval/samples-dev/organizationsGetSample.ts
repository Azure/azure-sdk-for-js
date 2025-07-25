// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityEvalClient } from "@azure/arm-arizeaiobservabilityeval";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a OrganizationResource
 *
 * @summary get a OrganizationResource
 * x-ms-original-file: 2024-10-01/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGetGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "61641157-140c-4b97-b365-30ff76d9f82e";
  const client = new ObservabilityEvalClient(credential, subscriptionId);
  const result = await client.organizations.get("yashika-rg-arize", "test-org-1");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
