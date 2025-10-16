// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 *
 * @summary returns collection of operation request objects for a critical operation protected by the given ResourceGuard resource.
 * x-ms-original-file: 2025-07-01/ResourceGuardCRUD/GetDefaultUpdateProtectedItemRequests.json
 */
async function getDefaultOperationsRequestObject(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result =
    await client.resourceGuards.getDefaultUpdateProtectedItemRequestsObject(
      "SampleResourceGroup",
      "swaggerExample",
      "default",
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getDefaultOperationsRequestObject();
}

main().catch(console.error);
