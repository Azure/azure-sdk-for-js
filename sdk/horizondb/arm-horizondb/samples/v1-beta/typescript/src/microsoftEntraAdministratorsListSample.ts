// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the PostgreSQL roles in a cluster that are members of azure_pg_admin and mapped to Microsoft Entra principals.
 *
 * @summary lists the PostgreSQL roles in a cluster that are members of azure_pg_admin and mapped to Microsoft Entra principals.
 * x-ms-original-file: 2026-10-01-preview/MicrosoftEntraAdministrators_List.json
 */
async function listMicrosoftEntraAdministratorsForAHorizonDBCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.microsoftEntraAdministrators.list(
    "example-resource-group",
    "example-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listMicrosoftEntraAdministratorsForAHorizonDBCluster();
}

main().catch(console.error);
