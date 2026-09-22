// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Hermetic wire-routing tests for the analyze operation family.
 *
 * The JS SDK exposes analyze/analyzeBinary/analyzeInline/analyzeBinaryInline
 * as `(requiredArgs..., options?: OptionalParams)`, where `contentType` is
 * a field on the binary options bags (default `application/octet-stream`).
 * This test suite locks in that every settable field on the options bag
 * actually reaches the outgoing HTTP request — either as a query-string
 * parameter (`contentRange` → `range=`, `processingLocation`,
 * `allowInputTruncation`), on the request body (`modelDeployments`), on
 * the URL path (`analyzerId`), or as a request header (`contentType`).
 *
 * `analyzeBinary` also keeps a `@deprecated` positional-`contentType`
 * overload for source compatibility; the last describe block covers that
 * legacy shape plus the `TypeError` guard for conflicting positional and
 * options-bag values. `analyzeBinaryInline` is preview-only and does not
 * carry the deprecated overload.
 *
 * TypeScript has no compile-time overload-resolution hazard equivalent to the CS0121 case
 * that motivates similar tests in other language SDKs, so the JS tests focus on the runtime
 * concern that survives: that per-request options bag settings actually round-trip to the
 * wire.
 */

import { describe, it, assert } from "vitest";
import { AzureKeyCredential } from "@azure/core-auth";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { ContentUnderstandingClient, KnownVersions } from "../../../src/index.js";

const SUCCEEDED_INLINE_BODY = JSON.stringify({
  status: "Succeeded",
  result: {
    analyzerId: "prebuilt-layout",
    apiVersion: "2026-06-01-preview",
    createdAt: "2026-07-29T00:00:00Z",
    contents: [{ kind: "document", markdown: "# Test", startPageNumber: 1, endPageNumber: 1 }],
  },
});

/** Records every outgoing request and returns a canned success response. */
function createRecordingClient(mode: "lro" | "inline"): {
  client: ContentUnderstandingClient;
  requests: PipelineRequest[];
} {
  const requests: PipelineRequest[] = [];
  const httpClient: HttpClient = {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      requests.push(request);
      if (mode === "lro") {
        // LRO: return 202 with operation-location so the LRO poller starts polling.
        return {
          request,
          status: 202,
          headers: createHttpHeaders({
            "operation-location":
              "https://example.services.ai.azure.com/contentunderstanding/analyzerResults/op-123",
          }),
          bodyAsText: "",
        };
      }
      // Inline: return 200 with the Succeeded envelope.
      return {
        request,
        status: 200,
        headers: createHttpHeaders({ "content-type": "application/json" }),
        bodyAsText: SUCCEEDED_INLINE_BODY,
      };
    },
  };
  const client = new ContentUnderstandingClient(
    "https://example.services.ai.azure.com",
    new AzureKeyCredential("fake-key"),
    {
      apiVersion: KnownVersions.V20260601Preview,
      httpClient,
    },
  );
  return { client, requests };
}

function query(request: PipelineRequest): string {
  return decodeURIComponent(new URL(request.url).search);
}

