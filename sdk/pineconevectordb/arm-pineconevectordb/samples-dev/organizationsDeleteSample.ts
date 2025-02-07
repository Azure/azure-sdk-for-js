// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { VectorDbClient } from "@azure/arm-pineconevectordb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a OrganizationResource
 *
 * @summary delete a OrganizationResource
 * x-ms-original-file: 2024-10-22-preview/Organizations_Delete_MaximumSet_Gen.json
 */
async function organizationsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "76a38ef6-c8c1-4f0d-bfe0-00ec782c8077";
  const client = new VectorDbClient(credential, subscriptionId);
  await client.organizations.delete("rgopenapi", "example-organization-name");
}

async function main(): Promise<void> {
  await organizationsDeleteMaximumSet();
}

main().catch(console.error);
