// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list deleted vaults in a subscription.
 *
 * @summary list deleted vaults in a subscription.
 * x-ms-original-file: 2025-08-01/DeletedVaults_ListBySubscriptionId.json
 */
async function listDeletedVaultsInASubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedVaults.listBySubscriptionId("westus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeletedVaultsInASubscription();
}

main().catch(console.error);
