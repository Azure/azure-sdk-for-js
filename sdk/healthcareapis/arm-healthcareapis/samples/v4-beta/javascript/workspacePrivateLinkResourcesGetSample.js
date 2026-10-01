// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a private link resource that need to be created for a workspace.
 *
 * @summary gets a private link resource that need to be created for a workspace.
 * x-ms-original-file: 2025-04-01-preview/privatelink/WorkspacePrivateLinkResourceGet.json
 */
async function workspacePrivateLinkResourcesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const result = await client.workspacePrivateLinkResources.get(
    "testRG",
    "workspace1",
    "healthcareworkspace",
  );
  console.log(result);
}

async function main() {
  await workspacePrivateLinkResourcesGet();
}

main().catch(console.error);
