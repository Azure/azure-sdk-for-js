// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get result of backup instance creation operation
 *
 * @summary Get result of backup instance creation operation
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/BackupInstanceOperations/GetBackupInstanceOperationResult.json
 */

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getBackupInstanceOperationResult(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "SampleResourceGroup";
  const vaultName = "swaggerExample";
  const backupInstanceName = "testInstance1";
  const operationId =
    "YWUzNDFkMzQtZmM5OS00MmUyLWEzNDMtZGJkMDIxZjlmZjgzOzdmYzBiMzhmLTc2NmItNDM5NS05OWQ1LTVmOGEzNzg4MWQzNA==";
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.backupInstances.getBackupInstanceOperationResult(
    resourceGroupName,
    vaultName,
    backupInstanceName,
    operationId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getBackupInstanceOperationResult();
}

main().catch(console.error);
