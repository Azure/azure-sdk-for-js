// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The Services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a resource group.
 *
 * @summary The Services resource is the top-level resource that represents the Azure Database Migration Service (classic). This method returns a list of service resources in a resource group.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Services_ListByResourceGroup.json
 */
async function servicesListByResourceGroup() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const groupName = "DmsSdkRg";
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.services.listByResourceGroup(groupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await servicesListByResourceGroup();
}

main().catch(console.error);
