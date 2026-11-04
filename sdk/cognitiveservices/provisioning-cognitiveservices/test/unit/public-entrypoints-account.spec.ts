// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Primary resource type: Microsoft.CognitiveServices/accounts
 * Primary schema key: Microsoft.CognitiveServices/accounts
 * Also covers: Microsoft.CognitiveServices/accounts/capabilityHosts, Microsoft.CognitiveServices/accounts/commitmentPlans, Microsoft.CognitiveServices/accounts/connections, Microsoft.CognitiveServices/accounts/defenderForAISettings, Microsoft.CognitiveServices/accounts/deployments, Microsoft.CognitiveServices/accounts/encryptionScopes, Microsoft.CognitiveServices/accounts/managedNetworks, Microsoft.CognitiveServices/accounts/managedNetworks/outboundRules, Microsoft.CognitiveServices/accounts/networkSecurityPerimeterConfigurations, Microsoft.CognitiveServices/accounts/privateEndpointConnections, Microsoft.CognitiveServices/accounts/projects, Microsoft.CognitiveServices/accounts/projects/applications, Microsoft.CognitiveServices/accounts/projects/applications/agentDeployments, Microsoft.CognitiveServices/accounts/projects/capabilityHosts, Microsoft.CognitiveServices/accounts/projects/connections, Microsoft.CognitiveServices/accounts/raiBlocklists, Microsoft.CognitiveServices/accounts/raiBlocklists/raiBlocklistItems, Microsoft.CognitiveServices/accounts/raiPolicies, Microsoft.CognitiveServices/accounts/raiToolLabels, Microsoft.CognitiveServices/accounts/raitopics, Microsoft.CognitiveServices/accounts/testRaiExternalSafetyProvider
 * Scenario: public-entrypoints/public-entrypoints-account
 * provisioning API: Account, AccountCapabilityHost, CommitmentPlan, CognitiveServicesConnection, AccountRaiPolicy, CognitiveServicesAgentDeployment, Application, DefenderForAiSetting, Deployment, EncryptionScope, ManagedNetwork, NetworkSecurityPerimeterConfiguration, OutboundRule, PrivateEndpointConnection, Project, ProjectCapabilityHost, CognitiveServicesProjectConnection, RaiBlocklist, RaiBlocklistItem, RaiExternalSafetyProviderSchema, RaiToolLabel, RaiTopic
 * Source: packages\services\cognitiveservices\src\index.ts
 * Operation: n/a
 * Runtime baseline: public-entrypoints-account.test.baseline.bicep and public-entrypoints-account.test.baseline.json
 * Gap/reduction: none
 */

import {
  Account,
  AccountCapabilityHost,
  CommitmentPlan,
  CognitiveServicesConnection,
  AccountRaiPolicy,
  CognitiveServicesAgentDeployment,
  Application,
  DefenderForAiSetting,
  Deployment,
  EncryptionScope,
  ManagedNetwork,
  NetworkSecurityPerimeterConfiguration,
  OutboundRule,
  PrivateEndpointConnection,
  Project,
  ProjectCapabilityHost,
  CognitiveServicesProjectConnection,
  RaiBlocklist,
  RaiBlocklistItem,
  RaiExternalSafetyProviderSchema,
  RaiToolLabel,
  RaiTopic,
} from "@azure/provisioning-cognitiveservices";
import { describe, it } from "vitest";

