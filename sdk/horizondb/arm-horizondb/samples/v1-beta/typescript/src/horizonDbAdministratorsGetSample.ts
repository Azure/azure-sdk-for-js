// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDB administrator.
 *
 * @summary gets information about a HorizonDB administrator.
 * x-ms-original-file: 2026-05-01-preview/Administrators_Get.json
 */
async function getAHorizonDBAdministrator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbAdministrators.get(
    "exampleresourcegroup",
    "examplecluster",
    "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAHorizonDBAdministrator();
}

main().catch(console.error);
