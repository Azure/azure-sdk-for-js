// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates the new region frontload manifest.
 *
 * @summary generates the new region frontload manifest.
 * x-ms-original-file: 2025-10-01/NewRegionFrontloadRelease_GenerateManifest.json
 */
async function newRegionFrontloadReleaseGenerateManifest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.newRegionFrontloadRelease.generateManifest("Microsoft.Contoso", {
    properties: {
      operationType: "Rollout",
      providerNamespace: "Microsoft.Contoso",
      frontloadLocation: "Israel Central",
      copyFromLocation: "eastus",
      environmentType: "Prod",
      serviceFeatureFlag: "DoNotCreate",
      includeResourceTypes: ["servers"],
      excludeResourceTypes: ["monitors"],
      overrideManifestLevelFields: {
        resourceHydrationAccounts: [
          {
            subscriptionId: "e4eae963-2d15-43e6-a097-98bd75b33edd",
            accountName: "classichydrationprodsn01",
          },
        ],
      },
      overrideEndpointLevelFields: {
        enabled: true,
        apiVersions: ["2024-04-01-preview"],
        endpointUri: "https://resource-endpoint.com/",
        locations: ["East US"],
        requiredFeatures: ["<feature flag>"],
        featuresRule: { requiredFeaturesPolicy: "Any" },
        timeout: "PT20S",
        endpointType: "Production",
        dstsConfiguration: {
          serviceName: "resourceprovider",
          serviceDnsName: "messaging.azure-ppe.net",
        },
        skuLink: "http://endpointuri/westus/skus",
        apiVersion: "2024-04-01-preview",
        zones: ["zone1"],
      },
      ignoreFields: ["apiversion"],
    },
  });
  console.log(result);
}

async function main() {
  await newRegionFrontloadReleaseGenerateManifest();
}

main().catch(console.error);