import {
  createResourceGroupStack,
  createSubscriptionStack,
  expectRenderedOutputsToMatchBaselines,
  renderStackArtifacts,
} from "../utils/index.js";

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
  const account = new Account(stack, {
    name: "account",
    location: "eastus",
    kind: "AIServices",
    sku: {
      name: "S0",
    },
    properties: {
      publicNetworkAccess: "Enabled",
    },
  });
  const accountCapabilityHost = new AccountCapabilityHost(account, {
    name: "account",
    properties: {
      capabilityHostKind: "Agents",
      enablePublicHostingEnvironment: true,
    },
  });
  const accountCommitmentPlan = new CommitmentPlan(account, {
    name: "account",
    kind: "AIServices",
    location: "eastus",
    sku: {
      name: "S0",
    },
    properties: {
      autoRenew: true,
      hostingModel: "ConnectedContainer",
    },
  });
  const accountConnection = new CognitiveServicesConnection(account, {
    name: "account",
    properties: {
      authType: "None",
      category: "CustomKeys",
      target: "https://example.invalid",
    },
  });
  const accountRaiPolicy = new AccountRaiPolicy(account, {
    name: "account",
    properties: {
      basePolicyName: "Microsoft.Default",
      mode: "Blocking",
    },
  });
  const project = new Project(account, {
    name: "cognitive-project",
    location: "eastus",
    identity: {
      type: "SystemAssigned",
    },
    properties: {
      displayName: "Cognitive Services project",
      description: "Project coverage",
    },
  });
  const application = new Application(project, {
    name: "agent-application",
    properties: {
      displayName: "sample application",
      description: "Cognitive Services application",
    },
  });
  const agentDeployment = new CognitiveServicesAgentDeployment(application, {
    name: "account",
    properties: {
      deploymentType: "Hosted",
      displayName: "sample deployment",
      maxReplicas: 1,
      minReplicas: 1,
    },
  });
  const defenderForAiSetting = new DefenderForAiSetting(account, {
    name: "account",
    properties: {
      state: "Enabled",
    },
  });
  const deployment = new Deployment(account, {
    name: "account",
    sku: {
      name: "Standard",
      capacity: 1,
    },
    properties: {
      model: {
        format: "OpenAI",
        name: "gpt-4o",
        version: "2024-08-06",
      },
      versionUpgradeOption: "OnceNewDefaultVersionAvailable",
    },
  });
  const encryptionScope = new EncryptionScope(account, {
    name: "account",
    properties: {
      state: "Enabled",
      keySource: "Microsoft.CognitiveServices",
    },
  });
  const managedNetwork = new ManagedNetwork(account, {
    name: "default",
    properties: {
      managedNetwork: {
        isolationMode: "AllowOnlyApprovedOutbound",
        firewallSku: "Standard",
        managedNetworkKind: "V1",
      },
    },
  });
  const networkSecurityPerimeterConfiguration = new NetworkSecurityPerimeterConfiguration(account, {
    existing: true,
    name: "account",
  });
  const outboundRule = new OutboundRule(managedNetwork, {
    name: "account",
    properties: {
      type: "FQDN",
      category: "UserDefined",
      destination: "destination.example.com",
    },
  });
  const privateEndpointConnection = new PrivateEndpointConnection(account, {
    name: "account",
    properties: {
      privateLinkServiceConnectionState: {
        status: "Approved",
        description: "Approved for package coverage",
      },
    },
  });
  const projectCapabilityHost = new ProjectCapabilityHost(project, {
    name: "account",
    properties: {
      aiServicesConnections: [],
      storageConnections: [],
    },
  });
  const projectConnection = new CognitiveServicesProjectConnection(project, {
    name: "account",
    properties: {
      authType: "None",
      category: "CustomKeys",
      target: "https://example.invalid",
    },
  });
  const raiBlocklist = new RaiBlocklist(account, {
    name: "account",
    properties: {
      description: "Source-backed blocklist coverage",
    },
  });
  const raiBlocklistItem = new RaiBlocklistItem(raiBlocklist, {
    name: "account",
    properties: {
      isRegex: true,
      pattern: "^[a-z0-9_-]{2,16}$",
    },
  });
  const raiExternalSafetyProviderSchema = new RaiExternalSafetyProviderSchema(account, {
    name: "account",
    properties: {
      keyVaultUri: "https://contoso-vault.vault.azure.net/",
      managedIdentity: "f3b9c2e7-4aad-4b1f-9d9c-9e9b1e9b1f9b",
      mode: "sync",
      providerId: "00000000-0000-0000-0000-000000000000",
      providerName: "safetyProviderName",
      secretName: "safety-provider-secret",
      url: "https://example-safety-provider.contoso.com/webhook",
    },
  });
  const raiToolLabel = new RaiToolLabel(account, {
    name: "account",
    properties: {
      toolConnectionName: "Web_Search",
    },
  });
  const raiTopic = new RaiTopic(account, {
    name: "account",
    properties: {
      description: "Cognitive Services RAI topic",
      topicName: "RAI topic",
    },
  });
  return stack;
}

describe("public-entrypoints/public-entrypoints-account", () => {
  it("renders the expected Bicep and serialization output", async () => {
    const stack = await buildScenarioStack({
      createResourceGroupStack,
      createSubscriptionStack,
      values,
    });
    const rendered = renderStackArtifacts(stack);

    expectRenderedOutputsToMatchBaselines(import.meta.url, rendered.outputs);
  });
});
