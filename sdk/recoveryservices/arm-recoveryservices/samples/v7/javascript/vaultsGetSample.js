// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Vault details.
 *
 * @summary get the Vault details.
 * x-ms-original-file: 2025-08-01/GETVault.json
 */
async function getRecoveryServicesResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaults.get(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
  );
  console.log(result);
}

async function main() {
  await getRecoveryServicesResource();
}

main().catch(console.error);
