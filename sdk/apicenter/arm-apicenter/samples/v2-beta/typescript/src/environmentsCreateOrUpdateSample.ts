// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiCenterClient } from "@azure/arm-apicenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates new or updates existing environment.
 *
 * @summary creates new or updates existing environment.
 * x-ms-original-file: 2024-06-01-preview/Environments_CreateOrUpdate.json
 */
async function environmentsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiCenterClient(credential, subscriptionId);
  const result = await client.environments.createOrUpdate(
    "contoso-resources",
    "contoso",
    "default",
    "public",
    {
      properties: {
        title: "Contoso Europe Azure API Management",
        description:
          "The primary Azure API Management service for the European division of Contoso.",
        kind: "production",
        server: {
          type: "Azure API Management",
          managementPortalUri: [
            "https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/contoso-resources/providers/Microsoft.ApiManagement/service/contoso",
          ],
        },
        onboarding: {
          instructions:
            "Sign in or sign up in the specified developer portal to request API access. You must complete the internal privacy training for your account to be approved.",
          developerPortalUri: ["https://developer.contoso.com"],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await environmentsCreateOrUpdate();
}

main().catch(console.error);
