// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi, beforeEach } from "vitest";

const { keychainCreate, libSecretCreate } = vi.hoisted(() => {
  const persistence = { load: async () => null };
  return {
    keychainCreate: vi.fn(async () => persistence),
    libSecretCreate: vi.fn(async () => persistence),
  };
});

vi.mock("@azure/msal-node-extensions", () => ({
  DataProtectionScope: { CurrentUser: "CurrentUser" },
  FilePersistence: { create: vi.fn() },
  FilePersistenceWithDataProtection: { create: vi.fn() },
  KeychainPersistence: { create: keychainCreate },
  LibSecretPersistence: { create: libSecretCreate },
}));

import { defaultMsalValues, msalPersistencePlatforms } from "../../../src/platforms.js";

describe("secret store accounts", function () {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const cases: Array<[string | undefined, string | undefined]> = [
    [undefined, undefined],
    ["msal.cache", undefined],
    ["msal.cache.nocae", undefined],
    ["msal.cache.cae", "msal.cache.cae"],
    ["app-alice.nocae", "app-alice.nocae"],
    ["app-alice.cae", "app-alice.cae"],
    ["app-bob.nocae", "app-bob.nocae"],
  ];

  it.each(cases)("macOS Keychain uses a distinct account for cache %s", async (name, account) => {
    await msalPersistencePlatforms.darwin!({ name });
    expect(keychainCreate).toHaveBeenCalledWith(
      expect.stringContaining(name ?? defaultMsalValues.tokenCache.name),
      defaultMsalValues.keyChain.service,
      account ?? defaultMsalValues.keyChain.account,
    );
  });

  it.each(cases)("Linux keyring uses a distinct account for cache %s", async (name, account) => {
    await msalPersistencePlatforms.linux!({ name });
    expect(libSecretCreate).toHaveBeenCalledWith(
      expect.stringContaining(name ?? defaultMsalValues.tokenCache.name),
      defaultMsalValues.keyRing.service,
      account ?? defaultMsalValues.keyRing.account,
    );
  });
});
