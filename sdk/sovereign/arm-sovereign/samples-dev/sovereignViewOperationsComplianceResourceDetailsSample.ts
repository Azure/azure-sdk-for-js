// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SovereignClient } from "@azure/arm-sovereign";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the compliance reasoning for given resource and dimension, including the reasoning for its linked and replica resources.
 *
 * @summary gets the compliance reasoning for given resource and dimension, including the reasoning for its linked and replica resources.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ComplianceResourceDetails.json
 */
async function sovereignViewOperationsComplianceResourceDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.sovereignViewOperations.complianceResourceDetails(
    "ExampleResourceGroup",
    "ExampleSV",
    {
      resourceId:
        "/subscriptions/22b62f96-c8d5-4131-97f8-f820a5a3c55f/resourceGroups/ExampleResourceGroup/providers/Microsoft.Storage/storageAccounts/examplestorage",
      dimension: "DataResidency",
      evaluatedAt: new Date("2026-10-15T10:00:00Z"),
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the compliance reasoning for given resource and dimension, including the reasoning for its linked and replica resources.
 *
 * @summary gets the compliance reasoning for given resource and dimension, including the reasoning for its linked and replica resources.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_ComplianceResourceDetails_BusinessContinuity.json
 */
async function sovereignViewOperationsComplianceResourceDetailsBusinessContinuity(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.sovereignViewOperations.complianceResourceDetails(
    "ExampleResourceGroup",
    "ExampleSV",
    {
      resourceId:
        "/subscriptions/22b62f96-c8d5-4131-97f8-f820a5a3c55f/resourceGroups/ExampleResourceGroup/providers/Microsoft.Sql/servers/exampleserver/databases/exampledatabase",
      dimension: "BusinessContinuity",
      evaluatedAt: new Date("2026-10-15T10:00:00Z"),
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await sovereignViewOperationsComplianceResourceDetails();
  await sovereignViewOperationsComplianceResourceDetailsBusinessContinuity();
}

main().catch(console.error);
