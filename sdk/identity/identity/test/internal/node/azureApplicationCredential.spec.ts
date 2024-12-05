// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureApplicationCredential } from "../../../src/credentials/azureApplicationCredential.js";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  type HttpClient,
  RestError,
} from "@azure/core-rest-pipeline";
import { ManagedIdentityApplication } from "@azure/msal-node";
import { describe, it, afterEach, beforeEach, vi, expect } from "vitest";

describe("AzureApplicationCredential testing Managed Identity (internal)", function () {
  let httpClient: HttpClient;

  beforeEach(async () => {
    // Let the IMDS ping request succeed, but fail the token acquisition
    httpClient = createDefaultHttpClient();
    vi.spyOn(httpClient, "sendRequest").mockImplementation((request) => {
      return Promise.resolve({
        headers: createHttpHeaders(),
        request,
        status: 200,
      });
    });
  });

  afterEach(async () => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("an unexpected error bubbles all the way up", async function () {
    const errorMessage = "ManagedIdentityCredential authentication failed.";

    // The IMDS ping request will succeed
    // An unexpected error comes from MSAL
    vi.spyOn(ManagedIdentityApplication.prototype, "acquireToken").mockRejectedValue(
      new Error(errorMessage),
    );

    await expect(new AzureApplicationCredential({ httpClient }).getToken("scopes")).rejects.toThrow(
      new RegExp(errorMessage),
    );
  });

  it("returns expected error when the network was unreachable", async function () {
    const netError: RestError = new RestError("Request timeout: network unreachable", {
      code: "ENETUNREACH",
      statusCode: 408,
    });
    vi.spyOn(ManagedIdentityApplication.prototype, "acquireToken").mockRejectedValue(netError);

    await expect(new AzureApplicationCredential({ httpClient }).getToken("scopes")).rejects.toThrow(
      /Network unreachable/,
    );
  });
});
