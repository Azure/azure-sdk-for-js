// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if specified API source exists.
 *
 * @summary checks if specified API source exists.
 * x-ms-original-file: 2024-06-01-preview/ApiSources_Head.json
 */
async function apiSourcesHead(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apiSources.head("contoso-resources", "contoso", "default", "contoso-api-management");
}

async function main(): Promise<void> {
  await apiSourcesHead();
}

main().catch(console.error);
