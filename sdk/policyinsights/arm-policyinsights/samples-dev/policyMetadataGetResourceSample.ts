// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get policy metadata resource.
 *
 * @summary Get policy metadata resource.
 * x-ms-original-file: specification/policyinsights/resource-manager/Microsoft.PolicyInsights/stable/2024-10-01/examples/PolicyMetadata_GetResource.json
 */

import { PolicyInsightsClient } from "@azure/arm-policyinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getASinglePolicyMetadataResource(): Promise<void> {
  const resourceName = "NIST_SP_800-53_R4_AC-2";
  const credential = new DefaultAzureCredential();
  const client = new PolicyInsightsClient(credential);
  const result = await client.policyMetadataOperations.getResource(resourceName);
  console.log(result);
}

async function main(): Promise<void> {
  await getASinglePolicyMetadataResource();
}

main().catch(console.error);
