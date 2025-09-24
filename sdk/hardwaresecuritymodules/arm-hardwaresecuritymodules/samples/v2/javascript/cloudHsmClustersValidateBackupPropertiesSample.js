// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to pre Backup operation to validate whether the customer can perform a backup on the Cloud HSM Cluster resource in the specified subscription.
 *
 * @summary pre Backup operation to validate whether the customer can perform a backup on the Cloud HSM Cluster resource in the specified subscription.
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_Create_Backup_MaximumSet_Gen_ValidateBackupProperties.json
 */
async function cloudHsmClusterValidateBackupValidationMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.cloudHsmClusters.validateBackupProperties("rgcloudhsm", "chsm1", {
    backupRequestProperties: {
      azureStorageBlobContainerUri:
        "https://myaccount.blob.core.windows.net/sascontainer/sasContainer",
      token: "se=2018-02-01T00%3A00Z&spr=https&sv=2017-04-17&sr=b&sig=REDACTED",
    },
  });
  console.log(result);
}

async function main() {
  await cloudHsmClusterValidateBackupValidationMaximumSetGen();
}

main().catch(console.error);
