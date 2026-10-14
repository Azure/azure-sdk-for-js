// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if specified API version exists.
 *
 * @summary checks if specified API version exists.
 * x-ms-original-file: 2024-06-01-preview/ApiVersions_Head.json
 */
async function apiVersionsHead(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apiVersions.head(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
  );
}

async function main(): Promise<void> {
  await apiVersionsHead();
}

main().catch(console.error);
