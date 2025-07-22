// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDedicatedHSMResourceProvider } = require("@azure/arm-hardwaresecuritymodules");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to queued validating pre restore operation
 *
 * @summary queued validating pre restore operation
 * x-ms-original-file: 2025-03-31/CloudHsmCluster_RequestOrValidate_Restore_MaximumSet_Gen_ValidateRestoreProperties.json
 */
async function cloudHsmClusterValidateRestoreMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDedicatedHSMResourceProvider(credential, subscriptionId);
  const result = await client.cloudHsmClusters.validateRestoreProperties("rgcloudhsm", "chsm1", {
    restoreRequestProperties: {
      azureStorageBlobContainerUri:
        "https://myaccount.blob.core.windows.net/sascontainer/sasContainer",
      backupId: "backupId",
    },
  });
  console.log(result);
}

async function main() {
  await cloudHsmClusterValidateRestoreMaximumSetGen();
}

main().catch(console.error);
