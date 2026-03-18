// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get Environment details by environment Id
 *
 * @summary get Environment details by environment Id
 * x-ms-original-file: 2025-08-18-preview/Organization_GetEnvironmentById_MaximumSet_Gen.json
 */
async function organizationGetEnvironmentByIdMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.getEnvironmentById("rgconfluent", "p", "kvifvjnmbilj");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationGetEnvironmentByIdMaximumSet();
}

main().catch(console.error);
