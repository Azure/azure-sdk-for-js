// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new or updates existing API.
 *
 * @summary creates new or updates existing API.
 * x-ms-original-file: 2024-06-01-preview/Apis_CreateOrUpdate.json
 */
async function apisCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.apis.createOrUpdate(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    {
      properties: {
        title: "Echo API",
        description: "A simple HTTP request/response service.",
        kind: "rest",
        termsOfService: { url: "https://contoso.com/terms-of-service" },
        license: { url: "https://contoso.com/license" },
        externalDocumentation: [{ title: "Onboarding docs", url: "https://docs.contoso.com" }],
        customProperties: {},
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apisCreateOrUpdate();
}

main().catch(console.error);
