// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns a specified private link resource that need to be created for Backup and SiteRecovery
 *
 * @summary returns a specified private link resource that need to be created for Backup and SiteRecovery
 * x-ms-original-file: 2025-08-01/GetPrivateLinkResources.json
 */
async function getPrivateLinkResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6c48fa17-39c7-45f1-90ac-47a587128ace";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "petesting",
    "pemsi-ecy-rsv2",
    "backupResource",
  );
  console.log(result);
}

async function main() {
  await getPrivateLinkResource();
}

main().catch(console.error);
