// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.SignalRService/webPubSub
 * Primary schema key: Microsoft.SignalRService/webPubSub
 * Also covers: none
 * Scenario: swagger-examples/web-pub-sub-create-or-update
 * provisioning API: WebPubSub
 * Source: https://github.com/Azure/azure-rest-api-specs/blob/b13ad902eeddef88ad574179ca21574e29f57806/specification/webpubsub/resource-manager/Microsoft.SignalRService/SignalRService/examples/2025-12-01-preview/WebPubSub_CreateOrUpdate.json
 * Operation: n/a
 * Runtime baseline: web-pub-sub-create-or-update.test.baseline.bicep and web-pub-sub-create-or-update.test.baseline.json
 * Gap/reduction: none
 */

import { WebPubSub } from "@azure/provisioning-webpubsub";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  expectRenderedResourceToMatchSwaggerRequest,
  renderStackArtifacts,
} from "../../utils/index.js";

type BuildScenarioHelpers = {
  createResourceGroupStack: (name?: string) => import("@azure/provisioning-core").Stack;
  createSubscriptionStack: (name?: string) => import("@azure/provisioning-core").Stack;
  values: {
    subscriptionId: string;
    tenantId: string;
    objectId: string;
    principalId: string;
    clientId: string;
    resourceGroupName: string;
    location: string;
    secondaryLocation: string;
  };
};

const values = {
  subscriptionId: "00000000-0000-0000-0000-000000000000",
  tenantId: "11111111-1111-1111-1111-111111111111",
  objectId: "22222222-2222-2222-2222-222222222222",
  principalId: "33333333-3333-3333-3333-333333333333",
  clientId: "44444444-4444-4444-4444-444444444444",
  resourceGroupName: "rg-cdk-package-test",
  location: "eastus",
  secondaryLocation: "westus",
};

function buildScenarioStack({ createResourceGroupStack }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  new WebPubSub(stack, {
    name: "myWebPubSubService",
    sku: { name: "Premium_P1", tier: "Premium", capacity: 1 },
    properties: {
      tls: { clientCertEnabled: false },
      liveTraceConfiguration: {
        enabled: "false",
        categories: [{ name: "ConnectivityLogs", enabled: "true" }],
      },
      networkAcLs: {
        defaultAction: "Deny",
        publicNetwork: { allow: ["ClientConnection"] },
        privateEndpoints: [
          {
            name: "mywebpubsubservice.1fa229cd-bf3f-47f0-8c49-afb36723997e",
            allow: ["ServerConnection"],
          },
        ],
      },
      publicNetworkAccess: "Enabled",
      disableLocalAuth: false,
      disableAadAuth: false,
      socketIo: { serviceMode: "Serverless" },
    },
    kind: "WebPubSub",
    identity: { type: "SystemAssigned" },
    location: "eastus",
    tags: { key1: "value1" },
  });
  return stack;
}

describe("swagger-examples/web-pub-sub-create-or-update", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedResourceToMatchSwaggerRequest(import.meta.url, rendered.outputs, {
      resourceType: "Microsoft.SignalRService/webPubSub",
      apiVersion: "2025-12-01-preview",
    });
    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
