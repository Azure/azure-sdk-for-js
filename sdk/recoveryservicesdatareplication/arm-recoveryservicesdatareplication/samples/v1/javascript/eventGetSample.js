// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  AzureSiteRecoveryManagementServiceAPI,
} = require("@azure/arm-recoveryservicesdatareplication");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of the event.
 *
 * @summary gets the details of the event.
 * x-ms-original-file: 2024-09-01/Event_Get.json
 */
async function getsTheEvent() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "930CEC23-4430-4513-B855-DBA237E2F3BF";
  const client = new AzureSiteRecoveryManagementServiceAPI(credential, subscriptionId);
  const result = await client.event.get("rgswagger_2024-09-01", "4", "231CIG");
  console.log(result);
}

async function main() {
  await getsTheEvent();
}

main().catch(console.error);
