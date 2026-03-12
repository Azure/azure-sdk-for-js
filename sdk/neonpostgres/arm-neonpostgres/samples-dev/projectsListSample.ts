// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list Project resources by OrganizationResource
 *
 * @summary list Project resources by OrganizationResource
 * x-ms-original-file: 2025-03-01/Projects_List_MaximumSet_Gen.json
 */

import { PostgresClient } from "@azure/arm-neonpostgres";
import { DefaultAzureCredential } from "@azure/identity";

async function projectsListMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.projects.list("rgneon", "test-org")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await projectsListMaximumSet();
}

main().catch(console.error);
