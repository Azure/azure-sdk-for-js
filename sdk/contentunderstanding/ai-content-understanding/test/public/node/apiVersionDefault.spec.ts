// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Hermetic regression test for the default apiVersion in the
 * ContentUnderstandingClient constructor.
 *
 * `@azure-tools/typespec-ts` only emits the single latest GA version in
 * `ServiceApiVersions`, so `createContentUnderstanding(...)` defaults to
 * `"2025-11-01"` even though this SDK ships types (DocumentSignature,
 * AnalysisContent.metadata, chunks, inline analysis, etc.) that only exist
 * on the preview surface. `ContentUnderstandingClient` bridges this gap by
 * setting `apiVersion` in the options passed to the generated context.
 *
 * Verifies constructor-side behavior for the default api version: when no
 * `apiVersion` is supplied the client selects the latest preview surface, and
 * when one is supplied the caller's choice takes precedence.
 */

import { describe, it, assert } from "vitest";
import { AzureKeyCredential } from "@azure/core-auth";
import { ContentUnderstandingClient, KnownVersions } from "../../../src/index.js";

interface ClientWithContext {
  _client: { apiVersion?: string };
}

describe("ContentUnderstandingClient apiVersion default", () => {
  const endpoint = "https://example.services.ai.azure.com";
  const credential = new AzureKeyCredential("fake-key");

  it("defaults apiVersion to 2026-06-01-preview when the caller does not specify one", () => {
    const client = new ContentUnderstandingClient(endpoint, credential);
    const inner = (client as unknown as ClientWithContext)._client;
    assert.equal(
      inner.apiVersion,
      KnownVersions.V20260601Preview,
      "the client should default the underlying generated context to the preview API version",
    );
  });

  it("honors an explicit apiVersion override in constructor options", () => {
    const client = new ContentUnderstandingClient(endpoint, credential, {
      apiVersion: KnownVersions.V20251101,
    });
    const inner = (client as unknown as ClientWithContext)._client;
    assert.equal(
      inner.apiVersion,
      KnownVersions.V20251101,
      "Explicit apiVersion in ClientOptions must win over the client's default",
    );
  });

  it("honors an explicit apiVersion when the caller pins to the preview version", () => {
    const client = new ContentUnderstandingClient(endpoint, credential, {
      apiVersion: KnownVersions.V20260601Preview,
    });
    const inner = (client as unknown as ClientWithContext)._client;
    assert.equal(inner.apiVersion, KnownVersions.V20260601Preview);
  });
});
