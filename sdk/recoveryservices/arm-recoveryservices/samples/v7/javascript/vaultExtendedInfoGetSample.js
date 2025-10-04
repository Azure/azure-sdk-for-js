// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the vault extended info.
 *
 * @summary get the vault extended info.
 * x-ms-original-file: 2025-08-01/GETVaultExtendedInfo.json
 */
async function getExtendedInfoOfResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const result = await client.vaultExtendedInfo.get(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
  );
  console.log(result);
}

async function main() {
  await getExtendedInfoOfResource();
}

main().catch(console.error);
