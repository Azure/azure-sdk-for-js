// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get policy metadata resource.
 *
 * @summary get policy metadata resource.
 * x-ms-original-file: 2024-10-01/PolicyMetadata_GetResource.json
 */
async function getASinglePolicyMetadataResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyMetadataOperations.getResource("NIST_SP_800-53_R4_AC-2");
  console.log(result);
}

async function main(): Promise<void> {
  await getASinglePolicyMetadataResource();
}

main().catch(console.error);
