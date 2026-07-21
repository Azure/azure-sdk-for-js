// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataMigrationManagementClient } from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this method checks whether a proposed top-level resource name is valid and available.
 *
 * @summary this method checks whether a proposed top-level resource name is valid and available.
 * x-ms-original-file: 2025-09-01-preview/Services_CheckNameAvailability.json
 */
async function servicesCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.checkNameAvailability("eastus", {
    name: "DmsSdkService",
    type: "services",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await servicesCheckNameAvailability();
}

main().catch(console.error);
