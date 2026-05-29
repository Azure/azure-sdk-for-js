// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to patches an http route config resource. Only patching of tags is supported
 *
 * @summary patches an http route config resource. Only patching of tags is supported
 * x-ms-original-file: 2025-10-02-preview/HttpRouteConfig_Patch.json
 */
async function patchManagedHttpRoute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.httpRouteConfig.update(
    "examplerg",
    "testcontainerenv",
    "httproutefriendlyname",
    {
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
              { action: { prefixRewrite: "/v1/api" }, match: { path: "/v1", caseSensitive: true } },
            ],
            targets: [{ containerApp: "capp-1", revision: "rev-1", weight: 100 }],
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await patchManagedHttpRoute();
}

main().catch(console.error);
