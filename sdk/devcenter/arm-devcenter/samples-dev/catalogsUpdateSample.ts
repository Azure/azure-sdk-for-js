// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CatalogUpdate } from "@azure/arm-devcenter";
import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Partially updates a catalog.
 *
 * @summary Partially updates a catalog.
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2024-02-01/examples/Catalogs_Patch.json
 */
async function catalogsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] || "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const devCenterName = "Contoso";
  const catalogName = "CentralCatalog";
  const body: CatalogUpdate = {
    gitHub: { path: "/environments" },
    syncType: "Scheduled",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.catalogs.beginUpdateAndWait(
    resourceGroupName,
    devCenterName,
    catalogName,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await catalogsUpdate();
}

main().catch(console.error);
