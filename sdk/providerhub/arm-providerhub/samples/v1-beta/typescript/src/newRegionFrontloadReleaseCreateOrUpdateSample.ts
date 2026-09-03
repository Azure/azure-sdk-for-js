// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates a new region frontload release.
 *
 * @summary creates or updates a new region frontload release.
 * x-ms-original-file: 2024-09-01/NewRegionFrontloadRelease_CreateOrUpdate.json
 */
async function newRegionFrontloadReleaseCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.newRegionFrontloadRelease.createOrUpdate(
    "Microsoft.Contoso",
    "2020week10",
    {
      properties: {
        copyFromLocation: "eastus",
        environmentType: "Prod",
        excludeResourceTypes: ["monitors"],
        frontloadLocation: "Israel Central",
        ignoreFields: ["apiversion"],
        includeResourceTypes: ["servers"],
        operationType: "Rollout",
        overrideEndpointLevelFields: {
          apiVersion: "2024-04-01-preview",
          apiVersions: ["2024-04-01-preview"],
          dstsConfiguration: {
            serviceDnsName: "messaging.azure-ppe.net",
            serviceName: "resourceprovider",
          },
          enabled: true,
          endpointType: "Production",
          endpointUri: "https://resource-endpoint.com/",
          featuresRule: { requiredFeaturesPolicy: "Any" },
          locations: ["East US"],
          requiredFeatures: ["<feature flag>"],
          skuLink: "http://endpointuri/westus/skus",
          timeout: "PT20S",
          zones: ["zone1"],
        },
        overrideManifestLevelFields: {
          resourceHydrationAccounts: [
            {
              accountName: "classichydrationprodsn01",
              subscriptionId: "e4eae963-2d15-43e6-a097-98bd75b33edd",
            },
          ],
        },
        providerNamespace: "Microsoft.Contoso",
        serviceFeatureFlag: "DoNotCreate",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await newRegionFrontloadReleaseCreateOrUpdate();
}

main().catch(console.error);
