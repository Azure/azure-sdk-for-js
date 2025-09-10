// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the location based operation result.
 *
 * @summary gets the location based operation result.
 * x-ms-original-file: 2024-09-01/LocationBasedOperationResults_Get.json
 */
async function getsTheLocationBasedOperationResultStatus() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.locationBasedOperationResults.get(
    "rgswagger_2024-09-01",
    "Central US EUAP",
    "lghle",
  );
  console.log(result);
}

async function main() {
  await getsTheLocationBasedOperationResultStatus();
}

main().catch(console.error);
