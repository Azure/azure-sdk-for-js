// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets a private link resource that need to be created for a workspace.
 *
 * @summary Gets a private link resource that need to be created for a workspace.
 * x-ms-original-file: specification/healthcareapis/resource-manager/Microsoft.HealthcareApis/stable/2024-03-31/examples/privatelink/WorkspacePrivateLinkResourceGet.json
 */

import { HealthcareApisManagementClient } from "@azure/arm-healthcareapis";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function workspacePrivateLinkResourcesGet(): Promise<void> {
  const subscriptionId = process.env["HEALTHCAREAPIS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HEALTHCAREAPIS_RESOURCE_GROUP"] || "testRG";
  const workspaceName = "workspace1";
  const groupName = "healthcareworkspace";
  const credential = new DefaultAzureCredential();
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspacePrivateLinkResources.get(
    resourceGroupName,
    workspaceName,
    groupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await workspacePrivateLinkResourcesGet();
}

main().catch(console.error);
