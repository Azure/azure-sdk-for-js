// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementClient } from "@azure/arm-servicegroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update a serviceGroup
 *
 * @summary create or Update a serviceGroup
 * x-ms-original-file: 2024-02-01-preview/ServiceGroup_Put.json
 */
async function putServiceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementClient(credential);
  const result = await client.createOrUpdateServiceGroup("ServiceGroup1", {
    properties: {
      displayName: "ServiceGroup 1 Name",
      parent: { resourceId: "/providers/Microsoft.Management/serviceGroups/RootGroup" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putServiceGroup();
}

main().catch(console.error);
