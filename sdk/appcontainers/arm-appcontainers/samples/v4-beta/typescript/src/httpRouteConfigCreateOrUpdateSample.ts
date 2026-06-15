// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update a Http Route Config.
 *
 * @summary create or Update a Http Route Config.
 * x-ms-original-file: 2025-10-02-preview/HttpRouteConfig_CreateOrUpdate.json
 */
async function createOrUpdateHttpRoute(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.httpRouteConfig.createOrUpdate(
    "examplerg",
    "testcontainerenv",
    "httproutefriendlyname",
    {
      httpRouteConfigEnvelope: {
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
              targets: [{ containerApp: "capp-1", revision: "rev-1", weight: 100 }],
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or Update a Http Route Config.
 *
 * @summary create or Update a Http Route Config.
 * x-ms-original-file: 2025-10-02-preview/HttpRouteConfig_CreateOrUpdatePrefix.json
 */
async function createOrUpdateHttpRoutePrefixRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.httpRouteConfig.createOrUpdate(
    "examplerg",
    "testcontainerenv",
    "httproutefriendlyname",
    {
      httpRouteConfigEnvelope: {
        properties: {
          customDomains: [
            {
              name: "example.com",
              bindingType: "Disabled",
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
                  match: { caseSensitive: true, prefix: "/v1" },
                },
              ],
              targets: [{ containerApp: "capp-1", label: "label-1" }],
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or Update a Http Route Config.
 *
 * @summary create or Update a Http Route Config.
 * x-ms-original-file: 2025-10-02-preview/HttpRouteConfig_CreateOrUpdate_PathSepPrefix.json
 */
async function createOrUpdateHttpRoutePathSeparatedPrefixRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.httpRouteConfig.createOrUpdate(
    "examplerg",
    "testcontainerenv",
    "httproutefriendlyname",
    {
      httpRouteConfigEnvelope: {
        properties: {
          customDomains: [
            {
              name: "example.com",
              bindingType: "Disabled",
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
                  match: { caseSensitive: true, pathSeparatedPrefix: "/v1" },
                },
              ],
              targets: [{ containerApp: "capp-1", label: "label-1" }],
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateHttpRoute();
  await createOrUpdateHttpRoutePrefixRule();
  await createOrUpdateHttpRoutePathSeparatedPrefixRule();
}

main().catch(console.error);
