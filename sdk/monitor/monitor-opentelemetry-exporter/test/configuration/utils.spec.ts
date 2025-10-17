// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it, vi, beforeEach, afterEach, afterAll } from "vitest";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { diag } from "@opentelemetry/api";
import {
  makeOneSettingsRequest,
  OneSettingsResponse,
  parseOneSettingsResponse,
} from "../../src/configuration/utils.js";
import {
  ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS,
  ONE_SETTINGS_CHANGE_VERSION_KEY,
} from "../../src/Declarations/Constants.js";

function createResponse(overrides: Partial<PipelineResponse>): PipelineResponse {
  return {
    request: {
      url: "https://example.com",
      method: "GET",
      headers: createHttpHeaders(),
      withCredentials: false,
      timeout: 0,
      allowInsecureConnection: false,
    } as PipelineRequest,
    status: 200,
    headers: createHttpHeaders(),
    ...overrides,
  };
}

describe("OneSettingsResponse", () => {
  it("should initialize with default values", () => {
    const response = new OneSettingsResponse();
    expect(response.etag).toBeUndefined();
    expect(response.refreshInterval).toBe(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS);
    expect(response.settings).toEqual({});
    expect(response.version).toBeUndefined();
  });

  it("should accept custom values", () => {
    const response = new OneSettingsResponse("etag", 120, { key: "value" }, 5);
    expect(response.etag).toBe("etag");
    expect(response.refreshInterval).toBe(120);
    expect(response.settings).toEqual({ key: "value" });
    expect(response.version).toBe(5);
  });
});

describe("makeOneSettingsRequest", () => {
  const warnSpy = vi.spyOn(diag, "warn");
  const warnLogger = warnSpy as unknown as (message: string) => void;

  beforeEach(() => {
    warnSpy.mockClear();
  });

  afterEach(() => {
    warnSpy.mockReset();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it("should issue a request and parse the response", async () => {
    const pipelineResponse = createResponse({
      status: 200,
      headers: createHttpHeaders({
        ETag: "test-etag",
        "x-ms-onesetinterval": "30",
      }),
      bodyAsText: JSON.stringify({
        settings: {
          feature: "enabled",
          [ONE_SETTINGS_CHANGE_VERSION_KEY]: "3",
        },
      }),
    });

    const sendRequest = vi.fn().mockResolvedValue(pipelineResponse);
    const httpClient: HttpClient = {
      sendRequest,
    };

    const result = await makeOneSettingsRequest(
      "https://example.com/settings",
      { namespaces: "javascript" },
      { "If-None-Match": "etag" },
      httpClient,
  warnLogger,
    );

    expect(sendRequest).toHaveBeenCalledTimes(1);
    const request = sendRequest.mock.calls[0][0] as PipelineRequest;
    expect(request.url).toContain("namespaces=javascript");
    expect(request.headers.get("If-None-Match")).toBe("etag");
    expect(result.etag).toBe("test-etag");
    expect(result.refreshInterval).toBe(1800);
    expect(result.settings.feature).toBe("enabled");
    expect(result.version).toBe(3);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("should handle missing query and headers", async () => {
    const pipelineResponse = createResponse({ status: 304 });
    const httpClient: HttpClient = {
      sendRequest: vi.fn().mockResolvedValue(pipelineResponse),
    };

    const result = await makeOneSettingsRequest(
      "https://example.com/settings",
      undefined,
      undefined,
      httpClient,
  warnLogger,
    );
    expect(result.refreshInterval).toBe(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("should handle request failures", async () => {
    const httpClient: HttpClient = {
      sendRequest: vi.fn().mockRejectedValue(new Error("network error")),
    };

    const result = await makeOneSettingsRequest(
      "https://example.com/settings",
      undefined,
      undefined,
      httpClient,
  warnLogger,
    );
    expect(result.etag).toBeUndefined();
    expect(result.settings).toEqual({});
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });
});

describe("parseOneSettingsResponse", () => {
  const warnSpy = vi.spyOn(diag, "warn");
  const warnLogger = warnSpy as unknown as (message: string) => void;

  beforeEach(() => {
    warnSpy.mockClear();
  });

  afterEach(() => {
    warnSpy.mockReset();
  });

  afterAll(() => {
    warnSpy.mockRestore();
  });

  it("should parse a 200 response with settings", () => {
    const response = createResponse({
      status: 200,
      headers: createHttpHeaders({ ETag: "etag", "x-ms-onesetinterval": "40" }),
      bodyAsText: JSON.stringify({
        settings: {
          feature: "on",
          [ONE_SETTINGS_CHANGE_VERSION_KEY]: "7",
        },
      }),
    });

  const result = parseOneSettingsResponse(response, warnLogger);
    expect(result.etag).toBe("etag");
    expect(result.refreshInterval).toBe(2400);
    expect(result.settings.feature).toBe("on");
    expect(result.version).toBe(7);
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("should warn for invalid refresh interval header", () => {
    const response = createResponse({
      status: 200,
      headers: createHttpHeaders({ "x-ms-onesetinterval": "invalid" }),
      bodyAsText: JSON.stringify({ settings: {} }),
    });

  const result = parseOneSettingsResponse(response, warnLogger);
    expect(result.refreshInterval).toBe(ONE_SETTINGS_DEFAULT_REFRESH_INTERVAL_SECONDS);
    expect(warnSpy).toHaveBeenCalledWith("Invalid refresh interval format: invalid");
  });

  it("should warn when change version cannot be parsed", () => {
    const response = createResponse({
      status: 200,
      bodyAsText: JSON.stringify({
        settings: {
          [ONE_SETTINGS_CHANGE_VERSION_KEY]: "not-a-number",
        },
      }),
    });

  parseOneSettingsResponse(response, warnLogger);
    expect(warnSpy).toHaveBeenCalledWith(
      "Failed to parse OneSettings change version: not-a-number",
    );
  });

  it("should warn when response content cannot be decoded", () => {
    const response = createResponse({ status: 200, bodyAsText: "not-json" });
  parseOneSettingsResponse(response, warnLogger);
    expect(warnSpy).toHaveBeenCalledTimes(1);
  });

  it("should warn for error status codes", () => {
    const response = createResponse({ status: 404, bodyAsText: "missing" });
  parseOneSettingsResponse(response, warnLogger);
    expect(warnSpy).toHaveBeenCalledWith("OneSettings configuration not found: missing");
  });
});
