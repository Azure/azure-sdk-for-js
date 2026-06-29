// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of the API.
 *
 * @summary returns details of the API.
 * x-ms-original-file: 2024-06-01-preview/Apis_Get.json
 */
async function apisGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.apis.get("contoso-resources", "contoso", "default", "echo-api");
  console.log(result);
}

async function main(): Promise<void> {
  await apisGet();
}

main().catch(console.error);
