// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get result of backup instance creation operation
 *
 * @summary get result of backup instance creation operation
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/GetBackupInstanceOperationResult.json
 */
async function getBackupInstanceOperationResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.getBackupInstanceOperationResult(
    "SampleResourceGroup",
    "swaggerExample",
    "testInstance1",
    "YWUzNDFkMzQtZmM5OS00MmUyLWEzNDMtZGJkMDIxZjlmZjgzOzdmYzBiMzhmLTc2NmItNDM5NS05OWQ1LTVmOGEzNzg4MWQzNA==",
  );
  console.log(result);
}

async function main() {
  await getBackupInstanceOperationResult();
}

main().catch(console.error);
