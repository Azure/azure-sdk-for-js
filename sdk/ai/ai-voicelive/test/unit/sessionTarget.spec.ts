// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * SessionTarget and AgentSessionConfig Type Tests
 *
 * This test suite validates the SessionTarget discriminated union and
 * AgentSessionConfig types for agent-centric session support.
 *
 * Tests cover:
 * - Type discrimination between model and agent targets
 * - Type guard functions (isModelSessionTarget, isAgentSessionTarget)
 * - AgentSessionConfig structure validation
 */

import { describe, it, expect } from "vitest";
import {
  isAgentSessionTarget,
  isModelSessionTarget,
  type SessionTarget,
  type AgentSessionConfig,
} from "../../src/index.js";

describe("SessionTarget and AgentSessionConfig Types", () => {
  describe("AgentSessionConfig", () => {
    it("should accept valid agent configuration", () => {
      const config: AgentSessionConfig = {
        agentId: "agent-123",
        projectName: "my-project",
      };

      expect(config.agentId).toBe("agent-123");
      expect(config.projectName).toBe("my-project");
    });

    it("should handle special characters in identifiers", () => {
      const config: AgentSessionConfig = {
        agentId: "agent-with-dashes_and_underscores.v1",
        projectName: "project/with/slashes",
      };

      expect(config.agentId).toBe("agent-with-dashes_and_underscores.v1");
      expect(config.projectName).toBe("project/with/slashes");
    });
  });

  describe("SessionTarget - Model Mode", () => {
    it("should create a valid model session target", () => {
      const target: SessionTarget = {
        model: "gpt-4o-realtime-preview",
      };

      expect(target.model).toBe("gpt-4o-realtime-preview");
      expect(target.agent).toBeUndefined();
    });

    it("should be identified by isModelSessionTarget", () => {
      const target: SessionTarget = {
        model: "gpt-4o-realtime-preview",
      };

      expect(isModelSessionTarget(target)).toBe(true);
      expect(isAgentSessionTarget(target)).toBe(false);
    });
  });

  describe("SessionTarget - Agent Mode", () => {
    it("should create a valid agent session target", () => {
      const target: SessionTarget = {
        agent: {
          agentId: "my-agent",
          projectName: "my-project",
        },
      };

      expect(target.agent).toBeDefined();
      expect(target.agent!.agentId).toBe("my-agent");
      expect(target.agent!.projectName).toBe("my-project");
      expect(target.model).toBeUndefined();
    });

    it("should be identified by isAgentSessionTarget", () => {
      const target: SessionTarget = {
        agent: {
          agentId: "my-agent",
          projectName: "my-project",
        },
      };

      expect(isAgentSessionTarget(target)).toBe(true);
      expect(isModelSessionTarget(target)).toBe(false);
    });
  });

  describe("Type Guard Functions", () => {
    it("isModelSessionTarget should return true for model targets", () => {
      const modelTarget: SessionTarget = { model: "gpt-4o" };
      expect(isModelSessionTarget(modelTarget)).toBe(true);
    });

    it("isModelSessionTarget should return false for agent targets", () => {
      const agentTarget: SessionTarget = {
        agent: { agentId: "id", projectName: "proj" },
      };
      expect(isModelSessionTarget(agentTarget)).toBe(false);
    });

    it("isAgentSessionTarget should return true for agent targets", () => {
      const agentTarget: SessionTarget = {
        agent: { agentId: "id", projectName: "proj" },
      };
      expect(isAgentSessionTarget(agentTarget)).toBe(true);
    });

    it("isAgentSessionTarget should return false for model targets", () => {
      const modelTarget: SessionTarget = { model: "gpt-4o" };
      expect(isAgentSessionTarget(modelTarget)).toBe(false);
    });

    it("should handle edge case of empty model string", () => {
      const target: SessionTarget = { model: "" };
      // Empty string is still a string, so it's technically a model target
      expect(isModelSessionTarget(target)).toBe(true);
      expect(isAgentSessionTarget(target)).toBe(false);
    });
  });

  describe("Discriminated Union Exhaustiveness", () => {
    it("should support exhaustive type checking pattern", () => {
      const handleTarget = (target: SessionTarget): string => {
        if (isModelSessionTarget(target)) {
          return `Model: ${target.model}`;
        } else if (isAgentSessionTarget(target)) {
          return `Agent: ${target.agent.agentId}`;
        }
        // TypeScript should catch if we miss a case
        const _exhaustive: never = target;
        return _exhaustive;
      };

      expect(handleTarget({ model: "gpt-4o" })).toBe("Model: gpt-4o");
      expect(handleTarget({ agent: { agentId: "a1", projectName: "p1" } })).toBe("Agent: a1");
    });
  });
});
