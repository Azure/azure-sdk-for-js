// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a OrganizationResource
 *
 * @summary get a OrganizationResource
 * x-ms-original-file: 2025-06-23-preview/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.get("rgneon", "myOrganization");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetMaximumSet();
}

main().catch(console.error);
