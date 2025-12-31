// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieve all SQL migration services in the subscriptions.
 *
 * @summary Retrieve all SQL migration services in the subscriptions.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/ListBySubscriptionSqlMigrationService.json
 */
async function getServicesInTheSubscriptions() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Sql/managedInstances/managedInstance1";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlMigrationServices.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getServicesInTheSubscriptions();
}

main().catch(console.error);
