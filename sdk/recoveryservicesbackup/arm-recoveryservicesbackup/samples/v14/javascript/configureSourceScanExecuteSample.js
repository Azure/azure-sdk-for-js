// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to configures source scan for a protected item. This is an asynchronous operation. To know the status of the
 * operation, call GetProtectedItemOperationResult API.
 *
 * @summary configures source scan for a protected item. This is an asynchronous operation. To know the status of the
 * operation, call GetProtectedItemOperationResult API.
 * x-ms-original-file: 2026-07-01/AzureIaasVm/ConfigureSourceScan.json
 */
async function configureSourceScanForProtectedItem() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.configureSourceScan.execute(
    "SwaggerTestRg",
    "NetSDKTestRsVault",
    "Azure",
    "IaasVMContainer;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    "VM;iaasvmcontainerv2;netsdktestrg;netvmtestv2vm1",
    { sourceScanAction: "Enable" },
  );
}

async function main() {
  await configureSourceScanForProtectedItem();
}

main().catch(console.error);
