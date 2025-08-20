// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken } from "@azure/core-auth";
import {
  createBrowserRelayCredential,
  RelayAuthenticationError,
} from "$internal/browserRelayCredential.js";
import { describe, it, assert, expect, vi } from "vitest";

describe("browserRelayCredential", () => {
  it("createBrowserRelayCredential creates credential", async () => {
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

  it("createBrowserRelayCredential throws error when relay server fails with a 400", async () => {
    const localFetch = vi.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ error: "Bad request" }),
      }),
    );

    vi.stubGlobal("fetch", localFetch);

    const credential = createBrowserRelayCredential();

    await expect(() => credential.getToken("scope1")).rejects.toThrowError(
      RelayAuthenticationError,
    );
    expect(localFetch).toHaveBeenCalledTimes(1);
  });

  it("createBrowserRelayCredential throws error when relay server fails with a 500", async () => {
    const localFetch = vi.fn().mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      }),
    );

    vi.stubGlobal("fetch", localFetch);

    const credential = createBrowserRelayCredential();

    await expect(() => credential.getToken("scope1")).rejects.toThrowError(
      RelayAuthenticationError,
    );
    expect(localFetch).toHaveBeenCalledTimes(1);
  });

  it("getToken throws error when relay server fails with a 400", async () => {
    const mockCreateCredentialResponse = {
      id: "1",
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
          ok: false,
          status: 400,
          json: () => Promise.resolve({ error: "Bad request" }),
        }),
      );

    vi.stubGlobal("fetch", localFetch);

    const credential = createBrowserRelayCredential();

    await expect(() => credential.getToken("scope1")).rejects.toThrowError(
      RelayAuthenticationError,
    );
    expect(localFetch).toHaveBeenCalledTimes(2);
  });

  it("getToken throws error when relay server fails with a 500", async () => {
    const mockCreateCredentialResponse = {
      id: "1",
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
          ok: false,
          status: 500,
        }),
      );

    vi.stubGlobal("fetch", localFetch);

    const credential = createBrowserRelayCredential();

    await expect(() => credential.getToken("scope1")).rejects.toThrowError(
      RelayAuthenticationError,
    );
    expect(localFetch).toHaveBeenCalledTimes(2);
  });
});
