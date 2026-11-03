// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a workspace resource with the specified parameters.
 *
 * @summary creates or updates a workspace resource with the specified parameters.
 * x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_Create.json
 */
async function createOrUpdateAWorkspace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("testRG", "workspace1", {
    location: "westus",
    properties: {},
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAWorkspace();
}

main().catch(console.error);
