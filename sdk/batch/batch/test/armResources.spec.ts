// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRestError } from "@azure-rest/core-client";
import { createPipelineRequest } from "@azure/core-rest-pipeline";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createHoboBatchAccount,
  getExistingBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import { createKeyInKeyVaultAndGetUrl, deleteKeyVault } from "./utils/arm-resources/key-vault.js";

const { getAccount, createAccount, deleteVault, createKey } = vi.hoisted(() => ({
  getAccount: vi.fn(),
  createAccount: vi.fn(),
  deleteVault: vi.fn(),
  createKey: vi.fn(),
}));

vi.mock("@azure/arm-batch", () => ({
  BatchManagementClient: class {
    batchAccount = { get: getAccount, create: createAccount };
  },
}));

vi.mock("@azure/arm-keyvault", () => ({
  KeyVaultManagementClient: class {
    vaults = { delete: deleteVault };
  },
}));

vi.mock("@azure/keyvault-keys", () => ({
  KeyClient: class {
    createKey = createKey;
  },
}));

vi.mock(import("@azure-tools/test-credential"), async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, createTestCredential: () => new actual.NoOpCredential() };
});

vi.mock("./utils/arm-resources/env-const.js", () => ({
  getSubscriptionId: () => "subscription",
  getResourceGroupName: () => "resource-group",
  getLocation: () => "eastus",
  getTenantId: () => "tenant",
}));

function createArmError(status: number, code = "ResourceNotFound"): Error {
  return createRestError({
    status: String(status),
    headers: {},
    request: createPipelineRequest({ url: "https://management.azure.com/example" }),
    body: { error: { code, message: code } },
  });
}

describe("Batch test ARM resource helpers", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns an existing Batch account", async () => {
    const account = { name: "account", location: "eastus" };
    getAccount.mockResolvedValue(account);

    await expect(getExistingBatchAccount("account")).resolves.toBe(account);
    expect(getAccount).toHaveBeenCalledWith("resource-group", "account");
  });

  it("returns undefined for an ARM 404 when requested", async () => {
    getAccount.mockRejectedValue(createArmError(404));

    await expect(getExistingBatchAccount("account", true)).resolves.toBeUndefined();
  });

  it("rethrows an ARM 404 when the account is required", async () => {
    const error = createArmError(404);
    getAccount.mockRejectedValue(error);

    await expect(getExistingBatchAccount("account")).rejects.toBe(error);
  });

  it.each([403, 500])("rethrows an ARM %i instead of treating it as missing", async (status) => {
    const error = createArmError(status, "ServiceError");
    getAccount.mockRejectedValue(error);

    await expect(getExistingBatchAccount("account", true)).rejects.toBe(error);
  });

  it("rethrows non-REST errors during account lookup", async () => {
    const error = new Error("Lookup failed");
    getAccount.mockRejectedValue(error);

    await expect(getExistingBatchAccount("account", true)).rejects.toBe(error);
  });

  it("creates a Batch account after an ARM 404", async () => {
    const account = { name: "account", location: "eastus" };
    getAccount.mockRejectedValue(createArmError(404));
    createAccount.mockResolvedValue(account);

    await expect(createHoboBatchAccount("account")).resolves.toBe(account);
    expect(createAccount).toHaveBeenCalledWith(
      "resource-group",
      "account",
      expect.objectContaining({ location: "eastus", poolAllocationMode: "BatchService" }),
    );
  });

  it("does not recreate an existing Batch account", async () => {
    const account = { name: "account", location: "eastus" };
    getAccount.mockResolvedValue(account);

    await expect(createHoboBatchAccount("account")).resolves.toBe(account);
    expect(createAccount).not.toHaveBeenCalled();
  });

  it("retrieves an account being created by another process", async () => {
    const account = { name: "account", location: "eastus" };
    getAccount.mockRejectedValueOnce(createArmError(404)).mockResolvedValueOnce(account);
    createAccount.mockRejectedValue(createArmError(409, "The specified account is being created."));

    await expect(createHoboBatchAccount("account")).resolves.toBe(account);
    expect(getAccount).toHaveBeenCalledTimes(2);
    expect(createAccount).toHaveBeenCalledTimes(1);
  });

  it("deletes an existing Key Vault", async () => {
    deleteVault.mockResolvedValue(undefined);

    await expect(deleteKeyVault("vault")).resolves.toBeUndefined();
    expect(deleteVault).toHaveBeenCalledWith("resource-group", "vault");
  });

  it("ignores an ARM 404 when deleting a missing Key Vault", async () => {
    deleteVault.mockRejectedValue(createArmError(404));

    await expect(deleteKeyVault("vault")).resolves.toBeUndefined();
  });

  it("rethrows an ARM authorization error when deleting a Key Vault", async () => {
    const error = createArmError(403, "AuthorizationFailed");
    deleteVault.mockRejectedValue(error);

    await expect(deleteKeyVault("vault")).rejects.toBe(error);
  });

  describe("key creation after a role assignment", () => {
    const key = {
      name: "key",
      id: "https://vault.example/keys/key/version",
    };

    function createRbacError(): Error {
      return Object.assign(createArmError(403, "Forbidden"), {
        details: { error: { innerError: { code: "ForbiddenByRbac" } } },
      });
    }

    beforeEach(() => {
      vi.useFakeTimers();
      vi.spyOn(console, "log").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    it("returns the key without retrying when access is already available", async () => {
      createKey.mockResolvedValue(key);

      await expect(createKeyInKeyVaultAndGetUrl("https://vault.example", "key")).resolves.toEqual({
        key,
        keyUrl: key.id,
      });
      expect(createKey).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    });

    it("waits 15 seconds before retrying an RBAC propagation failure", async () => {
      createKey.mockRejectedValueOnce(createRbacError()).mockResolvedValueOnce(key);
      const result = createKeyInKeyVaultAndGetUrl("https://vault.example", "key");

      await vi.advanceTimersByTimeAsync(14999);
      expect(createKey).toHaveBeenCalledTimes(1);
      await vi.advanceTimersByTimeAsync(1);

      await expect(result).resolves.toEqual({ key, keyUrl: key.id });
      expect(createKey).toHaveBeenCalledTimes(2);
    });

    it("stops after five minutes of retries and preserves the authorization error", async () => {
      const error = createRbacError();
      createKey.mockRejectedValue(error);
      const result = expect(
        createKeyInKeyVaultAndGetUrl("https://vault.example", "key"),
      ).rejects.toBe(error);

      await vi.advanceTimersByTimeAsync(300000);
      await result;

      expect(createKey).toHaveBeenCalledTimes(21);
      expect(vi.getTimerCount()).toBe(0);
    });

    it("does not retry other forbidden errors", async () => {
      const error = Object.assign(createArmError(403, "Forbidden"), {
        details: { error: { innerError: { code: "ForbiddenByFirewall" } } },
      });
      createKey.mockRejectedValue(error);

      await expect(createKeyInKeyVaultAndGetUrl("https://vault.example", "key")).rejects.toBe(
        error,
      );
      expect(createKey).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    });

    it("does not retry failures without RBAC error details", async () => {
      const error = createArmError(403, "Forbidden");
      createKey.mockRejectedValue(error);

      await expect(createKeyInKeyVaultAndGetUrl("https://vault.example", "key")).rejects.toBe(
        error,
      );
      expect(createKey).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    });

    it("does not retry a key response without an ID", async () => {
      createKey.mockResolvedValue({ name: "key" });

      await expect(createKeyInKeyVaultAndGetUrl("https://vault.example", "key")).rejects.toThrow(
        "does not have an ID",
      );
      expect(createKey).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);
    });
  });
});
