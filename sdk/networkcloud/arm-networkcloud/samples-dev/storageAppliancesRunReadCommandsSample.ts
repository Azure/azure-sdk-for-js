// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StorageApplianceRunReadCommandsParameters} from "@azure/arm-networkcloud";
import {
  NetworkCloud,
} from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Run one or more read-only commands on the provided storage appliance.
 *
 * @summary Run one or more read-only commands on the provided storage appliance.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-09-01/examples/StorageAppliances_RunReadCommands.json
 */
async function runAndRetrieveOutputFromReadOnlyCommandsOnStorageAppliance(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const storageApplianceName = "storageApplianceName";
  const storageApplianceRunReadCommandsParameters: StorageApplianceRunReadCommandsParameters =
    {
      limitTimeSeconds: 60,
      commands: [
        {
          arguments: ["list", "--filter", "state='open'"],
          command: "purealert",
        },
      ],
    };
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.storageAppliances.beginRunReadCommandsAndWait(
    resourceGroupName,
    storageApplianceName,
    storageApplianceRunReadCommandsParameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await runAndRetrieveOutputFromReadOnlyCommandsOnStorageAppliance();
}

main().catch(console.error);
