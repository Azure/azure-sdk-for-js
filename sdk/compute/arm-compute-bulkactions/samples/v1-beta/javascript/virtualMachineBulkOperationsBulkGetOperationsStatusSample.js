// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to bulkGetOperationsStatus: Polling endpoint to read status of operations performed on virtual machines
 *
 * @summary bulkGetOperationsStatus: Polling endpoint to read status of operations performed on virtual machines
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkGetOperationsStatus_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkGetOperationsStatusExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkGetOperationsStatus(
    "rgBulkactions",
    "useast2euap",
    { operationIds: ["406e7856-f94b-48ae-93ee-b062afee54e5"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to bulkGetOperationsStatus: Polling endpoint to read status of operations performed on virtual machines
 *
 * @summary bulkGetOperationsStatus: Polling endpoint to read status of operations performed on virtual machines
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkGetOperationsStatus_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkGetOperationsStatusExampleGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkGetOperationsStatus(
    "rgBulkactions",
    "useast2euap",
    { operationIds: ["406e7856-f94b-48ae-93ee-b062afee54e5"] },
  );
  console.log(result);
}

async function main() {
  await virtualMachineBulkOperationsBulkGetOperationsStatusExample();
  await virtualMachineBulkOperationsBulkGetOperationsStatusExampleGeneratedByMinimumSetRule();
}

main().catch(console.error);
