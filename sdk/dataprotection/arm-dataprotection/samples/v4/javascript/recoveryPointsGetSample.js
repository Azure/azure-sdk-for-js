// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataProtectionClient } = require("@azure/arm-dataprotection");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Recovery Point using recoveryPointId for a Datasource.
 *
 * @summary gets a Recovery Point using recoveryPointId for a Datasource.
 * x-ms-original-file: 2025-07-01/BackupInstanceOperations/GetRecoveryPoint.json
 */
async function getRecoveryPoint() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "04cf684a-d41f-4550-9f70-7708a3a2283b";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.recoveryPoints.get(
    "000pikumar",
    "PratikPrivatePreviewVault1",
    "testInstance1",
    "7fb2cddd-c5b3-44f6-a0d9-db3c4f9d5f25",
  );
  console.log(result);
}

async function main() {
  await getRecoveryPoint();
}

main().catch(console.error);
