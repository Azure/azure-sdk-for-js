// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the list of private link resources that need to be created for Backup and SiteRecovery
 *
 * @summary returns the list of private link resources that need to be created for Backup and SiteRecovery
 * x-ms-original-file: 2025-08-01/ListPrivateLinkResources.json
 */
async function listPrivateLinkResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6c48fa17-39c7-45f1-90ac-47a587128ace";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateLinkResources.list("petesting", "pemsi-ecy-rsv2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateLinkResources();
}

main().catch(console.error);
