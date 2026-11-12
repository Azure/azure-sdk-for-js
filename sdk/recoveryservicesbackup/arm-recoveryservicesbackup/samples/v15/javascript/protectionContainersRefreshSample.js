// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to discovers all the containers in the subscription that can be backed up to Recovery Services Vault. This is an
 * asynchronous operation. To know the status of the operation, call GetRefreshOperationResult API.
 *
 * @summary discovers all the containers in the subscription that can be backed up to Recovery Services Vault. This is an
 * asynchronous operation. To know the status of the operation, call GetRefreshOperationResult API.
 * x-ms-original-file: 2026-10-01/Common/RefreshContainers.json
 */
async function triggerAzureVmDiscovery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectionContainers.refresh("NetSDKTestRsVault", "SwaggerTestRg", "Azure");
}

/**
 * This sample demonstrates how to discovers all the containers in the subscription that can be backed up to Recovery Services Vault. This is an
 * asynchronous operation. To know the status of the operation, call GetRefreshOperationResult API.
 *
 * @summary discovers all the containers in the subscription that can be backed up to Recovery Services Vault. This is an
 * asynchronous operation. To know the status of the operation, call GetRefreshOperationResult API.
 * x-ms-original-file: 2026-10-01/Common/RefreshContainers_CrossSubscription.json
 */
async function triggerCrossSubscriptionAzureWorkloadDiscovery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.protectionContainers.refresh("NetSDKTestRsVault", "SwaggerTestRg", "Azure", {
    filter:
      "backupManagementType eq 'AzureWorkload' and containerSubscriptionId eq 'a76f4f58-8c04-4f53-9e68-4a698b0f43e4'",
  });
}

async function main() {
  await triggerAzureVmDiscovery();
  await triggerCrossSubscriptionAzureWorkloadDiscovery();
}

main().catch(console.error);
