// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.EventHub/namespaces/eventhubs
 * Primary schema key: Microsoft.EventHub/namespaces/eventhubs
 * Also covers: Microsoft.EventHub/namespaces, Microsoft.EventHub/namespaces/authorizationRules
 * Scenario: quick-start/eventhubs-create-namespace-and-enable-capture-for-adls
 * provisioning API: Eventhub, Namespace, NamespaceAuthorizationRule
 * Source: https://github.com/Azure/azure-quickstart-templates/blob/9a286202372ff9a9a4f4465e1ef30d7b0f3650c6/quickstarts/microsoft.eventhub/eventhubs-create-namespace-and-enable-capture-for-adls/azuredeploy.json
 * Operation: n/a
 * Runtime baseline: eventhubs-create-namespace-and-enable-capture-for-adls.test.baseline.bicep and eventhubs-create-namespace-and-enable-capture-for-adls.test.baseline.json
 * Gap/reduction: Source API version 2017-04-01 is rendered with the package API version 2026-01-01., The source output-only namespace authorization-rule key lookups are not emitted.
 */

import { Eventhub, Namespace } from "@azure/provisioning-eventhub";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderOutputsToMatchSample,
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

function buildScenarioStack({ createResourceGroupStack, values }: BuildScenarioHelpers) {
  const stack = createResourceGroupStack();
  const namespace = new Namespace(stack, {
    name: "quickadlsns",
    location: values.location,
    sku: { name: "Standard", tier: "Standard" },
  });
  new Eventhub(namespace, {
    name: "quick-adls-hub",
    properties: {
      captureDescription: {
        enabled: true,
        skipEmptyArchives: false,
        encoding: "Avro",
        intervalInSeconds: 300,
        sizeLimitInBytes: 314572800,
        destination: {
          name: "EventHubArchive.AzureDataLake",
          properties: {
            dataLakeSubscriptionId: values.subscriptionId,
            dataLakeAccountName: "capturelake",
            dataLakeFolderPath: "/eventhub-captures",
            archiveNameFormat:
              "{Namespace}/{EventHub}/{PartitionId}/{Year}/{Month}/{Day}/{Hour}/{Minute}/{Second}",
          },
        },
      },
    },
  });
  return stack;
}

describe("quick-start/eventhubs-create-namespace-and-enable-capture-for-adls", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderOutputsToMatchSample(import.meta.url, rendered.outputs);
  });
});
