// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a ElasticSnapshot
 *
 * @summary create a ElasticSnapshot
 * x-ms-original-file: 2025-09-01-preview/ElasticSnapshots_CreateOrUpdate.json
 */
async function elasticSnapshotsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.elasticSnapshots.createOrUpdate(
    "myRG",
    "account1",
    "pool1",
    "volume1",
    "snapshot1",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await elasticSnapshotsCreateOrUpdate();
}

main().catch(console.error);
