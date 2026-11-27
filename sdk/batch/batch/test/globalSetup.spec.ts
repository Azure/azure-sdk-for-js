// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  isPlaybackMode: vi.fn(),
  createTestResourceGroup: vi.fn(),
  deleteTestResourceGroup: vi.fn(),
  createByosBatchAccount: vi.fn(),
  createHoboBatchAccount: vi.fn(),
  deleteBatchAccount: vi.fn(),
  createKeyVaultForByosBatchAccount: vi.fn(),
  deleteKeyVault: vi.fn(),
  grantKeyVaultSecretsOfficer: vi.fn(),
}));

vi.mock("@azure-tools/test-recorder", () => ({
  isPlaybackMode: mocks.isPlaybackMode,
}));

vi.mock("./utils/arm-resources/resource-group.js", () => ({
  createTestResourceGroup: mocks.createTestResourceGroup,
  deleteTestResourceGroup: mocks.deleteTestResourceGroup,
}));

vi.mock("./utils/arm-resources/batch-account.js", () => ({
  createByosBatchAccount: mocks.createByosBatchAccount,
  createHoboBatchAccount: mocks.createHoboBatchAccount,
  deleteBatchAccount: mocks.deleteBatchAccount,
}));

vi.mock("./utils/arm-resources/key-vault.js", () => ({
  createKeyVaultForByosBatchAccount: mocks.createKeyVaultForByosBatchAccount,
  deleteKeyVault: mocks.deleteKeyVault,
  grantKeyVaultSecretsOfficer: mocks.grantKeyVaultSecretsOfficer,
}));

vi.mock("./utils/arm-resources/env-const.js", () => ({
  getAzureBatchServicePrincipalObjectId: () => "batch-service-principal",
  getByosBatchAccountName: () => "byos-account",
  getByosKeyVaultName: () => "byos-vault",
  getHoboBatchAccountName: () => "hobo-account",
}));

describe("Batch global setup failure handling", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.resetAllMocks();
    mocks.isPlaybackMode.mockReturnValue(false);
    mocks.createKeyVaultForByosBatchAccount.mockResolvedValue({
      id: "vault-resource-id",
      properties: { vaultUri: "https://vault.example" },
    });
  });

  it("does not attempt cleanup when configuration fails before provisioning", async () => {
    const error = new Error("AZURE_SUBSCRIPTION_ID must be set");
    mocks.createTestResourceGroup.mockRejectedValue(error);
    const { setup, teardown } = await import("./global-setup.js");

    await expect(setup()).rejects.toBe(error);
    await expect(teardown()).resolves.toBeUndefined();

    expect(mocks.createByosBatchAccount).not.toHaveBeenCalled();
    expect(mocks.deleteBatchAccount).not.toHaveBeenCalled();
    expect(mocks.deleteKeyVault).not.toHaveBeenCalled();
    expect(mocks.deleteTestResourceGroup).not.toHaveBeenCalled();
  });

  it("cleans up successfully provisioned resources only once", async () => {
    const { setup, teardown } = await import("./global-setup.js");

    await setup();
    await setup();
    await teardown();
    await teardown();

    expect(mocks.createTestResourceGroup).toHaveBeenCalledTimes(1);
    expect(mocks.deleteBatchAccount).toHaveBeenCalledTimes(2);
    expect(mocks.deleteKeyVault).toHaveBeenCalledTimes(1);
    expect(mocks.deleteTestResourceGroup).toHaveBeenCalledTimes(1);
  });

  it("does not provision or clean up resources in playback mode", async () => {
    mocks.isPlaybackMode.mockReturnValue(true);
    const { setup, teardown } = await import("./global-setup.js");

    await setup();
    await teardown();

    expect(mocks.createTestResourceGroup).not.toHaveBeenCalled();
    expect(mocks.deleteTestResourceGroup).not.toHaveBeenCalled();
  });
});
