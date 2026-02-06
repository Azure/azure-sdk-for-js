// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this operation creates or updates a policy definition in the given subscription with the given name.
 *
 * @summary this operation creates or updates a policy definition in the given subscription with the given name.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicyDefinition.json
 */
async function createOrUpdateAPolicyDefinition() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyDefinitions.createOrUpdate("ResourceNaming", {
    description: "Force resource names to begin with given 'prefix' and/or end with given 'suffix'",
    displayName: "Enforce resource naming convention",
    metadata: { category: "Naming" },
    mode: "All",
    parameters: {
      prefix: {
        type: "String",
        metadata: { description: "Resource name prefix", displayName: "Prefix" },
      },
      suffix: {
        type: "String",
        metadata: { description: "Resource name suffix", displayName: "Suffix" },
      },
    },
    policyRule: {
      if: {
        not: { field: "name", like: "[concat(parameters('prefix'), '*', parameters('suffix'))]" },
      },
      then: { effect: "deny" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy definition in the given subscription with the given name.
 *
 * @summary this operation creates or updates a policy definition in the given subscription with the given name.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicyDefinitionAdvancedParams.json
 */
async function createOrUpdateAPolicyDefinitionWithAdvancedParameters() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyDefinitions.createOrUpdate("EventHubDiagnosticLogs", {
    description:
      "Audit enabling of logs and retain them up to a year. This enables recreation of activity trails for investigation purposes when a security incident occurs or your network is compromised",
    displayName: "Event Hubs should have diagnostic logging enabled",
    metadata: { category: "Event Hub" },
    mode: "Indexed",
    parameters: {
      requiredRetentionDays: {
        type: "Integer",
        allowedValues: [0, 30, 90, 180, 365],
        defaultValue: 365,
        metadata: {
          description: "The required diagnostic logs retention in days",
          displayName: "Required retention (days)",
        },
      },
    },
    policyRule: {
      if: { equals: "Microsoft.EventHub/namespaces", field: "type" },
      then: {
        effect: "AuditIfNotExists",
        details: {
          type: "Microsoft.Insights/diagnosticSettings",
          existenceCondition: {
            allOf: [
              {
                equals: "true",
                field: "Microsoft.Insights/diagnosticSettings/logs[*].retentionPolicy.enabled",
              },
              {
                equals: "[parameters('requiredRetentionDays')]",
                field: "Microsoft.Insights/diagnosticSettings/logs[*].retentionPolicy.days",
              },
            ],
          },
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to this operation creates or updates a policy definition in the given subscription with the given name.
 *
 * @summary this operation creates or updates a policy definition in the given subscription with the given name.
 * x-ms-original-file: 2025-03-01/createOrUpdatePolicyDefinitionExternalEvaluationEnforcementSettings.json
 */
async function createOrUpdateAPolicyDefinitionWithExternalEvaluationEnforcementSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyDefinitions.createOrUpdate("RandomizeVMAllocation", {
    description:
      "Randomly disable VM allocation in eastus by having policy rule reference the outcome of invoking an external endpoint using the CoinFlip endpoint that returns random values.",
    displayName: "Randomize VM Allocation",
    externalEvaluationEnforcementSettings: {
      endpointSettings: { kind: "CoinFlip", details: { successProbability: 0.5 } },
      missingTokenAction: "audit",
      roleDefinitionIds: [
        "subscriptions/ae640e6b-ba3e-4256-9d62-2993eecfa6f2/providers/Microsoft.Authorization/roleDefinitions/f0cc2aea-b517-48f6-8f9e-0c01c687907b",
      ],
    },
    metadata: { category: "VM" },
    mode: "Indexed",
    policyRule: {
      if: {
        allOf: [
          { equals: "Microsoft.Compute/virtualMachines", field: "type" },
          { equals: "eastus", field: "location" },
          { equals: "false", value: "[claims().isValid]" },
        ],
      },
      then: { effect: "deny" },
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAPolicyDefinition();
  await createOrUpdateAPolicyDefinitionWithAdvancedParameters();
  await createOrUpdateAPolicyDefinitionWithExternalEvaluationEnforcementSettings();
}

main().catch(console.error);
