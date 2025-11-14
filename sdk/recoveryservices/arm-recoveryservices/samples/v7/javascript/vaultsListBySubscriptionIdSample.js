// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches all the resources of the specified type in the subscription.
 *
 * @summary fetches all the resources of the specified type in the subscription.
 * x-ms-original-file: 2025-08-01/ListBySubscriptionIds.json
 */
async function listOfRecoveryServicesResourcesInSubscriptionId() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vaults.listBySubscriptionId()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listOfRecoveryServicesResourcesInSubscriptionId();
}

main().catch(console.error);
