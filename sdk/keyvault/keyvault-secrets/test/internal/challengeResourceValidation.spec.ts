// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { SendRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { describe, expect, it, vi } from "vitest";
import { SecretClient } from "../../src/index.js";

describe("SecretClient challenge resource validation", () => {
  it.each(["resource", "scope"])(
    "rejects ambiguous %s challenges through the public client before credential use",
    async (field) => {
      const getToken = vi.fn<TokenCredential["getToken"]>();
      const value = `https://user@service.example${field === "scope" ? "/.default" : ""}`;
      const sendRequest = vi.fn<SendRequest>().mockImplementation(async (request) => {
        expect(request.body).toBeNull();
        expect(request.headers.has("Authorization")).toBe(false);
        return {
          status: 401,
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer authorization="https://login.microsoftonline.com/testTenant", ${field}="${value}"`,
          }),
          request,
        };
      });
      const client = new SecretClient(
        "https://vault.service.example",
        { getToken },
        {
          httpClient: { sendRequest },
        },
      );

      await expect(client.setSecret("name", "synthetic value")).rejects.toThrow(
        "The challenge contains an invalid scope.",
      );
      expect(getToken).not.toHaveBeenCalled();
      expect(sendRequest).toHaveBeenCalledTimes(1);
    },
  );

  it("does not return a continuation's cached token to the original unrelated endpoint", async () => {
    const originalUrl = "https://unrelated.example";
    const continuationUrl = "https://myvault.vault.azure.net/secrets?api-version=7.6";
    const getToken = vi.fn<TokenCredential["getToken"]>().mockResolvedValue({
      token: "synthetic_token",
      expiresOnTimestamp: Date.now() + 60 * 60 * 1000,
    });
    const sendRequest = vi
      .fn<SendRequest>()
      .mockImplementationOnce(async (request) => {
        expect(new URL(request.url).origin).toBe(originalUrl);
        expect(request.headers.has("Authorization")).toBe(false);
        return {
          status: 200,
          headers: createHttpHeaders(),
          request,
          bodyAsText: JSON.stringify({ value: [], nextLink: continuationUrl }),
        };
      })
      .mockImplementationOnce(async (request) => {
        expect(request.url).toBe(continuationUrl);
        expect(request.headers.has("Authorization")).toBe(false);
        return {
          status: 401,
          headers: createHttpHeaders({
            "WWW-Authenticate": `Bearer resource="https://vault.azure.net", authorization="https://login.microsoftonline.com/testTenant"`,
          }),
          request,
        };
      })
      .mockImplementationOnce(async (request) => {
        expect(request.url).toBe(continuationUrl);
        expect(request.headers.get("Authorization")).toBe("Bearer synthetic_token");
        return {
          status: 200,
          headers: createHttpHeaders(),
          request,
          bodyAsText: JSON.stringify({ value: [] }),
        };
      });
    const client = new SecretClient(originalUrl, { getToken }, { httpClient: { sendRequest } });
    const pages = client.listPropertiesOfSecrets().byPage();
    expect((await pages.next()).done).toBe(false);
    expect((await pages.next()).done).toBe(false);

    await expect(client.getSecret("name")).rejects.toThrow("does not match the requested domain");
    expect(getToken).toHaveBeenCalledExactlyOnceWith(
      ["https://vault.azure.net/.default"],
      expect.objectContaining({ tenantId: "testTenant", enableCae: true }),
    );
    expect(sendRequest).toHaveBeenCalledTimes(3);
  });
});
