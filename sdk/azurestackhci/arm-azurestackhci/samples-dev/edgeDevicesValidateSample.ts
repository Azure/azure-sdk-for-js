// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to A long-running resource action.
 *
 * @summary A long-running resource action.
 * x-ms-original-file: specification/azurestackhci/resource-manager/Microsoft.AzureStackHCI/StackHCI/stable/2024-04-01/examples/ValidateEdgeDevices.json
 */

import type { ValidateRequest } from "@azure/arm-azurestackhci";
import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function validateEdgeDevices(): Promise<void> {
  const resourceUri =
    "subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1";
  const edgeDeviceName = "default";
  const validateRequest: ValidateRequest = {
    additionalInfo: "test",
    edgeDeviceIds: [
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-1/edgeDevices/default",
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.HybridCompute/machines/Node-2/edgeDevices/default",
    ],
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureStackHCIClient(credential);
  const result = await client.edgeDevices.beginValidateAndWait(
    resourceUri,
    edgeDeviceName,
    validateRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await validateEdgeDevices();
}

main().catch(console.error);
