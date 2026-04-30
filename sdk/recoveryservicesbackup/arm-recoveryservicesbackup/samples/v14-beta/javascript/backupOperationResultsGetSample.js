// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to provides the status of the delete operations such as deleting backed up item. Once the operation has started, the
 * status code in the response would be Accepted. It will continue to be in this state till it reaches completion. On
 * successful completion, the status code will be OK. This method expects OperationID as an argument. OperationID is
 * part of the Location header of the operation response.
 *
 * @summary provides the status of the delete operations such as deleting backed up item. Once the operation has started, the
 * status code in the response would be Accepted. It will continue to be in this state till it reaches completion. On
 * successful completion, the status code will be OK. This method expects OperationID as an argument. OperationID is
 * part of the Location header of the operation response.
 * x-ms-original-file: 2026-01-01-preview/Common/ProtectedItem_Delete_OperationResult.json
 */
async function getResultForProtectedItemDeleteOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  await client.backupOperationResults.get(
    "PySDKBackupTestRsVault",
    "PythonSDKBackupTestRg",
    "00000000-0000-0000-0000-000000000000",
  );
}

async function main() {
  await getResultForProtectedItemDeleteOperation();
}

main().catch(console.error);
