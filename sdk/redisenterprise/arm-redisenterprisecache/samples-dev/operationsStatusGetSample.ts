// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the status of operation.
 *
 * @summary Gets the status of operation.
 * x-ms-original-file: specification/redisenterprise/resource-manager/Microsoft.Cache/preview/2025-05-01-preview/examples/OperationsStatusGet.json
 */

import { RedisEnterpriseManagementClient } from "@azure/arm-redisenterprisecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsStatusGet(): Promise<void> {
  const subscriptionId =
    process.env["REDISENTERPRISE_SUBSCRIPTION_ID"] ||
    "e7b5a9d2-6b6a-4d2f-9143-20d9a10f5b8f";
  const location = "West US";
  const operationId = "testoperationid";
  const credential = new DefaultAzureCredential();
  const client = new RedisEnterpriseManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.operationsStatus.get(location, operationId);
  console.log(result);
}

async function main(): Promise<void> {
  await operationsStatusGet();
}

main().catch(console.error);
