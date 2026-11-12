// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  credential: vi.fn(),
  client: vi.fn(),
  createRsaKey: vi.fn(),
  secureWrapKey: vi.fn(),
  secureUnwrapKey: vi.fn(),
}));

vi.mock("@azure/identity", () => ({
  DefaultAzureCredential: class {
    constructor() {
      mocks.credential();
    }
  },
}));

vi.mock("@azure/keyvault-keys", () => ({
  KeyClient: class {
    constructor(...args: unknown[]) {
      mocks.client(...args);
    }
    createRsaKey = mocks.createRsaKey;
    secureWrapKey = mocks.secureWrapKey;
    secureUnwrapKey = mocks.secureUnwrapKey;
  },
}));

vi.mock("dotenv/config", () => ({}));

describe("secure wrap/unwrap sample", () => {
  const vaultUri = "https://sample.vault.azure.net";
  const hsmUri = "https://sample.managedhsm.azure.net";
  const attestationUri = "https://attestation.example/";
  const wrapped = { algorithm: "RSA-OAEP-256", result: new Uint8Array([1, 2, 3]) };
  let main: () => Promise<void>;
  const fetchMock = vi.fn();

  function mockOperations(): void {
    mocks.createRsaKey.mockResolvedValue({});
    mocks.secureWrapKey.mockResolvedValue(wrapped);
    mocks.secureUnwrapKey.mockResolvedValue(wrapped);
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ token: "attestation-token" }),
    });
  }

  beforeAll(async () => {
    vi.stubEnv("AZURE_MANAGEDHSM_URI", hsmUri);
    vi.stubEnv("AZURE_KEYVAULT_ATTESTATION_URI", attestationUri);
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "log").mockImplementation(() => {});
    mockOperations();
    try {
      ({ main } = await import("../../samples-dev/secureWrapKey.js"));
      await vi.waitFor(() => expect(mocks.secureUnwrapKey).toHaveBeenCalledOnce());
    } finally {
      vi.unstubAllEnvs();
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
    }
  });

  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubEnv("KEYVAULT_URI", undefined);
    vi.stubEnv("AZURE_MANAGEDHSM_URI", undefined);
    vi.stubEnv("AZURE_KEYVAULT_ATTESTATION_URI", undefined);
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.stubGlobal("fetch", fetchMock);
    mockOperations();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function expectNoOperations(): void {
    expect(mocks.credential).not.toHaveBeenCalled();
    expect(mocks.client).not.toHaveBeenCalled();
    expect(mocks.createRsaKey).not.toHaveBeenCalled();
    expect(mocks.secureWrapKey).not.toHaveBeenCalled();
    expect(mocks.secureUnwrapKey).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  }

  it.each([
    [undefined, undefined],
    ["", undefined],
    [undefined, ""],
    ["", ""],
    [undefined, attestationUri],
    ["", attestationUri],
  ])("skips a regular vault without an HSM (%s, %s)", async (hsm, attestation) => {
    vi.stubEnv("KEYVAULT_URI", vaultUri);
    vi.stubEnv("AZURE_MANAGEDHSM_URI", hsm);
    vi.stubEnv("AZURE_KEYVAULT_ATTESTATION_URI", attestation);

    await main();

    expect(console.log).toHaveBeenCalledWith(
      "Skipping secure wrap/unwrap sample: Managed HSM is not configured for this vault.",
    );
    expectNoOperations();
  });

  it.each([
    [undefined, undefined, undefined],
    ["", undefined, undefined],
    [undefined, undefined, attestationUri],
    ["", undefined, attestationUri],
    [undefined, hsmUri, undefined],
    [undefined, hsmUri, ""],
    [vaultUri, hsmUri, undefined],
    [vaultUri, hsmUri, ""],
  ])("rejects incomplete HSM setup (%s, %s, %s)", async (vault, hsm, attestation) => {
    vi.stubEnv("KEYVAULT_URI", vault);
    vi.stubEnv("AZURE_MANAGEDHSM_URI", hsm);
    vi.stubEnv("AZURE_KEYVAULT_ATTESTATION_URI", attestation);

    await expect(main()).rejects.toThrow(
      "AZURE_MANAGEDHSM_URI and AZURE_KEYVAULT_ATTESTATION_URI must be set.",
    );
    expectNoOperations();
  });

  it.each([undefined, vaultUri])("runs a configured HSM with KEYVAULT_URI=%s", async (vault) => {
    vi.stubEnv("KEYVAULT_URI", vault);
    vi.stubEnv("AZURE_MANAGEDHSM_URI", hsmUri);
    vi.stubEnv("AZURE_KEYVAULT_ATTESTATION_URI", attestationUri);

    await main();

    expect(mocks.credential).toHaveBeenCalledOnce();
    expect(mocks.client).toHaveBeenCalledWith(hsmUri, expect.anything());
    expect(mocks.createRsaKey).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ hsm: true, keyOps: ["secureWrapKey", "secureUnwrapKey"] }),
    );
    expect(mocks.secureWrapKey).toHaveBeenCalledWith(expect.any(String), "RSA-OAEP-256");
    expect(fetchMock).toHaveBeenCalledWith("https://attestation.example/generate-test-token");
    expect(mocks.secureUnwrapKey).toHaveBeenCalledWith(
      expect.any(String),
      wrapped.algorithm,
      wrapped.result,
      "attestation-token",
    );
  });

  it("propagates HSM failures instead of skipping a configured sample", async () => {
    vi.stubEnv("KEYVAULT_URI", vaultUri);
    vi.stubEnv("AZURE_MANAGEDHSM_URI", hsmUri);
    vi.stubEnv("AZURE_KEYVAULT_ATTESTATION_URI", attestationUri);
    const error = new Error("HSM request failed");
    mocks.createRsaKey.mockRejectedValueOnce(error);

    await expect(main()).rejects.toBe(error);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(mocks.secureWrapKey).not.toHaveBeenCalled();
    expect(mocks.secureUnwrapKey).not.toHaveBeenCalled();
  });

  it("propagates attestation failures instead of unwrapping without a token", async () => {
    vi.stubEnv("AZURE_MANAGEDHSM_URI", hsmUri);
    vi.stubEnv("AZURE_KEYVAULT_ATTESTATION_URI", attestationUri);
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
    });

    await expect(main()).rejects.toThrow("503 Service Unavailable");
    expect(mocks.secureUnwrapKey).not.toHaveBeenCalled();
  });
});
