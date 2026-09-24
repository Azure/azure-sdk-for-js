// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a HorizonDB administrator.
 *
 * @summary deletes a HorizonDB administrator.
 * x-ms-original-file: 2026-05-01-preview/Administrators_Delete.json
 */
async function deleteAHorizonDBAdministrator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbAdministrators.delete(
    "exampleresourcegroup",
    "examplecluster",
    "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  );
}

async function main(): Promise<void> {
  await deleteAHorizonDBAdministrator();
}

main().catch(console.error);
