// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if specified API exists.
 *
 * @summary checks if specified API exists.
 * x-ms-original-file: 2024-06-01-preview/Apis_Head.json
 */
async function apisHead(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apis.head("contoso-resources", "contoso", "default", "echo-api");
}

async function main(): Promise<void> {
  await apisHead();
}

main().catch(console.error);
