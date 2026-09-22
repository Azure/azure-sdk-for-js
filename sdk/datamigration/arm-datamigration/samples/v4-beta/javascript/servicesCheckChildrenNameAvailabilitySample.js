// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this method checks whether a proposed nested resource name is valid and available.
 *
 * @summary this method checks whether a proposed nested resource name is valid and available.
 * x-ms-original-file: 2025-09-01-preview/Services_CheckChildrenNameAvailability.json
 */
async function servicesCheckChildrenNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.checkChildrenNameAvailability("DmsSdkRg", "DmsSdkService", {
    name: "Task1",
    type: "tasks",
  });
  console.log(result);
}

async function main() {
  await servicesCheckChildrenNameAvailability();
}

main().catch(console.error);
