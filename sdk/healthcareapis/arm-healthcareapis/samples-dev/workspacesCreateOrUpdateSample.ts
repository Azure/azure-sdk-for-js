// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates or updates a workspace resource with the specified parameters.
 *
 * @summary Creates or updates a workspace resource with the specified parameters.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/workspaces/Workspaces_Create.json
 */

import type { Workspace } from "@azure/arm-healthcareapis";
import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAWorkspace(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const workspaceName = "workspace1";
  const workspace: Workspace = { location: "westus", properties: {} };
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    workspace,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAWorkspace();
}

main().catch(console.error);
