// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a OrganizationResource
 *
 * @summary get a OrganizationResource
 * x-ms-original-file: 2024-08-01-preview/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1178323D-8270-4757-B639-D528B6266487";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.organizations.get("rgneon", "5");
  console.log(result);
}

async function main(): Promise<void> {
  organizationsGet();
}

main().catch(console.error);
