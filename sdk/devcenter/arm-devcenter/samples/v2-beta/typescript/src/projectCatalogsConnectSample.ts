// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to connects a project catalog to enable syncing.
 *
 * @summary connects a project catalog to enable syncing.
 * x-ms-original-file: 2026-01-01-preview/ProjectCatalogs_Connect.json
 */
async function projectCatalogsConnect(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  await client.projectCatalogs.connect("rg1", "DevProject", "CentralCatalog");
}

async function main(): Promise<void> {
  await projectCatalogsConnect();
}

main().catch(console.error);
