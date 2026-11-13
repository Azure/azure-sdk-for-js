// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the state of specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary update the state of specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-11-15-preview/PutRaiPolicy.json
 */
async function putRaiPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiPolicies.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "raiPolicyName",
    {
      properties: {
        basePolicyName: "Microsoft.Default",
        contentFilters: [
          {
            name: "Hate",
            blocking: false,
            enabled: false,
            severityThreshold: "High",
            source: "Prompt",
          },
          {
            name: "Hate",
            blocking: true,
            enabled: true,
            severityThreshold: "Medium",
            source: "Completion",
          },
          {
            name: "Sexual",
            blocking: true,
            enabled: true,
            severityThreshold: "High",
            source: "Prompt",
          },
          {
            name: "Sexual",
            blocking: true,
            enabled: true,
            severityThreshold: "Medium",
            source: "Completion",
          },
          {
            name: "Selfharm",
            blocking: true,
            enabled: true,
            severityThreshold: "High",
            source: "Prompt",
          },
          {
            name: "Selfharm",
            blocking: true,
            enabled: true,
            severityThreshold: "Medium",
            source: "Completion",
          },
          {
            name: "Violence",
            blocking: true,
            enabled: true,
            severityThreshold: "Medium",
            source: "Prompt",
          },
          {
            name: "Violence",
            blocking: true,
            enabled: true,
            severityThreshold: "Medium",
            source: "Completion",
          },
          { name: "Jailbreak", blocking: true, enabled: true, source: "Prompt" },
          { name: "Protected Material Text", blocking: true, enabled: true, source: "Completion" },
          { name: "Protected Material Code", blocking: true, enabled: true, source: "Completion" },
          { name: "Profanity", blocking: true, enabled: true, source: "Prompt" },
        ],
        mode: "Asynchronous_filter",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update the state of specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary update the state of specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-11-15-preview/PutRaiPolicyAcs.json
 */
async function createAnACSPolicyWithOptionalPolicyDependencies(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiPolicies.createOrUpdate(
    "resource-group",
    "safety-account",
    "agent-guard",
    {
      properties: {
        format: "ACS",
        mode: "Asynchronous_filter",
        acs: {
          agentControlSpecificationVersion: "0.4.0-alpha.1",
          metadata: { name: "agent-guard" },
          policies: {
            "input-guard": { type: "rego", query: "data.input_guard.verdict" },
            "tool-guard": { type: "rego", query: "data.tool_guard.verdict" },
          },
          interventionPoints: {
            input: {
              policyTarget: "$snap.input",
              policyTargetKind: "user_input",
              policy: {
                id: "input-guard",
                aacsModeration: {
                  subjectFormat: "text",
                  harmConfigs: [{ category: "PromptInjection" }],
                },
              },
            },
            preToolCall: {
              policyTarget: "$snap.tool_call.args",
              policyTargetKind: "tool_args",
              toolNameFrom: "$snap.tool_call.name",
              policy: { id: "tool-guard" },
            },
            postToolCall: {
              policyTarget: "$snap.tool_result.value",
              policyTargetKind: "tool_result",
              toolNameFrom: "$snap.tool_call.name",
              policy: { id: "tool-guard" },
            },
          },
          tools: {
            web_search: {
              id: "web_search",
              type: "retrieval",
              description: "Search approved public documentation",
              securityLabels: ["network_egress", "untrusted_content"],
              clearance: "public",
              additionalProperties: {
                allowed_domains: ["learn.microsoft.com"],
              },
            },
            wire_transfer: {
              id: "wire_transfer",
              type: "financial_action",
              securityLabels: ["financial_write"],
              clearance: "confidential",
            },
          },
          annotators: {},
        },
        acsRegos: [{ regoName: "input-guard" }, { regoName: "tool-guard" }],
        customBlocklists: [{ blocklistName: "blocked-terms", source: "Prompt", blocking: true }],
        customExternalSafetyProviders: [
          {
            externalSafetyProviderName: "contoso-safety-provider",
            managedIdentityResourceId:
              "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/resource-group/providers/Microsoft.ManagedIdentity/userAssignedIdentities/safety-provider-identity",
            source: "Prompt",
            blocking: true,
          },
        ],
      },
    },
    { ifNoneMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update the state of specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary update the state of specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-11-15-preview/PutRaiPolicyAcsWithAnnotationsAndEgress.json
 */
async function createAnACSPolicyWithOptionalAnnotationsAndAnEgressCompanion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiPolicies.createOrUpdate(
    "resource-group",
    "safety-account",
    "annotated-egress-guard",
    {
      properties: {
        format: "ACS",
        mode: "Asynchronous_filter",
        acs: {
          agentControlSpecificationVersion: "0.4.0-alpha.1",
          metadata: {
            description:
              "Illustrative annotation authoring; supported annotators and configuration depend on the evaluation host.",
          },
          policies: { "agent-guard": { type: "rego", query: "data.agent_guard.verdict" } },
          annotators: {
            risk: {
              type: "llm",
              additionalProperties: {
                provider: "azure_openai",
                endpoint: "https://synthetic-judge.openai.azure.com/",
                deployment: "judge",
                api_version: "2024-10-21",
                result_schema: "acs.judge.observation/v2",
                system_prompt:
                  "Classify the complete subject for harmful intent. Score from 0 to 10: 0 is benign, 5 is ambiguous or potentially harmful, and 10 is clear harmful intent. Use label clear for scores below 4, review for scores from 4 to below 7, and high_risk for scores of 7 or higher. Report observations only; Rego decides the action.",
                timeout_ms: 10000,
              },
            },
          },
          interventionPoints: {
            agentStartup: {
              policyTarget: "$snap.agent_init",
              policyTargetKind: "agent_init",
              policy: { id: "agent-guard" },
            },
            input: {
              policyTarget: "$snap.input",
              policyTargetKind: "user_input",
              policy: { id: "agent-guard" },
              annotations: { risk: { from: "$target.content" } },
            },
            preModelCall: {
              policyTarget: "$snap.messages",
              policyTargetKind: "messages",
              policy: { id: "agent-guard" },
            },
            postModelCall: {
              policyTarget: "$snap.response",
              policyTargetKind: "model_response",
              policy: { id: "agent-guard" },
            },
            preToolCall: {
              policyTarget: "$snap.tool_call.args",
              policyTargetKind: "tool_args",
              policy: { id: "agent-guard" },
            },
            postToolCall: {
              policyTarget: "$snap.tool_result.value",
              policyTargetKind: "tool_result",
              policy: { id: "agent-guard" },
            },
            output: {
              policyTarget: "$snap.output",
              policyTargetKind: "assistant_output",
              policy: { id: "agent-guard" },
              annotations: { risk: { from: "$target.content" } },
            },
            agentShutdown: {
              policyTarget: "$snap.summary",
              policyTargetKind: "agent_summary",
              policy: { id: "agent-guard" },
            },
          },
        },
        acsRegos: [{ regoName: "agent-guard" }],
        egressPolicy: {
          mode: "Audit",
          defaultAction: "Deny",
          rules: [
            {
              name: "allow-docs",
              ruleType: "Fqdn",
              match: { host: "learn.microsoft.com", path: "/azure/*" },
              action: { actionType: "Allow" },
            },
            {
              name: "label-api",
              ruleType: "Fqdn",
              match: { host: "api.contoso.com", path: "/v1/*" },
              action: {
                actionType: "Transform",
                headers: [{ operation: "Set", name: "X-Workload-Class", value: "public-demo" }],
              },
            },
          ],
        },
      },
    },
    { ifNoneMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update the state of specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary update the state of specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-11-15-preview/PutRaiPolicyAcsWithoutTools.json
 */
async function createAnACSPolicyWithoutAToolCatalog(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiPolicies.createOrUpdate(
    "resource-group",
    "safety-account",
    "input-guard",
    {
      properties: {
        format: "ACS",
        acs: {
          agentControlSpecificationVersion: "0.4.0-alpha.1",
          policies: { "input-guard": { type: "rego", query: "data.input_guard.verdict" } },
          interventionPoints: {
            input: {
              policyTarget: "$snap.input",
              policyTargetKind: "user_input",
              policy: { id: "input-guard" },
            },
          },
        },
        acsRegos: [{ regoName: "input-guard" }],
      },
    },
    { ifNoneMatch: "*" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update the state of specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary update the state of specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-11-15-preview/PutRaiPolicyWithEgress.json
 */
async function putRaiPolicyWithEgress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiPolicies.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "egress-baseline",
    {
      properties: {
        basePolicyName: "Microsoft.Default",
        contentFilters: [],
        egressPolicy: {
          mode: "Enforced",
          defaultAction: "Deny",
          description: "Corporate baseline egress policy for sandboxed agents",
          rules: [
            {
              name: "allow-openai",
              description: "Allow traffic to OpenAI API",
              ruleType: "Fqdn",
              match: { host: "*.openai.com" },
              action: { actionType: "Allow" },
            },
            {
              name: "inject-auth-for-internal",
              description: "Inject managed identity token for internal services",
              ruleType: "Fqdn",
              match: { host: "*.internal.contoso.com" },
              action: {
                actionType: "Transform",
                headers: [
                  {
                    operation: "Set",
                    name: "Authorization",
                    valueRef: {
                      managedIdentityRef: {
                        resource: "https://internal.contoso.com/.default",
                        format: "Bearer {value}",
                      },
                    },
                  },
                ],
              },
            },
            {
              name: "rewrite-legacy-api",
              description: "Rewrite legacy API hostname to new internal endpoint",
              ruleType: "Fqdn",
              match: { host: "legacy-api.contoso.com", path: "/v1/*" },
              action: {
                actionType: "Rewrite",
                rewrite: { scheme: "https", host: "api-v2.internal.contoso.com", path: "/v2/" },
                headers: [
                  { operation: "Set", name: "X-Forwarded-Host", value: "legacy-api.contoso.com" },
                ],
              },
            },
          ],
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to update the state of specified Content Filters associated with the Azure OpenAI account.
 *
 * @summary update the state of specified Content Filters associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-11-15-preview/UpdateRaiPolicyAcs.json
 */
async function replaceAnACSPolicyConditionally(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiPolicies.createOrUpdate(
    "resource-group",
    "safety-account",
    "agent-guard",
    {
      properties: {
        format: "ACS",
        acs: {
          agentControlSpecificationVersion: "0.4.0-alpha.1",
          policies: {
            "input-guard": { type: "rego", query: "data.input_guard.verdict" },
            "tool-guard": { type: "rego", query: "data.tool_guard.verdict" },
          },
          interventionPoints: {
            input: {
              policyTarget: "$snap.input",
              policyTargetKind: "user_input",
              policy: {
                id: "input-guard",
                aacsModeration: {
                  subjectFormat: "text",
                  harmConfigs: [
                    { category: "Hate", harmConfigId: "Hate_Text_MultiSev" },
                    { category: "PromptInjection" },
                  ],
                },
              },
            },
            preToolCall: {
              policyTarget: "$snap.tool_call.args",
              policyTargetKind: "tool_args",
              toolNameFrom: "$snap.tool_call.name",
              policy: { id: "tool-guard" },
            },
            postToolCall: {
              policyTarget: "$snap.tool_result.value",
              policyTargetKind: "tool_result",
              toolNameFrom: "$snap.tool_call.name",
              policy: { id: "tool-guard" },
            },
          },
          tools: {
            web_search: {
              id: "web_search",
              type: "retrieval",
              description: "Search approved public documentation and approved partner sites",
              securityLabels: ["network_egress", "untrusted_content"],
              clearance: "public",
              additionalProperties: {
                allowed_domains: ["learn.microsoft.com", "support.microsoft.com"],
              },
            },
            wire_transfer: {
              id: "wire_transfer",
              type: "financial_action",
              securityLabels: ["financial_write"],
              clearance: "confidential",
            },
          },
        },
        acsRegos: [{ regoName: "input-guard" }, { regoName: "tool-guard" }],
        customBlocklists: [],
        customExternalSafetyProviders: [],
      },
    },
    { ifMatch: '"00000000-0000-0000-0000-000000000003"' },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putRaiPolicy();
  await createAnACSPolicyWithOptionalPolicyDependencies();
  await createAnACSPolicyWithOptionalAnnotationsAndAnEgressCompanion();
  await createAnACSPolicyWithoutAToolCatalog();
  await putRaiPolicyWithEgress();
  await replaceAnACSPolicyConditionally();
}

main().catch(console.error);
