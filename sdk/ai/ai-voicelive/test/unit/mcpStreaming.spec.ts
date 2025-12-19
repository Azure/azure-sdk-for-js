// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Phase 2: MCP Streaming & Delta Accumulation Tests
 *
 * This test suite validates the streaming delta accumulation for MCP tool call arguments.
 * The protocol sends partial JSON strings via delta events which accumulate to form complete
 * arguments, signaled by a done event.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { MockVoiceLiveWebSocket, TestableVoiceLiveSession } from "../infrastructure/index.js";
import { TestSessionFactory, TestConstants } from "../infrastructure/index.js";

describe("MCP Streaming - Delta Accumulation", () => {
  let session: TestableVoiceLiveSession;
  let mockWebSocket: MockVoiceLiveWebSocket;

  beforeEach(async () => {
    const setup = TestSessionFactory.createSessionWithMockWebSocket();
    session = setup.session;
    mockWebSocket = setup.mockWebSocket;
    await mockWebSocket.connect(TestConstants.WS_ENDPOINT);
  });

  afterEach(() => {
    mockWebSocket.removeAllListeners();
    mockWebSocket.clearSentMessages();
  });

  describe("Single Delta Events", () => {
    it("should handle single delta event", async () => {
      const itemId = "item_single_delta";
      const responseId = "resp_single";
      const outputIndex = 0;
      const delta = '{"location": "San Francisco"}';
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedEvent = event;
      });

      const deltaEvent = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_single",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        delta: delta,
      });

      mockWebSocket.enqueueInboundMessage(deltaEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.type).toBe("response.mcp_call_arguments.delta");
      expect(receivedEvent.delta).toBe(delta);
      expect(receivedEvent.item_id).toBe(itemId);
      expect(receivedEvent.response_id).toBe(responseId);
      expect(receivedEvent.output_index).toBe(outputIndex);

      unsubscribe?.();
    });

    it("should handle empty delta event", async () => {
      const itemId = "item_empty";
      const responseId = "resp_empty";
      const outputIndex = 0;
      const delta = "";
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedEvent = event;
      });

      const deltaEvent = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_empty",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        delta: delta,
      });

      mockWebSocket.enqueueInboundMessage(deltaEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.delta).toBe("");

      unsubscribe?.();
    });
  });

  describe("Multiple Delta Accumulation", () => {
    it("should accumulate two sequential deltas", async () => {
      const itemId = "item_two_deltas";
      const responseId = "resp_two";
      const outputIndex = 0;
      const deltas = ['{"name":', '"value"}'];
      const receivedDeltas: string[] = [];

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedDeltas.push(event.delta);
      });

      for (let i = 0; i < deltas.length; i++) {
        const deltaEvent = JSON.stringify({
          type: "response.mcp_call_arguments.delta",
          event_id: `evt_two_${i}`,
          response_id: responseId,
          item_id: itemId,
          output_index: outputIndex,
          delta: deltas[i],
        });

        mockWebSocket.enqueueInboundMessage(deltaEvent);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      expect(receivedDeltas).toHaveLength(2);
      expect(receivedDeltas[0]).toBe('{"name":');
      expect(receivedDeltas[1]).toBe('"value"}');

      // Verify accumulated result is valid JSON
      const accumulated = receivedDeltas.join("");
      expect(accumulated).toBe('{"name":"value"}');
      const parsed = JSON.parse(accumulated);
      expect(parsed.name).toBe("value");

      unsubscribe?.();
    });

    it("should accumulate five sequential deltas", async () => {
      const itemId = "item_five_deltas";
      const responseId = "resp_five";
      const outputIndex = 0;
      const deltas = ['{"user":', '{"id":', "123,", '"name":', '"Alice"}}'];
      const receivedDeltas: string[] = [];

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedDeltas.push(event.delta);
      });

      for (let i = 0; i < deltas.length; i++) {
        const deltaEvent = JSON.stringify({
          type: "response.mcp_call_arguments.delta",
          event_id: `evt_five_${i}`,
          response_id: responseId,
          item_id: itemId,
          output_index: outputIndex,
          delta: deltas[i],
        });

        mockWebSocket.enqueueInboundMessage(deltaEvent);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      expect(receivedDeltas).toHaveLength(5);

      // Verify complete JSON after done event
      const doneEvent = JSON.stringify({
        type: "response.mcp_call_arguments.done",
        event_id: "evt_five_done",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        arguments: receivedDeltas.join(""),
      });

      let doneReceived: any = null;
      const doneUnsubscribe = session.onServerEvent?.(
        "response.mcp_call_arguments.done",
        (event) => {
          doneReceived = event;
        },
      );

      mockWebSocket.enqueueInboundMessage(doneEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(doneReceived).toBeTruthy();
      expect(doneReceived.arguments).toBeDefined();
      const parsed = JSON.parse(doneReceived.arguments);
      expect(parsed.user.id).toBe(123);
      expect(parsed.user.name).toBe("Alice");

      unsubscribe?.();
      doneUnsubscribe?.();
    });

    it("should handle ten rapid deltas (stress test)", async () => {
      const itemId = "item_ten_deltas";
      const responseId = "resp_ten";
      const outputIndex = 0;
      const deltas = [
        '{"items":[',
        '{"id":1',
        ',"name":"A"},',
        '{"id":2',
        ',"name":"B"},',
        '{"id":3',
        ',"name":"C"},',
        '{"id":4',
        ',"name":"D"}',
        "]}",
      ];
      const receivedDeltas: string[] = [];

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedDeltas.push(event.delta);
      });

      // Send all deltas rapidly
      for (let i = 0; i < deltas.length; i++) {
        const deltaEvent = JSON.stringify({
          type: "response.mcp_call_arguments.delta",
          event_id: `evt_ten_${i}`,
          response_id: responseId,
          item_id: itemId,
          output_index: outputIndex,
          delta: deltas[i],
        });

        mockWebSocket.enqueueInboundMessage(deltaEvent);
      }

      // Wait for all to process
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(receivedDeltas).toHaveLength(10);

      // Verify accumulated correctly
      const accumulated = receivedDeltas.join("");
      const parsed = JSON.parse(accumulated);
      expect(parsed.items).toHaveLength(4);
      expect(parsed.items[0].name).toBe("A");
      expect(parsed.items[3].name).toBe("D");

      unsubscribe?.();
    });
  });

  describe("Special Characters in Deltas", () => {
    it("should handle delta with escaped quotes", async () => {
      const itemId = "item_escaped";
      const responseId = "resp_escaped";
      const outputIndex = 0;
      const delta = '{"text":"He said \\"hello\\""}';
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedEvent = event;
      });

      const deltaEvent = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_escaped",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        delta: delta,
      });

      mockWebSocket.enqueueInboundMessage(deltaEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.delta).toContain('\\"');

      // Verify parsing works
      const parsed = JSON.parse(receivedEvent.delta);
      expect(parsed.text).toBe('He said "hello"');

      unsubscribe?.();
    });

    it("should handle delta with newlines", async () => {
      const itemId = "item_newlines";
      const responseId = "resp_newlines";
      const outputIndex = 0;
      const delta = '{"message":"Line 1\\nLine 2\\nLine 3"}';
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedEvent = event;
      });

      const deltaEvent = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_newlines",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        delta: delta,
      });

      mockWebSocket.enqueueInboundMessage(deltaEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.delta).toContain("\\n");

      // Verify newlines handled correctly
      const parsed = JSON.parse(receivedEvent.delta);
      expect(parsed.message).toContain("\n");
      expect(parsed.message.split("\n")).toHaveLength(3);

      unsubscribe?.();
    });

    it("should handle delta with unicode characters", async () => {
      const itemId = "item_unicode";
      const responseId = "resp_unicode";
      const outputIndex = 0;
      const delta = '{"emoji":"👋","text":"Hello 世界"}';
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedEvent = event;
      });

      const deltaEvent = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_unicode",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        delta: delta,
      });

      mockWebSocket.enqueueInboundMessage(deltaEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();

      // Verify unicode preserved
      const parsed = JSON.parse(receivedEvent.delta);
      expect(parsed.emoji).toBe("👋");
      expect(parsed.text).toBe("Hello 世界");

      unsubscribe?.();
    });
  });

  describe("Streaming Lifecycle", () => {
    it("should handle delta then done event", async () => {
      const itemId = "item_lifecycle";
      const responseId = "resp_lifecycle";
      const outputIndex = 0;
      const deltas = ['{"status":', '"complete"}'];
      const receivedDeltas: string[] = [];
      let doneReceived: any = null;

      const deltaUnsubscribe = session.onServerEvent?.(
        "response.mcp_call_arguments.delta",
        (event) => {
          receivedDeltas.push(event.delta);
        },
      );

      const doneUnsubscribe = session.onServerEvent?.(
        "response.mcp_call_arguments.done",
        (event) => {
          doneReceived = event;
        },
      );

      // Send deltas
      for (let i = 0; i < deltas.length; i++) {
        const deltaEvent = JSON.stringify({
          type: "response.mcp_call_arguments.delta",
          event_id: `evt_lifecycle_${i}`,
          response_id: responseId,
          item_id: itemId,
          output_index: outputIndex,
          delta: deltas[i],
        });

        mockWebSocket.enqueueInboundMessage(deltaEvent);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      // Send done
      const doneEvent = JSON.stringify({
        type: "response.mcp_call_arguments.done",
        event_id: "evt_lifecycle_done",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        arguments: receivedDeltas.join(""),
      });

      mockWebSocket.enqueueInboundMessage(doneEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedDeltas).toHaveLength(2);
      expect(doneReceived).toBeTruthy();
      expect(doneReceived.type).toBe("response.mcp_call_arguments.done");

      deltaUnsubscribe?.();
      doneUnsubscribe?.();
    });

    it("should validate arguments after done event", async () => {
      const itemId = "item_validate";
      const responseId = "resp_validate";
      const outputIndex = 0;
      const completeArgs = '{"tool":"search","query":"test","limit":10}';
      let doneReceived: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.done", (event) => {
        doneReceived = event;
      });

      const doneEvent = JSON.stringify({
        type: "response.mcp_call_arguments.done",
        event_id: "evt_validate_done",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        arguments: completeArgs,
      });

      mockWebSocket.enqueueInboundMessage(doneEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(doneReceived).toBeTruthy();
      expect(doneReceived.arguments).toBeDefined();

      // Validate complete JSON is valid
      const parsed = JSON.parse(doneReceived.arguments);
      expect(parsed.tool).toBe("search");
      expect(parsed.query).toBe("test");
      expect(parsed.limit).toBe(10);

      unsubscribe?.();
    });
  });

  describe("Advanced Streaming", () => {
    it("should handle obfuscated deltas", async () => {
      const itemId = "item_obfuscated";
      const responseId = "resp_obfuscated";
      const outputIndex = 0;
      const delta = '{"password":';
      const obfuscation = '{"password":"***"}';
      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedEvent = event;
      });

      const deltaEvent = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_obfuscated",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        delta: delta,
        obfuscation: obfuscation,
      });

      mockWebSocket.enqueueInboundMessage(deltaEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.delta).toBe(delta);
      expect(receivedEvent.obfuscation).toBe(obfuscation);

      unsubscribe?.();
    });

    it("should handle multiple output indices", async () => {
      const itemId = "item_multi_output";
      const responseId = "resp_multi_output";
      const receivedByIndex: Map<number, string[]> = new Map();

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        const index = event.output_index;
        if (!receivedByIndex.has(index)) {
          receivedByIndex.set(index, []);
        }
        receivedByIndex.get(index)!.push(event.delta);
      });

      // Send deltas for output_index 0
      const delta0Event = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_output_0",
        response_id: responseId,
        item_id: itemId,
        output_index: 0,
        delta: '{"output":0}',
      });

      // Send deltas for output_index 1
      const delta1Event = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_output_1",
        response_id: responseId,
        item_id: itemId,
        output_index: 1,
        delta: '{"output":1}',
      });

      mockWebSocket.enqueueInboundMessage(delta0Event);
      await new Promise((resolve) => setTimeout(resolve, 10));
      mockWebSocket.enqueueInboundMessage(delta1Event);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(receivedByIndex.size).toBe(2);
      expect(receivedByIndex.get(0)).toHaveLength(1);
      expect(receivedByIndex.get(1)).toHaveLength(1);
      expect(receivedByIndex.get(0)![0]).toContain('"output":0');
      expect(receivedByIndex.get(1)![0]).toContain('"output":1');

      unsubscribe?.();
    });

    it("should handle interleaved deltas from different calls", async () => {
      const responseId = "resp_interleaved";
      const itemIdA = "item_a";
      const itemIdB = "item_b";
      const outputIndex = 0;
      const receivedByItem: Map<string, string[]> = new Map();

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        const id = event.item_id;
        if (!receivedByItem.has(id)) {
          receivedByItem.set(id, []);
        }
        receivedByItem.get(id)!.push(event.delta);
      });

      // Interleave deltas from item A and B
      const events = [
        { item_id: itemIdA, delta: '{"a":' },
        { item_id: itemIdB, delta: '{"b":' },
        { item_id: itemIdA, delta: "1}" },
        { item_id: itemIdB, delta: "2}" },
      ];

      for (let i = 0; i < events.length; i++) {
        const event = events[i];
        const deltaEvent = JSON.stringify({
          type: "response.mcp_call_arguments.delta",
          event_id: `evt_interleaved_${i}`,
          response_id: responseId,
          item_id: event.item_id,
          output_index: outputIndex,
          delta: event.delta,
        });

        mockWebSocket.enqueueInboundMessage(deltaEvent);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      expect(receivedByItem.size).toBe(2);
      expect(receivedByItem.get(itemIdA)).toHaveLength(2);
      expect(receivedByItem.get(itemIdB)).toHaveLength(2);

      // Verify each accumulated separately
      const accumulatedA = receivedByItem.get(itemIdA)!.join("");
      const accumulatedB = receivedByItem.get(itemIdB)!.join("");
      expect(accumulatedA).toBe('{"a":1}');
      expect(accumulatedB).toBe('{"b":2}');

      unsubscribe?.();
    });
  });

  describe("Error Cases", () => {
    it("should handle done event without deltas", async () => {
      const itemId = "item_no_deltas";
      const responseId = "resp_no_deltas";
      const outputIndex = 0;
      let doneReceived: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.done", (event) => {
        doneReceived = event;
      });

      // Send done without any prior deltas (empty arguments)
      const doneEvent = JSON.stringify({
        type: "response.mcp_call_arguments.done",
        event_id: "evt_no_deltas_done",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
      });

      mockWebSocket.enqueueInboundMessage(doneEvent);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(doneReceived).toBeTruthy();
      expect(doneReceived.type).toBe("response.mcp_call_arguments.done");
      // arguments field may be undefined when no deltas were sent
      expect(doneReceived.arguments).toBeUndefined();

      unsubscribe?.();
    });

    it("should handle very large delta (>10KB)", async () => {
      const itemId = "item_large_delta";
      const responseId = "resp_large_delta";
      const outputIndex = 0;

      // Create a large JSON string (>10KB)
      const largeArray = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        description: "A".repeat(50),
      }));
      const largeDelta = JSON.stringify({ items: largeArray });

      expect(largeDelta.length).toBeGreaterThan(10000);

      let receivedEvent: any = null;

      const unsubscribe = session.onServerEvent?.("response.mcp_call_arguments.delta", (event) => {
        receivedEvent = event;
      });

      const deltaEvent = JSON.stringify({
        type: "response.mcp_call_arguments.delta",
        event_id: "evt_large",
        response_id: responseId,
        item_id: itemId,
        output_index: outputIndex,
        delta: largeDelta,
      });

      mockWebSocket.enqueueInboundMessage(deltaEvent);
      await new Promise((resolve) => setTimeout(resolve, 50));

      expect(receivedEvent).toBeTruthy();
      expect(receivedEvent.delta.length).toBeGreaterThan(10000);

      // Verify parsing still works
      const parsed = JSON.parse(receivedEvent.delta);
      expect(parsed.items).toHaveLength(1000);
      expect(parsed.items[0].id).toBe(0);
      expect(parsed.items[999].id).toBe(999);

      unsubscribe?.();
    });
  });
});
