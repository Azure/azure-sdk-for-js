// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to This method checks whether a proposed top-level resource name is valid and available.
 *
 * @summary This method checks whether a proposed top-level resource name is valid and available.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/preview/2025-03-15-preview/examples/Services_CheckNameAvailability.json
 */

import {
  NameAvailabilityRequest,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function servicesCheckNameAvailability(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "fc04246f-04c5-437e-ac5e-206a19e7193f";
  const location = "eastus";
  const parameters: NameAvailabilityRequest = {
    name: "DmsSdkService",
    type: "services",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.services.checkNameAvailability(
    location,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await servicesCheckNameAvailability();
}

main().catch(console.error);
