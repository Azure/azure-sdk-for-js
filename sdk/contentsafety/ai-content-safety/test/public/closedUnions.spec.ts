// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import type {
  AgentContextUnion,
  AgentPolicyEvaluationReceiptUnion,
  AgentVerdictUnion,
} from "../../src/models/models.js";
import {
  agentContextUnionSerializer,
  agentPolicyEvaluationReceiptUnionDeserializer,
  agentVerdictUnionDeserializer,
} from "../../src/models/models.js";

describe("closed Agent Hooks unions", () => {
  it("rejects incomplete known discriminator variants at compile time", () => {
    const commonContext = {
      spec: "agent-hooks/0.1" as const,
      timestamp: new Date(),
      sequence: 1,
      agent: { id: "agent-1", framework: "test" },
      session: { id: "session-1" },
      target: { content: "hello" },
    };

    // @ts-expect-error input is required when interceptionPoint is input
    const incompleteContext: AgentContextUnion = {
      ...commonContext,
      interceptionPoint: "input",
    };

    // @ts-expect-error transform is required when decision is transform
    const incompleteVerdict: AgentVerdictUnion = {
      decision: "transform",
    };

    // @ts-expect-error Foundry receipt fields are required for foundryProject
    const incompleteReceipt: AgentPolicyEvaluationReceiptUnion = {
      receiptVersion: "2026-10-15-preview",
      profile: "foundryProject",
      evaluationId: "evaluation-1",
      attempt: 1,
      requestBinding: {
        algorithm: "sha256",
        canonicalization: "rfc8785",
        digest: `sha256:${"a".repeat(64)}`,
      },
      evaluatedPolicyLayers: [],
      evaluatedInterventionPoint: "input",
      requiredInterventionPoints: ["input"],
      hostProfileVersion: "aacs-frontdoor/2",
      authenticatedProducerResourceId: "/subscriptions/sub/resourceGroups/rg/providers/test/p",
    };

    assert.ok(incompleteContext);
    assert.ok(incompleteVerdict);
    assert.ok(incompleteReceipt);
  });

  it("rejects unknown discriminator values at runtime", () => {
    expect(() =>
      agentContextUnionSerializer({
        interceptionPoint: "future_point",
      } as unknown as AgentContextUnion),
    ).toThrow("Unknown Agent Hooks interception point.");
    expect(() =>
      agentVerdictUnionDeserializer({
        decision: "escalate",
      }),
    ).toThrow("Unknown Agent Hooks decision.");
    expect(() =>
      agentPolicyEvaluationReceiptUnionDeserializer({
        profile: "futureProfile",
      }),
    ).toThrow("Unknown Agent Hooks receipt profile.");
  });
});
