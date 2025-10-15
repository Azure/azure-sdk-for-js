// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to This method returns region-specific quotas and resource usage information for the Azure Database Migration Service (classic).
 *
 * @summary This method returns region-specific quotas and resource usage information for the Azure Database Migration Service (classic).
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Usages_List.json
 */
async function servicesUsages() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "90fb80a6-0f71-4761-8f03-921e7396f3c0";
  const location = "westus";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await servicesUsages();
}

main().catch(console.error);
