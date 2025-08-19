// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns a list of locations to which you can ship the disks associated with an import or export job. A location is a Microsoft data center region.
 *
 * @summary Returns a list of locations to which you can ship the disks associated with an import or export job. A location is a Microsoft data center region.
 * x-ms-original-file: specification/storageimportexport/resource-manager/Microsoft.ImportExport/preview/2021-01-01/examples/ListLocations.json
 */

import { StorageImportExport } from "@azure/arm-storageimportexport";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listLocations(): Promise<void> {
  const subscriptionId =
    process.env["STORAGEIMPORTEXPORT_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new StorageImportExport(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.locations.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listLocations();
}

main().catch(console.error);
