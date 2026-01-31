// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * FoundryAgentTool and ToolUnion Serialization & Round-Trip Tests
 *
 * This test suite validates the serialization and deserialization of FoundryAgentTool
 * and the ToolUnion discriminated union to ensure proper JSON structure and field mapping
 * between TypeScript models and the wire protocol format.
 *
 * Tests cover:
 * - FoundryAgentTool serialization/deserialization
 * - FoundryAgentContextType enum
 * - ToolUnion discriminated union routing (function, mcp, foundry_agent)
 * - toolUnionArraySerializer/Deserializer for tools arrays
 */

import { describe, it, expect } from "vitest";
import type { FoundryAgentTool, FunctionTool, MCPServer, Tool } from "../../src/models/index.js";
import {
  foundryAgentToolSerializer,
  foundryAgentToolDeserializer,
  toolUnionSerializer,
  toolUnionDeserializer,
  toolUnionArraySerializer,
  toolUnionArrayDeserializer,
  functionToolSerializer,
  mcpServerSerializer,
  KnownFoundryAgentContextType,
  KnownToolType,
} from "../../src/models/models.js";

describe("FoundryAgentTool and ToolUnion - Serialization & Validation", () => {
  describe("FoundryAgentTool Serialization", () => {
    it("should serialize with all fields populated", () => {
      const tool: FoundryAgentTool = {
        type: KnownToolType.FoundryAgent,
        agentName: "test-agent",
        agentVersion: "1.0",
        projectName: "my-project",
        clientId: "client-123",
        description: "A helpful test agent",
        foundryResourceOverride: "custom-resource",
        agentContextType: KnownFoundryAgentContextType.AgentContext,
        returnAgentResponseDirectly: true,
      };

      const serialized = foundryAgentToolSerializer(tool);

      expect(serialized.type).toBe(KnownToolType.FoundryAgent);
      expect(serialized.agent_name).toBe("test-agent");
      expect(serialized.agent_version).toBe("1.0");
      expect(serialized.project_name).toBe("my-project");
      expect(serialized.client_id).toBe("client-123");
      expect(serialized.description).toBe("A helpful test agent");
      expect(serialized.foundry_resource_override).toBe("custom-resource");
      expect(serialized.agent_context_type).toBe(KnownFoundryAgentContextType.AgentContext);
      expect(serialized.return_agent_response_directly).toBe(true);
    });

    it("should serialize with minimal required fields", () => {
      const tool: FoundryAgentTool = {
        type: KnownToolType.FoundryAgent,
        agentName: "minimal-agent",
        projectName: "minimal-project",
      };

      const serialized = foundryAgentToolSerializer(tool);

      expect(serialized.type).toBe(KnownToolType.FoundryAgent);
      expect(serialized.agent_name).toBe("minimal-agent");
      expect(serialized.project_name).toBe("minimal-project");
      expect(serialized.agent_version).toBeUndefined();
      expect(serialized.client_id).toBeUndefined();
      expect(serialized.description).toBeUndefined();
      expect(serialized.foundry_resource_override).toBeUndefined();
      expect(serialized.agent_context_type).toBeUndefined();
      expect(serialized.return_agent_response_directly).toBeUndefined();
    });

    it("should serialize with no_context agent context type", () => {
      const tool: FoundryAgentTool = {
        type: KnownToolType.FoundryAgent,
        agentName: "no-context-agent",
        projectName: "project",
        agentContextType: KnownFoundryAgentContextType.NoContext,
      };

      const serialized = foundryAgentToolSerializer(tool);

      expect(serialized.type).toBe(KnownToolType.FoundryAgent);
      expect(serialized.agent_name).toBe("no-context-agent");
      expect(serialized.project_name).toBe("project");
      expect(serialized.agent_context_type).toBe(KnownFoundryAgentContextType.NoContext);
    });

    it("should serialize with returnAgentResponseDirectly as false", () => {
      const tool: FoundryAgentTool = {
        type: KnownToolType.FoundryAgent,
        agentName: "rewrite-agent",
        projectName: "project",
        returnAgentResponseDirectly: false,
      };

      const serialized = foundryAgentToolSerializer(tool);

      expect(serialized.type).toBe(KnownToolType.FoundryAgent);
      expect(serialized.agent_name).toBe("rewrite-agent");
      expect(serialized.project_name).toBe("project");
      expect(serialized.return_agent_response_directly).toBe(false);
    });

    it("should deserialize from wire format correctly", () => {
      const wireFormat = {
        type: KnownToolType.FoundryAgent,
        agent_name: "wire-agent",
        agent_version: "2.0",
        project_name: "wire-project",
        client_id: "wire-client",
        description: "Deserialized agent",
        foundry_resource_override: "wire-resource",
        agent_context_type: KnownFoundryAgentContextType.AgentContext,
        return_agent_response_directly: true,
      };

      const deserialized = foundryAgentToolDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownToolType.FoundryAgent);
      expect(deserialized.agentName).toBe("wire-agent");
      expect(deserialized.agentVersion).toBe("2.0");
      expect(deserialized.projectName).toBe("wire-project");
      expect(deserialized.clientId).toBe("wire-client");
      expect(deserialized.description).toBe("Deserialized agent");
      expect(deserialized.foundryResourceOverride).toBe("wire-resource");
      expect(deserialized.agentContextType).toBe(KnownFoundryAgentContextType.AgentContext);
      expect(deserialized.returnAgentResponseDirectly).toBe(true);
    });

    it("should round-trip preserve all fields", () => {
      const original: FoundryAgentTool = {
        type: KnownToolType.FoundryAgent,
        agentName: "roundtrip-agent",
        agentVersion: "3.0",
        projectName: "roundtrip-project",
        clientId: "rt-client",
        description: "Roundtrip test agent",
        foundryResourceOverride: "rt-resource",
        agentContextType: KnownFoundryAgentContextType.NoContext,
        returnAgentResponseDirectly: false,
      };

      const serialized = foundryAgentToolSerializer(original);
      const deserialized = foundryAgentToolDeserializer(serialized);

      expect(deserialized.type).toBe(original.type);
      expect(deserialized.agentName).toBe(original.agentName);
      expect(deserialized.agentVersion).toBe(original.agentVersion);
      expect(deserialized.projectName).toBe(original.projectName);
      expect(deserialized.clientId).toBe(original.clientId);
      expect(deserialized.description).toBe(original.description);
      expect(deserialized.foundryResourceOverride).toBe(original.foundryResourceOverride);
      expect(deserialized.agentContextType).toBe(original.agentContextType);
      expect(deserialized.returnAgentResponseDirectly).toBe(original.returnAgentResponseDirectly);
    });

    it("should handle special characters in string fields", () => {
      const tool: FoundryAgentTool = {
        type: KnownToolType.FoundryAgent,
        agentName: "agent-with-special_chars.v1",
        projectName: "project/with/slashes",
        description: 'Description with "quotes" and unicode: 日本語',
      };

      const serialized = foundryAgentToolSerializer(tool);
      const deserialized = foundryAgentToolDeserializer(serialized);

      expect(deserialized.type).toBe(KnownToolType.FoundryAgent);
      expect(deserialized.agentName).toBe("agent-with-special_chars.v1");
      expect(deserialized.projectName).toBe("project/with/slashes");
      expect(deserialized.description).toBe('Description with "quotes" and unicode: 日本語');
    });
  });

  describe("FoundryAgentContextType Enum", () => {
    it("should have all expected enum values", () => {
      expect(KnownFoundryAgentContextType.NoContext).toBe("no_context");
      expect(KnownFoundryAgentContextType.AgentContext).toBe("agent_context");
    });

    it("should serialize using enum values", () => {
      const tool: FoundryAgentTool = {
        type: KnownToolType.FoundryAgent,
        agentName: "enum-agent",
        projectName: "project",
        agentContextType: KnownFoundryAgentContextType.AgentContext,
      };

      const serialized = foundryAgentToolSerializer(tool);

      expect(serialized.agent_context_type).toBe("agent_context");
    });
  });

  describe("ToolType Enum", () => {
    it("should have foundry_agent in KnownToolType", () => {
      expect(KnownToolType.FoundryAgent).toBe(KnownToolType.FoundryAgent);
      expect(KnownToolType.Function).toBe(KnownToolType.Function);
      expect(KnownToolType.Mcp).toBe(KnownToolType.Mcp);
    });
  });

  describe("ToolUnion Discriminated Union Serialization", () => {
    it("should route function type to functionToolSerializer", () => {
      const functionTool: FunctionTool = {
        type: KnownToolType.Function,
        name: "get_weather",
        description: "Get current weather",
        parameters: {
          type: "object",
          properties: {
            location: { type: "string" },
          },
        },
      };

      const serialized = toolUnionSerializer(functionTool);

      expect(serialized.type).toBe(KnownToolType.Function);
      expect(serialized.name).toBe("get_weather");
      expect(serialized.description).toBe("Get current weather");
    });

    it("should route mcp type to mcpServerSerializer", () => {
      const mcpServer: MCPServer = {
        type: KnownToolType.Mcp,
        serverLabel: "test-mcp",
        serverUrl: "https://mcp.example.com",
      };

      const serialized = toolUnionSerializer(mcpServer);

      expect(serialized.type).toBe(KnownToolType.Mcp);
      expect(serialized.server_label).toBe("test-mcp");
      expect(serialized.server_url).toBe("https://mcp.example.com");
    });

    it("should route foundry_agent type to foundryAgentToolSerializer", () => {
      const foundryTool: FoundryAgentTool = {
        type: KnownToolType.FoundryAgent,
        agentName: "union-agent",
        projectName: "union-project",
        description: "Agent via union",
      };

      const serialized = toolUnionSerializer(foundryTool);

      expect(serialized.type).toBe(KnownToolType.FoundryAgent);
      expect(serialized.agent_name).toBe("union-agent");
      expect(serialized.project_name).toBe("union-project");
      expect(serialized.description).toBe("Agent via union");
    });

    it("should handle unknown type gracefully (fallback to base)", () => {
      const unknownTool: Tool = {
        type: "future_tool_type" as any,
      };

      const serialized = toolUnionSerializer(unknownTool);

      expect(serialized.type).toBe("future_tool_type");
    });
  });

  describe("ToolUnion Discriminated Union Deserialization", () => {
    it("should deserialize function type correctly", () => {
      const wireFormat = {
        type: KnownToolType.Function,
        name: "calculate",
        description: "Perform calculation",
        parameters: { type: "object" },
      };

      const deserialized = toolUnionDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownToolType.Function);
      expect((deserialized as FunctionTool).name).toBe("calculate");
      expect((deserialized as FunctionTool).description).toBe("Perform calculation");
    });

    it("should deserialize mcp type correctly", () => {
      const wireFormat = {
        type: KnownToolType.Mcp,
        server_label: "deserialize-mcp",
        server_url: "https://deserialize.example.com",
      };

      const deserialized = toolUnionDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownToolType.Mcp);
      expect((deserialized as MCPServer).serverLabel).toBe("deserialize-mcp");
      expect((deserialized as MCPServer).serverUrl).toBe("https://deserialize.example.com");
    });

    it("should deserialize foundry_agent type correctly", () => {
      const wireFormat = {
        type: KnownToolType.FoundryAgent,
        agent_name: "deserialize-agent",
        project_name: "deserialize-project",
        agent_context_type: KnownFoundryAgentContextType.AgentContext,
      };

      const deserialized = toolUnionDeserializer(wireFormat);

      expect(deserialized.type).toBe(KnownToolType.FoundryAgent);
      expect((deserialized as FoundryAgentTool).agentName).toBe("deserialize-agent");
      expect((deserialized as FoundryAgentTool).projectName).toBe("deserialize-project");
      expect((deserialized as FoundryAgentTool).agentContextType).toBe(
        KnownFoundryAgentContextType.AgentContext,
      );
    });
  });

  describe("toolUnionArraySerializer/Deserializer", () => {
    it("should serialize mixed array of tools", () => {
      const tools = [
        {
          type: KnownToolType.Function,
          name: "func1",
          parameters: {},
        } as FunctionTool,
        {
          type: KnownToolType.Mcp,
          serverLabel: "mcp1",
          serverUrl: "https://mcp1.example.com",
        } as MCPServer,
        {
          type: KnownToolType.FoundryAgent,
          agentName: "agent1",
          projectName: "project1",
        } as FoundryAgentTool,
      ];

      const serialized = toolUnionArraySerializer(tools);

      expect(serialized).toHaveLength(3);
      expect(serialized[0].type).toBe(KnownToolType.Function);
      expect(serialized[0].name).toBe("func1");
      expect(serialized[1].type).toBe(KnownToolType.Mcp);
      expect(serialized[1].server_label).toBe("mcp1");
      expect(serialized[2].type).toBe(KnownToolType.FoundryAgent);
      expect(serialized[2].agent_name).toBe("agent1");
    });

    it("should deserialize mixed array of tools", () => {
      const wireFormat = [
        { type: KnownToolType.Function, name: "wire-func", parameters: {} },
        {
          type: KnownToolType.Mcp,
          server_label: "wire-mcp",
          server_url: "https://wire.example.com",
        },
        {
          type: KnownToolType.FoundryAgent,
          agent_name: "wire-agent",
          project_name: "wire-project",
        },
      ];

      const deserialized = toolUnionArrayDeserializer(wireFormat);

      expect(deserialized).toHaveLength(3);
      expect(deserialized[0].type).toBe(KnownToolType.Function);
      expect((deserialized[0] as FunctionTool).name).toBe("wire-func");
      expect(deserialized[1].type).toBe(KnownToolType.Mcp);
      expect((deserialized[1] as MCPServer).serverLabel).toBe("wire-mcp");
      expect((deserialized[1] as MCPServer).serverUrl).toBe("https://wire.example.com");
      expect(deserialized[2].type).toBe(KnownToolType.FoundryAgent);
      expect((deserialized[2] as FoundryAgentTool).agentName).toBe("wire-agent");
      expect((deserialized[2] as FoundryAgentTool).projectName).toBe("wire-project");
    });

    it("should handle empty tools array", () => {
      const serialized = toolUnionArraySerializer([]);
      expect(serialized).toEqual([]);

      const deserialized = toolUnionArrayDeserializer([]);
      expect(deserialized).toEqual([]);
    });

    it("should round-trip preserve mixed tools array", () => {
      const original = [
        {
          type: KnownToolType.FoundryAgent,
          agentName: "rt-agent-1",
          projectName: "rt-project",
          agentContextType: KnownFoundryAgentContextType.AgentContext,
        } as FoundryAgentTool,
        {
          type: KnownToolType.FoundryAgent,
          agentName: "rt-agent-2",
          projectName: "rt-project",
          agentContextType: KnownFoundryAgentContextType.NoContext,
          returnAgentResponseDirectly: true,
        } as FoundryAgentTool,
      ];

      const serialized = toolUnionArraySerializer(original);
      const deserialized = toolUnionArrayDeserializer(serialized);

      expect(deserialized).toHaveLength(2);
      expect((deserialized[0] as FoundryAgentTool).type).toBe(KnownToolType.FoundryAgent);
      expect((deserialized[0] as FoundryAgentTool).agentName).toBe("rt-agent-1");
      expect((deserialized[0] as FoundryAgentTool).projectName).toBe("rt-project");
      expect((deserialized[0] as FoundryAgentTool).agentContextType).toBe(
        KnownFoundryAgentContextType.AgentContext,
      );
      expect((deserialized[1] as FoundryAgentTool).type).toBe(KnownToolType.FoundryAgent);
      expect((deserialized[1] as FoundryAgentTool).agentName).toBe("rt-agent-2");
      expect((deserialized[1] as FoundryAgentTool).agentContextType).toBe(
        KnownFoundryAgentContextType.NoContext,
      );
      expect((deserialized[1] as FoundryAgentTool).returnAgentResponseDirectly).toBe(true);
    });

    it("should handle array with many tools (stress test)", () => {
      const manyTools: FoundryAgentTool[] = Array.from({ length: 50 }, (_, i) => ({
        type: KnownToolType.FoundryAgent as const,
        agentName: `agent-${i}`,
        projectName: `project-${i}`,
      }));

      const serialized = toolUnionArraySerializer(manyTools);
      const deserialized = toolUnionArrayDeserializer(serialized);

      expect(deserialized).toHaveLength(50);
      expect((deserialized[0] as FoundryAgentTool).type).toBe(KnownToolType.FoundryAgent);
      expect((deserialized[0] as FoundryAgentTool).agentName).toBe("agent-0");
      expect((deserialized[0] as FoundryAgentTool).projectName).toBe("project-0");
      expect((deserialized[49] as FoundryAgentTool).agentName).toBe("agent-49");
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string fields in FoundryAgentTool", () => {
      const tool: FoundryAgentTool = {
        type: "foundry_agent",
        agentName: "",
        projectName: "",
        description: "",
      };

      const serialized = foundryAgentToolSerializer(tool);
      const deserialized = foundryAgentToolDeserializer(serialized);

      expect(deserialized.agentName).toBe("");
      expect(deserialized.projectName).toBe("");
      expect(deserialized.description).toBe("");
    });

    it("should handle very long string fields", () => {
      const longString = "A".repeat(10000);
      const tool: FoundryAgentTool = {
        type: "foundry_agent",
        agentName: longString,
        projectName: "project",
        description: longString,
      };

      const serialized = foundryAgentToolSerializer(tool);
      const deserialized = foundryAgentToolDeserializer(serialized);

      expect(deserialized.agentName).toBe(longString);
      expect(deserialized.description).toBe(longString);
    });
  });
});
