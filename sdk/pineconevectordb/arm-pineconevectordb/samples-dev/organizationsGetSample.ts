// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VectorDbClient } from "@azure/arm-pineconevectordb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a OrganizationResource
 *
 * @summary get a OrganizationResource
 * x-ms-original-file: 2024-10-22-preview/Organizations_Get_MaximumSet_Gen.json
 */
async function organizationsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "76a38ef6-c8c1-4f0d-bfe0-00ec782c8077";
  const client = new VectorDbClient(credential, subscriptionId);
  const result = await client.organizations.get("rgopenapi", "example-organization-name");
  console.log(result);
}

async function main(): Promise<void> {
  await organizationsGetMaximumSet();
}

main().catch(console.error);
