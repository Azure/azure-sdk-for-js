// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Deletes a private endpoint connection
 *
 * @summary description for Deletes a private endpoint connection
 * x-ms-original-file: 2025-05-01/DeleteSitePrivateEndpointConnection_StaticSites.json
 */
async function deleteAPrivateEndpointConnectionForASite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.deletePrivateEndpointConnection("rg", "testSite", "connection");
}

async function main(): Promise<void> {
  await deleteAPrivateEndpointConnectionForASite();
}

main().catch(console.error);
