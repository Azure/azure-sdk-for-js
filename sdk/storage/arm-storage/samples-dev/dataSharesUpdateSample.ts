// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Storage DataShare.
 *
 * @summary update a Storage DataShare.
 * x-ms-original-file: 2026-04-01/StorageDataShareCRUD/StorageDataShares_Update.json
 */
async function updateDataShare(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.dataShares.update("testrg", "teststorageaccount", "testdatashare", {
    properties: {
      description: "New dummy data share",
      accessPolicies: [
        {
          principalId: "00000000-0000-0000-0000-123456781234",
          tenantId: "00000000-0000-0000-0000-987654321987",
          permission: "Read",
        },
      ],
      assets: [{ assetPath: "/container/folder1/bar", displayName: "virtualBar" }],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateDataShare();
}

main().catch(console.error);
