// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes API key of a kafka or schema registry cluster
 *
 * @summary deletes API key of a kafka or schema registry cluster
 * x-ms-original-file: 2025-08-18-preview/Organization_DeleteClusterAPIKey_MaximumSet_Gen.json
 */
async function organizationDeleteClusterAPIKeyMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.organization.deleteClusterAPIKey("rgconfluent", "y", "guahwdpdvzealjrnpgiqumxtbqq");
}

/**
 * This sample demonstrates how to deletes API key of a kafka or schema registry cluster
 *
 * @summary deletes API key of a kafka or schema registry cluster
 * x-ms-original-file: 2025-08-18-preview/Organization_DeleteClusterAPIKey_MinimumSet_Gen.json
 */
async function organizationDeleteClusterAPIKeyMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.organization.deleteClusterAPIKey(
    "rgconfluent",
    "lokrfxecjwbnejqluwbwqcairu",
    "lqyopqadqide",
  );
}

async function main(): Promise<void> {
  await organizationDeleteClusterAPIKeyMaximumSet();
  await organizationDeleteClusterAPIKeyMinimumSet();
}

main().catch(console.error);
