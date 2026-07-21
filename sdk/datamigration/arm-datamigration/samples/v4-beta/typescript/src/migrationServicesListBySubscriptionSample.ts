// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve all migration services in the subscriptions.
 *
 * @summary retrieve all migration services in the subscriptions.
 * x-ms-original-file: 2025-09-01-preview/ListBySubscriptionMigrationService.json
 */
async function getServicesInTheSubscriptions(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.migrationServices.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getServicesInTheSubscriptions();
}

main().catch(console.error);
