// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  HttpRouteConfig} from "@azure/arm-appcontainers";
import {
  ContainerAppsAPIClient,
} from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Patches a Http Route Config resource. Only patching of tags is supported
 *
 * @summary Patches a Http Route Config resource. Only patching of tags is supported
 * x-ms-original-file: specification/app/resource-manager/Microsoft.App/ContainerApps/stable/2025-07-01/examples/HttpRouteConfig_Patch.json
 */
async function patchAHttpRouteConfig(): Promise<void> {
  const subscriptionId =
    process.env["APPCONTAINERS_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName =
    process.env["APPCONTAINERS_RESOURCE_GROUP"] || "examplerg";
  const environmentName = "testcontainerenv";
  const httpRouteName = "httproutefriendlyname";
  const httpRouteConfigEnvelope: HttpRouteConfig = {
    properties: {
      customDomains: [
        {
          name: "example.com",
          bindingType: "SniEnabled",
          certificateId:
            "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/examplerg/providers/Microsoft.App/managedEnvironments/testcontainerenv/certificates/certificate-1",
        },
      ],
      rules: [
        {
          description: "random-description",
          routes: [
            {
              action: { prefixRewrite: "/v1/api" },
              match: { path: "/v1", caseSensitive: true },
            },
          ],
          targets: [{ containerApp: "capp-1", revision: "capp-1--0000001" }],
        },
      ],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.httpRouteConfigOperations.update(
    resourceGroupName,
    environmentName,
    httpRouteName,
    httpRouteConfigEnvelope,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchAHttpRouteConfig();
}

main().catch(console.error);
