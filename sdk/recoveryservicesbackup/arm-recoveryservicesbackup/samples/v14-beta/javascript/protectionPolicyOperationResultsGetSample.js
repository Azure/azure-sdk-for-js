// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides the result of an operation.
 *
 * @summary provides the result of an operation.
 * x-ms-original-file: 2026-01-01-preview/AzureIaasVm/ProtectionPolicyOperationResults_Get.json
 */
async function getProtectionPolicyOperationResults() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionPolicyOperationResults.get(
    "NetSDKTestRsVault",
    "SwaggerTestRg",
    "testPolicy1",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await getProtectionPolicyOperationResults();
}

main().catch(console.error);
