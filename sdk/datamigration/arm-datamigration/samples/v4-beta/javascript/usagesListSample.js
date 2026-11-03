// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this method returns region-specific quotas and resource usage information for the Azure Database Migration Service (classic).
 *
 * @summary this method returns region-specific quotas and resource usage information for the Azure Database Migration Service (classic).
 * x-ms-original-file: 2025-09-01-preview/Usages_List.json
 */
async function servicesUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "90fb80a6-0f71-4761-8f03-921e7396f3c0";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await servicesUsages();
}

main().catch(console.error);
