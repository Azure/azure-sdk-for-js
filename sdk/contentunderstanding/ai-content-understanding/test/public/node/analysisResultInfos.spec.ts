// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { analysisResultDeserializer } from "../../../src/models/models.js";

describe("AnalysisResult.infos deserialization", () => {
  const llmStatsMessage =
    "completion calls: 2; embedding calls: 1; avg completion latency: 5.75s; total completion latency: 11.50s; avg embedding latency: 0.94s; total embedding latency: 0.94s";

  it("deserializes infos from a prebuilt-invoice response", () => {
    const payload = {
      analyzerId: "prebuilt-invoice",
      apiVersion: "2026-06-01-preview",
      infos: [
        {
          code: "LLMStats",
          message: llmStatsMessage,
        },
      ],
      contents: [
        {
          kind: "document",
          mimeType: "application/pdf",
          analyzerId: "prebuilt-invoice",
          markdown: "# CONTOSO INVOICE",
          startPageNumber: 1,
          endPageNumber: 1,
          unit: "inch",
        },
      ],
    };

    const result = analysisResultDeserializer(payload);

    assert.ok(result.infos, "infos should be populated");
    assert.equal(result.infos!.length, 1);
    assert.equal(result.infos![0].code, "LLMStats");
    assert.equal(result.infos![0].message, llmStatsMessage);
    assert.equal(result.contents.length, 1);
    assert.equal(result.contents[0].kind, "document");
    assert.equal(result.contents[0].analyzerId, "prebuilt-invoice");
  });

  it("leaves infos undefined when the response omits the field", () => {
    const payload = {
      analyzerId: "prebuilt-invoice",
      apiVersion: "2026-06-01-preview",
      contents: [] as unknown[],
    };

    const result = analysisResultDeserializer(payload);

    assert.isUndefined(result.infos, "infos should be undefined when not returned by the service");
    assert.deepEqual(result.contents, [], "contents should round-trip as an empty array");
  });
});
