// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the details about a location to which you can ship the disks associated with an import or export job. A location is an Azure region.
 *
 * @summary Returns the details about a location to which you can ship the disks associated with an import or export job. A location is an Azure region.
 * x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/GetLocation.json
 */

import { StorageImportExport } from "@azure/arm-storageimportexport";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getLocations(): Promise<void> {
  const subscriptionId =
    process.env["STORAGEIMPORTEXPORT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const locationName = "West US";
  const credential = new DefaultAzureCredential();
  const client = new StorageImportExport(credential, subscriptionId);
  const result = await client.locations.get(locationName);
  console.log(result);
}

async function main(): Promise<void> {
  await getLocations();
}

main().catch(console.error);
