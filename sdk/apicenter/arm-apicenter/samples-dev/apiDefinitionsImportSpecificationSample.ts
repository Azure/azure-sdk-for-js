// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Imports the API specification.
 *
 * @summary Imports the API specification.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/ApiDefinitions_ImportSpecification.json
 */

import type { ApiSpecImportRequest } from "@azure/arm-apicenter";
import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiDefinitionsImportSpecification(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const workspaceName = "default";
  const apiName = "echo-api";
  const versionName = "2023-01-01";
  const definitionName = "openapi";
  const payload: ApiSpecImportRequest = {
    format: "link",
    specification: { name: "openapi", version: "3.0.1" },
    value: "https://...",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const result = await client.apiDefinitions.beginImportSpecificationAndWait(
    resourceGroupName,
    serviceName,
    workspaceName,
    apiName,
    versionName,
    definitionName,
    payload,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiDefinitionsImportSpecification();
}

main().catch(console.error);
