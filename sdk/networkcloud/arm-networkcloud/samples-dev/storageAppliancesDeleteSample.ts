// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete the provided storage appliance.
All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @summary Delete the provided storage appliance.
All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 * x-ms-original-file: specification/networkcloud/resource-manager/Microsoft.NetworkCloud/stable/2025-02-01/examples/StorageAppliances_Delete.json
 */

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteStorageAppliance(): Promise<void> {
  const subscriptionId =
    process.env["NETWORKCLOUD_SUBSCRIPTION_ID"] ||
    "123e4567-e89b-12d3-a456-426655440000";
  const resourceGroupName =
    process.env["NETWORKCLOUD_RESOURCE_GROUP"] || "resourceGroupName";
  const storageApplianceName = "storageApplianceName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.storageAppliances.beginDeleteAndWait(
    resourceGroupName,
    storageApplianceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteStorageAppliance();
}

main().catch(console.error);
