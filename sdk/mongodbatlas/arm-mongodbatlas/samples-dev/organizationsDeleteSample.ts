// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a OrganizationResource
 *
 * @summary delete a OrganizationResource
 * x-ms-original-file: 2025-06-01/Organizations_Delete_MaximumSet_Gen.json
 */

import { AtlasClient } from "@azure/arm-mongodbatlas";
import { DefaultAzureCredential } from "@azure/identity";

async function organizationsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4AFC1287-D389-4265-B2D4-59B96A45CACC";
  const client = new AtlasClient(credential, subscriptionId);
  await client.organizations.delete("rgopenapi", "U.1-:7");
}

async function main(): Promise<void> {
  await organizationsDeleteMaximumSet();
}

main().catch(console.error);
