// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createPipelineRequest } from "@typespec/ts-http-runtime";
import { ensureSecureConnection } from "$internal/policies/auth/checkInsecureConnection.js";
import { logger } from "$internal/log.js";

describe("checkInsecureConnection", () => {
  beforeEach(() => {
    vi.spyOn(logger, "warning");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should allow HTTPS connections without warning", () => {
    const request = createPipelineRequest({ url: "https://example.com" });
    expect(() => ensureSecureConnection(request, { allowInsecureConnection: false })).not.toThrow();
    expect(logger.warning).not.toHaveBeenCalled();
  });

  it("should throw on HTTP connections when insecure not allowed", () => {
    const request = createPipelineRequest({ url: "http://example.com" });
    expect(() => ensureSecureConnection(request, { allowInsecureConnection: false })).toThrow(
      "Authentication is not permitted for non-TLS protected (non-https) URLs when allowInsecureConnection is false.",
    );
  });

  it("should allow localhost HTTP with warning when insecure allowed", () => {
    const request = createPipelineRequest({
      url: "http://localhost:3000",
      allowInsecureConnection: true,
    });

    expect(() => ensureSecureConnection(request, { allowInsecureConnection: true })).not.toThrow();

    expect(logger.warning).toHaveBeenCalledWith(
      "Sending token over insecure transport. Assume any token issued is compromised.",
    );
  });

  it("should allow 127.0.0.1 HTTP with warning when insecure allowed", () => {
    const request = createPipelineRequest({
      url: "http://127.0.0.1:3000",
      allowInsecureConnection: true,
    });

    expect(() => ensureSecureConnection(request, { allowInsecureConnection: true })).not.toThrow();

    expect(logger.warning).toHaveBeenCalledWith(
      "Sending token over insecure transport. Assume any token issued is compromised.",
    );
  });

  it("should throw on non-allowed HTTP even when insecure allowed", () => {
    const request = createPipelineRequest({
      url: "http://example.com",
      allowInsecureConnection: true,
    });

    expect(() => ensureSecureConnection(request, { allowInsecureConnection: true })).toThrow();
  });
});
