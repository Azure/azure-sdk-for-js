// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to fetches the result of any operation on the backup item.
 *
 * @summary fetches the result of any operation on the backup item.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectedItemOperationResults.json
 */
async function getOperationResultsOfProtectedVm() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectedItemOperationResults.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await getOperationResultsOfProtectedVm();
}

main().catch(console.error);
