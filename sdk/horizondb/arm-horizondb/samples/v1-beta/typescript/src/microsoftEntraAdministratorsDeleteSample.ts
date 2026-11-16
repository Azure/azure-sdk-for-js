// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal.
 *
 * @summary deletes a PostgreSQL role that is a member of azure_pg_admin and mapped to a Microsoft Entra principal.
 * x-ms-original-file: 2026-10-01-preview/MicrosoftEntraAdministrators_Delete.json
 */
async function deleteAMicrosoftEntraAdministratorFromAHorizonDBCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.microsoftEntraAdministrators.delete(
    "example-resource-group",
    "example-cluster",
    "11111111-1111-1111-1111-111111111111",
  );
}

async function main(): Promise<void> {
  await deleteAMicrosoftEntraAdministratorFromAHorizonDBCluster();
}

main().catch(console.error);
