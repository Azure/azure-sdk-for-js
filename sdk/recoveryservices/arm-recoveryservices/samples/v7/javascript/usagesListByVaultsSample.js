// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesClient } = require("@azure/arm-recoveryservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches the usages of the vault.
 *
 * @summary fetches the usages of the vault.
 * x-ms-original-file: 2025-08-01/ListUsages.json
 */
async function getsVaultUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "77777777-b0c6-47a2-b37c-d8e65a629c18";
  const client = new RecoveryServicesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.listByVaults(
    "Default-RecoveryServices-ResourceGroup",
    "swaggerExample",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsVaultUsages();
}

main().catch(console.error);
