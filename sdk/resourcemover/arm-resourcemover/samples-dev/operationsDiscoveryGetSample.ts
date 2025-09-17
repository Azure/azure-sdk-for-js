// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to
 *
 * @summary
 * x-ms-original-file: specification/resourcemover/resource-manager/Microsoft.Migrate/stable/2023-08-01/examples/OperationsDiscovery_Get.json
 */

import { ResourceMoverServiceAPI } from "@azure/arm-resourcemover";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function operationsDiscoveryGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ResourceMoverServiceAPI(credential);
  const result = await client.operationsDiscoveryOperations.get();
  console.log(result);
}

async function main(): Promise<void> {
  await operationsDiscoveryGet();
}

main().catch(console.error);