describe("Analyze options-bag wire routing", () => {
  describe("analyzeBinaryInline", () => {
    it("omits range / processingLocation / allowInputTruncation when the options bag is empty", async () => {
      const { client, requests } = createRecordingClient("inline");
      await client.analyzeBinaryInline("prebuilt-layout", new Uint8Array([1, 2, 3]), {
        contentType: "application/pdf",
      });

      assert.equal(requests.length, 1);
      const q = query(requests[0]);
      assert.notInclude(q, "range=", "range must not appear when contentRange omitted");
      assert.notInclude(
        q,
        "processingLocation=",
        "processingLocation must not appear when omitted",
      );
      assert.notInclude(
        q,
        "allowInputTruncation=",
        "allowInputTruncation must not appear when omitted",
      );
      assert.include(requests[0].url, "/analyzers/prebuilt-layout:analyzeBinaryInline");
      assert.equal(
        requests[0].headers.get("content-type"),
        "application/pdf",
        "content-type header should follow options.contentType",
      );
    });

    it("passes contentRange / processingLocation / allowInputTruncation on the query string", async () => {
      const { client, requests } = createRecordingClient("inline");
      await client.analyzeBinaryInline("sync-analyzer", new Uint8Array([1, 2, 3]), {
        contentType: "application/pdf",
        contentRange: "2",
        processingLocation: "geography",
        allowInputTruncation: true,
      });

      const q = query(requests[0]);
      assert.include(requests[0].url, "/analyzers/sync-analyzer:analyzeBinaryInline");
      assert.include(q, "range=2");
      assert.include(q, "processingLocation=geography");
      assert.include(q, "allowInputTruncation=true");
      assert.equal(
        requests[0].headers.get("content-type"),
        "application/pdf",
        "content-type header should follow options.contentType",
      );
    });

    it("defaults content-type to application/octet-stream when options.contentType is omitted", async () => {
      const { client, requests } = createRecordingClient("inline");
      await client.analyzeBinaryInline("prebuilt-layout", new Uint8Array([1, 2, 3]));

      assert.equal(
        requests[0].headers.get("content-type"),
        "application/octet-stream",
        "default content-type should be application/octet-stream",
      );
    });
  });

  describe("analyzeInline (JSON)", () => {
    it("omits per-request options from the query when the options bag is empty", async () => {
      const { client, requests } = createRecordingClient("inline");
      await client.analyzeInline("prebuilt-layout", [{ url: "https://example.com/a.pdf" }]);

      const q = query(requests[0]);
      assert.notInclude(q, "processingLocation=");
      assert.notInclude(q, "allowInputTruncation=");
      assert.include(requests[0].url, "/analyzers/prebuilt-layout:analyzeInline");
    });

    it("passes processingLocation / allowInputTruncation on the query string", async () => {
      const { client, requests } = createRecordingClient("inline");
      await client.analyzeInline("json-analyzer", [{ url: "https://example.com/a.pdf" }], {
        processingLocation: "geography",
        allowInputTruncation: false,
      });

      const q = query(requests[0]);
      assert.include(q, "processingLocation=geography");
      assert.include(q, "allowInputTruncation=false");
      assert.include(requests[0].url, "/analyzers/json-analyzer:analyzeInline");
    });
  });

  describe("analyzeBinary (LRO)", () => {
    it("omits range from the query when contentRange is not set", async () => {
      const { client, requests } = createRecordingClient("lro");
      const poller = client.analyzeBinary("prebuilt-layout", new Uint8Array([1, 2, 3]), {
        contentType: "application/pdf",
      });
      // Kick off the initial request without polling to completion.
      await poller.poll();

      const q = query(requests[0]);
      assert.notInclude(q, "range=");
      assert.include(requests[0].url, "/analyzers/prebuilt-layout:analyzeBinary");
      assert.equal(
        requests[0].headers.get("content-type"),
        "application/pdf",
        "content-type header should follow options.contentType",
      );
    });

    it("passes contentRange / allowInputTruncation on the query string", async () => {
      const { client, requests } = createRecordingClient("lro");
      const poller = client.analyzeBinary("options-analyzer", new Uint8Array([1, 2, 3]), {
        contentType: "application/pdf",
        contentRange: "2-3",
        allowInputTruncation: false,
      });
      await poller.poll();

      const q = query(requests[0]);
      assert.include(q, "range=2-3");
      assert.include(q, "allowInputTruncation=false");
      assert.include(requests[0].url, "/analyzers/options-analyzer:analyzeBinary");
    });

    it("defaults content-type to application/octet-stream when options.contentType is omitted", async () => {
      const { client, requests } = createRecordingClient("lro");
      const poller = client.analyzeBinary("prebuilt-layout", new Uint8Array([1, 2, 3]));
      await poller.poll();

      assert.equal(
        requests[0].headers.get("content-type"),
        "application/octet-stream",
        "default content-type should be application/octet-stream",
      );
    });
  });

  describe("analyzeBinary deprecated positional contentType (back-compat)", () => {
    it("still accepts a positional contentType string", async () => {
      const { client, requests } = createRecordingClient("lro");
      const poller = client.analyzeBinary(
        "prebuilt-layout",
        new Uint8Array([1, 2, 3]),
        "application/pdf",
      );
      await poller.poll();

      assert.equal(
        requests[0].headers.get("content-type"),
        "application/pdf",
        "deprecated positional contentType should still reach the wire",
      );
    });

    it("accepts positional contentType together with an options bag", async () => {
      const { client, requests } = createRecordingClient("lro");
      const poller = client.analyzeBinary(
        "prebuilt-layout",
        new Uint8Array([1, 2, 3]),
        "application/pdf",
        { contentRange: "1-2" },
      );
      await poller.poll();

      const q = query(requests[0]);
      assert.include(q, "range=1-2");
      assert.equal(requests[0].headers.get("content-type"), "application/pdf");
    });

    it("treats a positional undefined as 'omit contentType' (falls back to default)", async () => {
      const { client, requests } = createRecordingClient("lro");
      const poller = client.analyzeBinary("prebuilt-layout", new Uint8Array([1, 2, 3]), undefined, {
        contentRange: "1-2",
      });
      await poller.poll();

      assert.equal(
        requests[0].headers.get("content-type"),
        "application/octet-stream",
        "undefined positional should not override the default",
      );
    });

    it("allows positional contentType equal to options.contentType", async () => {
      const { client, requests } = createRecordingClient("lro");
      const poller = client.analyzeBinary(
        "prebuilt-layout",
        new Uint8Array([1, 2, 3]),
        "application/pdf",
        { contentType: "application/pdf", contentRange: "1-2" },
      );
      await poller.poll();

      assert.equal(requests[0].headers.get("content-type"), "application/pdf");
    });

    it("throws TypeError when positional contentType conflicts with options.contentType", () => {
      const { client, requests } = createRecordingClient("lro");
      assert.throws(
        () =>
          client.analyzeBinary("prebuilt-layout", new Uint8Array([1, 2, 3]), "application/pdf", {
            contentType: "image/png",
            contentRange: "1-2",
          }),
        TypeError,
        /conflicting `contentType` values/,
      );
      assert.equal(requests.length, 0, "no HTTP request should be issued when the args conflict");
    });
  });

  describe("analyze (JSON, LRO)", () => {
    it("passes processingLocation / allowInputTruncation on the query string", async () => {
      const { client, requests } = createRecordingClient("lro");
      const poller = client.analyze("json-lro-analyzer", [{ url: "https://example.com/a.pdf" }], {
        processingLocation: "geography",
        allowInputTruncation: true,
      });
      await poller.poll();

      const q = query(requests[0]);
      assert.include(q, "processingLocation=geography");
      assert.include(q, "allowInputTruncation=true");
      assert.include(requests[0].url, "/analyzers/json-lro-analyzer:analyze");
    });

    it("carries modelDeployments through in the request body (not query string)", async () => {
      const { client, requests } = createRecordingClient("lro");
      const poller = client.analyze("json-lro-analyzer", [{ url: "https://example.com/a.pdf" }], {
        modelDeployments: { completion: "gpt-5.2" },
      });
      await poller.poll();

      const q = query(requests[0]);
      assert.notInclude(
        q,
        "modelDeployments=",
        "modelDeployments belongs in the body, not the query",
      );
      const body = requests[0].body;
      const bodyText = typeof body === "string" ? body : JSON.stringify(body);
      assert.include(
        bodyText,
        '"modelDeployments"',
        "modelDeployments should appear in the JSON body",
      );
      assert.include(bodyText, '"gpt-5.2"', "completion model value should appear in the body");
    });
  });
});
