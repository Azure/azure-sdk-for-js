// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceGroupsManagementClient } from "@azure/arm-servicegroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a serviceGroup
 *
 * @summary update a serviceGroup
 * x-ms-original-file: 2024-02-01-preview/ServiceGroup_Patch.json
 */
async function patchServiceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ServiceGroupsManagementClient(credential);
  const result = await client.updateServiceGroup("ServiceGroup1", {
    properties: { displayName: "ServiceGroup 1 Name" },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await patchServiceGroup();
}

main().catch(console.error);
