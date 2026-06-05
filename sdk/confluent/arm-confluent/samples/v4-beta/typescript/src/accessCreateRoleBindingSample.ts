// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2025-08-18-preview/Access_CreateRoleBinding_MaximumSet_Gen.json
 */
async function accessCreateRoleBindingMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.createRoleBinding("rgconfluent", "ablufxskoyvgtbngsfexfkdw", {
    principal: "xzbkopaxz",
    roleName: "dhqxbrapwgqnmpbrredgxa",
    crnPattern: "iif",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2025-08-18-preview/Access_CreateRoleBinding_MinimumSet_Gen.json
 */
async function accessCreateRoleBindingMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.createRoleBinding("rgconfluent", "gdzfl", {});
  console.log(result);
}

async function main(): Promise<void> {
  await accessCreateRoleBindingMaximumSet();
  await accessCreateRoleBindingMinimumSet();
}

main().catch(console.error);
