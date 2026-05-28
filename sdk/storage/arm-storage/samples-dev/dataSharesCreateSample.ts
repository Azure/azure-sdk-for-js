// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Storage DataShare if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource.
 *
 * @summary create a Storage DataShare if it does not already exist; otherwise, error out. This API will not allow you to replace an already existing resource.
 * x-ms-original-file: 2025-08-01/StorageDataShareCRUD/StorageDataShares_Create.json
 */
async function createDataShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.dataShares.create("testrg", "teststorageaccount", "testdatashare", {
    location: "eastus",
    properties: {
      description: "Dummy data share",
      accessPolicies: [
        {
          principalId: "00000000-0000-0000-0000-000000000000",
          tenantId: "00000000-0000-0000-0000-000000000000",
          permission: "Read",
        },
      ],
      assets: [{ assetPath: "/container/folder/foo", displayName: "virtualFoo" }],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createDataShare();
}

main().catch(console.error);
