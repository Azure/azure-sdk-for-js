// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates new or updates existing API definition.
 *
 * @summary Creates new or updates existing API definition.
 * x-ms-original-file: specification/apicenter/resource-manager/Microsoft.ApiCenter/stable/2024-03-01/examples/ApiDefinitions_CreateOrUpdate.json
 */

import type { ApiDefinition } from "@azure/arm-apicenter";
import { AzureAPICenter } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function apiDefinitionsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["APICENTER_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["APICENTER_RESOURCE_GROUP"] || "contoso-resources";
  const serviceName = "contoso";
  const workspaceName = "default";
  const apiName = "openapi";
  const versionName = "2023-01-01";
  const definitionName = "openapi";
  const payload: ApiDefinition = {
    properties: { description: "Default spec", title: "OpenAPI" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureAPICenter(credential, subscriptionId);
  const result = await client.apiDefinitions.createOrUpdate(
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
  await apiDefinitionsCreateOrUpdate();
}

main().catch(console.error);
