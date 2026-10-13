// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of the API version.
 *
 * @summary returns details of the API version.
 * x-ms-original-file: 2024-06-01-preview/ApiVersions_Get.json
 */
async function apiVersionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.apiVersions.get(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiVersionsGet();
}

main().catch(console.error);
