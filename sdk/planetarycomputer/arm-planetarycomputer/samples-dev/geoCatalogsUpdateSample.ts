// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a GeoCatalog
 *
 * @summary update a GeoCatalog
 * x-ms-original-file: 2025-02-11-preview/GeoCatalogs_Update.json
 */

import { SpatioClient } from "@azure/arm-planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

async function geoCatalogsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "cd9b6cdf-dcf0-4dca-ab19-82be07b74704";
  const client = new SpatioClient(credential, subscriptionId);
  const result = await client.geoCatalogs.update("MyResourceGroup", "MyCatalog", {
    tags: { MyTag: "MyValue" },
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/cd9b6cdf-dcf0-4dca-ab19-82be07b74704/resourceGroups/MyResourceGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/MyManagedIdentity":
          {},
      },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await geoCatalogsUpdate();
}

main().catch(console.error);
