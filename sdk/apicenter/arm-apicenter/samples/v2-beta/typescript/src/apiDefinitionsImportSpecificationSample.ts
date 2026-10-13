// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to imports the API specification.
 *
 * @summary imports the API specification.
 * x-ms-original-file: 2024-06-01-preview/ApiDefinitions_ImportSpecification.json
 */
async function apiDefinitionsImportSpecification(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  await client.apiDefinitions.importSpecification(
    "contoso-resources",
    "contoso",
    "default",
    "echo-api",
    "2023-01-01",
    "openapi",
    { format: "link", value: "https://...", specification: { name: "openapi", version: "3.0.1" } },
  );
}

async function main(): Promise<void> {
  await apiDefinitionsImportSpecification();
}

main().catch(console.error);
