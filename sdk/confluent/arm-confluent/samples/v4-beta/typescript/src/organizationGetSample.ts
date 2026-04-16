// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a specific Organization resource.
 *
 * @summary get the properties of a specific Organization resource.
 * x-ms-original-file: 2025-08-18-preview/Organization_Get_MaximumSet_Gen.json
 */
async function organizationGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.get("rgconfluent", "nnyqgkogkmwjubhfaynme");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationGetMaximumSet();
}

main().catch(console.error);
