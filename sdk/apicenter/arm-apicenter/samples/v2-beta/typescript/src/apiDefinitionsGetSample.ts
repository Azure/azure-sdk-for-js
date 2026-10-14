// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of the API definition.
 *
 * @summary returns details of the API definition.
 * x-ms-original-file: 2024-06-01-preview/ApiDefinitions_Get.json
 */
async function apiDefinitionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.apiDefinitions.get(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
    "openapi",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiDefinitionsGet();
}

main().catch(console.error);
