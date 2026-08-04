// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { AzureKeyCredential } from "@azure/core-auth";
import type { MockInstance } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DocumentTranslationClient, KnownVersions } from "../../src/index.js";

describe("DocumentTranslationClient should send the serviceVersion as the api-version", () => {
  const endpoint = "https://endpoint.cognitiveservices.azure.com";

  const mockHttpClient: HttpClient = {
    async sendRequest(httpRequest: PipelineRequest): Promise<PipelineResponse> {
      return {
        status: 200,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify({ value: [] }),
      };
    },
  };

  let spy: MockInstance<SendRequest>;
  const credential = new AzureKeyCredential("fake-key");

  beforeEach(() => {
    spy = vi.spyOn(mockHttpClient, "sendRequest");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("defaults to the latest service version", async () => {
    const client = new DocumentTranslationClient(endpoint, credential, {
      httpClient: mockHttpClient,
    });

    await client.getSupportedFormats("Document");

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining(`api-version=${KnownVersions.V20260301}`),
      }),
    );
  });

  it("uses a non-default serviceVersion when specified", async () => {
    const client = new DocumentTranslationClient(endpoint, credential, {
      serviceVersion: KnownVersions.V20240501,
      httpClient: mockHttpClient,
    });

    await client.getSupportedFormats("Document");

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining(`api-version=${KnownVersions.V20240501}`),
      }),
    );
  });
});
