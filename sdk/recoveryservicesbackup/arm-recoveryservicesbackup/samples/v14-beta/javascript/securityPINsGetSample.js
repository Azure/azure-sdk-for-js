// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the security PIN.
 *
 * @summary get the security PIN.
 * x-ms-original-file: 2026-01-01-preview/Common/BackupSecurityPin_Get.json
 */
async function getVaultSecurityPin() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.securityPINs.get("SwaggerTest", "SwaggerTestRg");
  console.log(result);
}

async function main() {
  await getVaultSecurityPin();
}

main().catch(console.error);
