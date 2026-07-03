// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces a dataController resource
 *
 * @summary creates or replaces a dataController resource
 * x-ms-original-file: 2026-03-01-preview/CreateOrUpdateDataController.json
 */
async function createOrUpdateADataController() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const result = await client.dataControllers.putDataController("testrg", "testdataController", {
    extendedLocation: {
      name: "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.ExtendedLocation/customLocations/arclocation",
      type: "CustomLocation",
    },
    location: "northeurope",
    properties: {
      basicLoginInformation: { password: "********", username: "username" },
      clusterId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Kubernetes/connectedClusters/connectedk8s",
      extensionId:
        "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/testrg/providers/Microsoft.Kubernetes/connectedClusters/connectedk8s/providers/Microsoft.KubernetesConfiguration/extensions/extension",
      infrastructure: "onpremises",
      logAnalyticsWorkspaceConfig: {
        primaryKey: "********",
        workspaceId: "00000000-1111-2222-3333-444444444444",
      },
      logsDashboardCredential: { password: "********", username: "username" },
      metricsDashboardCredential: { password: "********", username: "username" },
      onPremiseProperty: {
        id: "12345678-1234-1234-ab12-1a2b3c4d5e6f",
        publicSigningKey: "publicOnPremSigningKey",
      },
      uploadServicePrincipal: {
        authority: "https://login.microsoftonline.com/",
        clientId: "00000000-1111-2222-3333-444444444444",
        clientSecret: "********",
        tenantId: "00000000-1111-2222-3333-444444444444",
      },
      uploadWatermark: {
        logs: new Date("2020-01-01T17:18:19.1234567Z"),
        metrics: new Date("2020-01-01T17:18:19.1234567Z"),
        usages: new Date("2020-01-01T17:18:19.1234567Z"),
      },
    },
    tags: { mytag: "myval" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateADataController();
}

main().catch(console.error);
