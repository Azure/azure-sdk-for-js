// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Serialization & deserialization tests for the web-search and
 * file-search tool surface added in GA 1.0.0 (api-version 2026-04-10).
 *
 * Covers response items, server event lifecycle (searching →
 * in_progress → completed) for both web search and file search, the
 * `FileSearchResult` payload, and the `Action*` content types.
 *
 * Focus: camelCase ↔ snake_case wire mapping (the same class of bug
 * fixed in 1.0.0-beta.4 for `voiceSerializer`).
 */

import { describe, it, expect } from "vitest";
import {
  responseWebSearchCallItemDeserializer,
  responseFileSearchCallItemDeserializer,
  fileSearchResultDeserializer,
  serverEventResponseWebSearchCallSearchingDeserializer,
  serverEventResponseWebSearchCallInProgressDeserializer,
  serverEventResponseWebSearchCallCompletedDeserializer,
  serverEventResponseFileSearchCallSearchingDeserializer,
  serverEventResponseFileSearchCallInProgressDeserializer,
  serverEventResponseFileSearchCallCompletedDeserializer,
  actionSearchSourceDeserializer,
  actionSearchDeserializer,
  actionOpenPageDeserializer,
  actionFindDeserializer,
} from "../../src/models/models.js";

describe("Web search & file search models (GA 1.0.0)", () => {
  describe("ResponseWebSearchCallItem", () => {
    it("deserializes web_search_call item", () => {
      const item = responseWebSearchCallItemDeserializer({
        type: "web_search_call",
        id: "ws-1",
        object: "response.item",
        status: "completed",
      });

      expect(item.type).toBe("web_search_call");
      expect(item.id).toBe("ws-1");
      expect(item.status).toBe("completed");
    });
  });

  describe("ResponseFileSearchCallItem", () => {
    it("deserializes file_search_call item with nested results", () => {
      const item = responseFileSearchCallItemDeserializer({
        type: "file_search_call",
        id: "fs-1",
        object: "response.item",
        queries: ["azure docs", "tracing"],
        status: "completed",
        results: [
          { file_id: "f-1", filename: "a.md", score: 0.9 },
          { file_id: "f-2", filename: "b.md", score: 0.8 },
        ],
      });

      expect(item.id).toBe("fs-1");
      expect(item.queries).toEqual(["azure docs", "tracing"]);
      expect(item.results).toHaveLength(2);
      expect(item.results?.[0].fileId).toBe("f-1");
      expect(item.results?.[1].fileId).toBe("f-2");
    });

    it("preserves missing optional results array", () => {
      const item = responseFileSearchCallItemDeserializer({
        type: "file_search_call",
        id: "fs-2",
        status: "in_progress",
      });
      expect(item.results).toBeUndefined();
      expect(item.queries).toBeUndefined();
    });
  });

  describe("FileSearchResult", () => {
    it("maps file_id (snake) to fileId (camel) and preserves optional fields", () => {
      const result = fileSearchResultDeserializer({
        attributes: { tag: "policy" },
        file_id: "file-123",
        filename: "doc.pdf",
        score: 0.92,
        text: "matched snippet",
      });

      expect(result.fileId).toBe("file-123");
      expect(result.filename).toBe("doc.pdf");
      expect(result.score).toBe(0.92);
      expect(result.text).toBe("matched snippet");
      expect(result.attributes).toEqual({ tag: "policy" });
    });
  });

  describe("Web search server event lifecycle", () => {
    const webPayload = {
      event_id: "evt-1",
      response_id: "resp-1",
      item_id: "item-1",
      output_index: 0,
      sequence_number: 3,
    };

    it("maps fields for response.web_search_call.searching", () => {
      const evt = serverEventResponseWebSearchCallSearchingDeserializer({
        ...webPayload,
        type: "response.web_search_call.searching",
      });
      expect(evt.eventId).toBe("evt-1");
      expect(evt.responseId).toBe("resp-1");
      expect(evt.itemId).toBe("item-1");
      expect(evt.outputIndex).toBe(0);
      expect(evt.sequenceNumber).toBe(3);
    });

    it("maps fields for response.web_search_call.in_progress", () => {
      const evt = serverEventResponseWebSearchCallInProgressDeserializer({
        ...webPayload,
        type: "response.web_search_call.in_progress",
      });
      expect(evt.responseId).toBe("resp-1");
      expect(evt.sequenceNumber).toBe(3);
    });

    it("maps fields for response.web_search_call.completed", () => {
      const evt = serverEventResponseWebSearchCallCompletedDeserializer({
        ...webPayload,
        type: "response.web_search_call.completed",
      });
      expect(evt.itemId).toBe("item-1");
      expect(evt.outputIndex).toBe(0);
    });
  });

  describe("File search server event lifecycle", () => {
    const filePayload = {
      event_id: "evt-2",
      response_id: "resp-2",
      item_id: "item-2",
      output_index: 1,
      sequence_number: 5,
    };

    it("maps fields for response.file_search_call.searching", () => {
      const evt = serverEventResponseFileSearchCallSearchingDeserializer({
        ...filePayload,
        type: "response.file_search_call.searching",
      });
      expect(evt.eventId).toBe("evt-2");
      expect(evt.responseId).toBe("resp-2");
      expect(evt.outputIndex).toBe(1);
      expect(evt.sequenceNumber).toBe(5);
    });

    it("maps fields for response.file_search_call.in_progress", () => {
      const evt = serverEventResponseFileSearchCallInProgressDeserializer({
        ...filePayload,
        type: "response.file_search_call.in_progress",
      });
      expect(evt.itemId).toBe("item-2");
    });

    it("maps fields for response.file_search_call.completed", () => {
      const evt = serverEventResponseFileSearchCallCompletedDeserializer({
        ...filePayload,
        type: "response.file_search_call.completed",
      });
      expect(evt.responseId).toBe("resp-2");
      expect(evt.sequenceNumber).toBe(5);
    });
  });

  describe("Action* deserializers", () => {
    it("deserializes ActionSearchSource", () => {
      const src = actionSearchSourceDeserializer({
        type: "url",
        url: "https://example.com",
      });
      expect(src.type).toBe("url");
      expect(src.url).toBe("https://example.com");
    });

    it("deserializes ActionSearch with nested sources", () => {
      const action = actionSearchDeserializer({
        type: "search",
        query: "azure tracing",
        sources: [
          { type: "url", url: "https://a.example" },
          { type: "url", url: "https://b.example" },
        ],
      });
      expect(action.query).toBe("azure tracing");
      expect(action.sources).toHaveLength(2);
      expect(action.sources?.[0].url).toBe("https://a.example");
    });

    it("deserializes ActionOpenPage", () => {
      const action = actionOpenPageDeserializer({
        type: "open_page",
        url: "https://docs.example.com/page",
      });
      expect(action.type).toBe("open_page");
      expect(action.url).toBe("https://docs.example.com/page");
    });

    it("deserializes ActionFind", () => {
      const action = actionFindDeserializer({
        type: "find",
        pattern: "tracing",
        url: "https://docs.example.com/page",
      });
      expect(action.type).toBe("find");
      expect(action.pattern).toBe("tracing");
      expect(action.url).toBe("https://docs.example.com/page");
    });
  });
});
