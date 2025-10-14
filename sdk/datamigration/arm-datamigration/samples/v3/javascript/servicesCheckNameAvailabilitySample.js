// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to This method checks whether a proposed top-level resource name is valid and available.
 *
 * @summary This method checks whether a proposed top-level resource name is valid and available.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/Services_CheckNameAvailability.json
 */
async function servicesCheckNameAvailability() {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] || "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const location = "eastus";
  const parameters = {
    name: "DmsSdkService",
    type: "services",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.checkNameAvailability(location, parameters);
  console.log(result);
}

async function main() {
  await servicesCheckNameAvailability();
}

main().catch(console.error);
