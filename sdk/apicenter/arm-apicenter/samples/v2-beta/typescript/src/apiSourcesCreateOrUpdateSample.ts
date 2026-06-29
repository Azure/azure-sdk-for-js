// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new or updates existing API source.
 *
 * @summary creates new or updates existing API source.
 * x-ms-original-file: 2024-06-01-preview/ApiSources_CreateOrUpdate.json
 */
async function apiSourcesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.apiSources.createOrUpdate(
    "contoso-resources",
    "contoso",
    "default",
    "contoso-api-management",
    {
      properties: {
        azureApiManagementSource: {
          resourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ApiManagement/service/contoso",
          msiResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ManagedIdentity/userAssignedIdentities/contoso-identity",
        },
        importSpecification: "ondemand",
        targetEnvironmentId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ApiCenter/services/contoso/workspaces/default/environments/azure-api-management",
        targetLifecycleStage: "design",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiSourcesCreateOrUpdate();
}

main().catch(console.error);
