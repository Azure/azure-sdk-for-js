// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AgentPlatformClient } from "@azure/arm-koreaiartemis";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list Workspaces under an Organization.
 *
 * @summary list Workspaces under an Organization.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_ListByOrganization.json
 */
async function workspacesListByOrganization(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByOrganization("contoso-rg", "contoso-org")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Workspaces under an Organization.
 *
 * @summary list Workspaces under an Organization.
 * x-ms-original-file: 2026-07-01-preview/Workspaces_ListByOrganization_MaximumSet_Gen.json
 */
async function workspacesListByOrganizationMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByOrganization("contoso-rg", "contoso-org")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await workspacesListByOrganization();
  await workspacesListByOrganizationMaximumSetGen();
}

main().catch(console.error);
