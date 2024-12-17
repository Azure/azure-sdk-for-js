// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken } from "@azure/core-auth";
import { createBrowserRelayCredential } from "../src/browserRelayCredential.js";
import { describe, it, assert, expect, vi } from "vitest";

describe("browserRelayCredential", () => {
  it("createBrowserRelayCredential", async () => {
    // Mock the fetch function.
    const mockCreateCredentialResponse = {
      id: "1",
    };

    const mockAccessTokenResponse: AccessToken = {
      token: "123",
      expiresOnTimestamp: Date.now() + 3600 * 1000,
      tokenType: "Bearer",
    };

    const localFetch = vi
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCreateCredentialResponse),
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAccessTokenResponse),
        }),
      );

    vi.stubGlobal("fetch", localFetch);

    const credential = createBrowserRelayCredential();
    const token = await credential.getToken("scope1");

    assert.equal(token!.token, "123");
    assert.equal(token!.tokenType, "Bearer");
    expect(localFetch).toHaveBeenCalledTimes(2);
  });
});
