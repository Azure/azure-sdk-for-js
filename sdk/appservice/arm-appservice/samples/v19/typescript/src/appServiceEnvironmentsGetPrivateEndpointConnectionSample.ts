// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets a private endpoint connection
 *
 * @summary description for Gets a private endpoint connection
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_GetPrivateEndpointConnection.json
 */
async function getsAPrivateEndpointConnection(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.getPrivateEndpointConnection(
    "test-rg",
    "test-ase",
    "fa38656c-034e-43d8-adce-fe06ce039c98",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getsAPrivateEndpointConnection();
}

main().catch(console.error);
