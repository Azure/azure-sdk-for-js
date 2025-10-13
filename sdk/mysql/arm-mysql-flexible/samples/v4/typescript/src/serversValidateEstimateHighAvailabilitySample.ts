// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validate a deployment of high availability.
 *
 * @summary validate a deployment of high availability.
 * x-ms-original-file: 2024-12-30/ServerValidateEstimateHighAvailability.json
 */
async function validateAValidationAndEstimationOfHighAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.validateEstimateHighAvailability("TestGroup", "testserver", {
    expectedStandbyAvailabilityZone: "1",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await validateAValidationAndEstimationOfHighAvailability();
}

main().catch(console.error);
