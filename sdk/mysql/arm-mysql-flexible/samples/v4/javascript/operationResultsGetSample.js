// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the operation result for a long running operation.
 *
 * @summary get the operation result for a long running operation.
 * x-ms-original-file: 2024-12-30/OperationResults_Get.json
 */
async function operationResultsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.operationResults.get(
    "westus",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main() {
  await operationResultsGet();
}

main().catch(console.error);
