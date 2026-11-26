// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getAzureBatchServicePrincipalObjectId,
  getLocation,
  getResourceGroupName,
  getSubscriptionId,
  getTenantId,
  getUserObjectId,
} from "./utils/arm-resources/env-const.js";

const { runtimeEnv, createTestCredential } = vi.hoisted(() => {
  const values: Record<string, string | undefined> = {};
  return { runtimeEnv: values, createTestCredential: vi.fn() };
});

vi.mock("@azure-tools/test-recorder", () => ({
  env: runtimeEnv,
}));

vi.mock("@azure-tools/test-credential", () => ({
  createTestCredential,
}));

describe("Batch resource environment helpers", () => {
  beforeEach(() => {
    for (const key of Object.keys(runtimeEnv)) {
      delete runtimeEnv[key];
    }
    vi.clearAllMocks();
  });

  it("reads the subscription from the recorder runtime environment", () => {
    runtimeEnv.AZURE_SUBSCRIPTION_ID = "test-subscription";

    expect(getSubscriptionId()).toBe("test-subscription");
  });

  it("reads updated values instead of a snapshot from module initialization", () => {
    runtimeEnv.AZURE_SUBSCRIPTION_ID = "first-subscription";
    expect(getSubscriptionId()).toBe("first-subscription");

    runtimeEnv.AZURE_SUBSCRIPTION_ID = "second-subscription";
    expect(getSubscriptionId()).toBe("second-subscription");
  });

  it.each([undefined, ""])("rejects a missing or empty subscription (%s)", (value) => {
    runtimeEnv.AZURE_SUBSCRIPTION_ID = value;

    expect(getSubscriptionId).toThrow("AZURE_SUBSCRIPTION_ID must be set");
  });

  it("reads the remaining provisioning settings from the same runtime environment", () => {
    runtimeEnv.AZURE_RESOURCE_GROUP = "test-resource-group";
    runtimeEnv.AZURE_LOCATION = "eastus";
    runtimeEnv.AZURE_TENANT_ID = "test-tenant";
    runtimeEnv.AZURE_BATCH_SERVICE_PRINCIPAL_OBJECT_ID = "test-batch-principal";

    expect(getResourceGroupName()).toBe("test-resource-group");
    expect(getLocation()).toBe("eastus");
    expect(getTenantId()).toBe("test-tenant");
    expect(getAzureBatchServicePrincipalObjectId()).toBe("test-batch-principal");
  });

  it("preserves defaults when optional settings are absent", () => {
    expect(getResourceGroupName()).toBe("javascript-sdk-test-rg");
    expect(getLocation()).toBe("brazilsouth");
    expect(getTenantId()).toBe("72f988bf-86f1-41af-91ab-2d7cd011db47");
    expect(getAzureBatchServicePrincipalObjectId()).toBe("f520d84c-3fd3-4cc8-88d4-2ed25b00d27a");
  });

  it("uses the configured principal without requesting a token", async () => {
    runtimeEnv.USER_OBJECT_ID = "test-user";

    await expect(getUserObjectId()).resolves.toBe("test-user");
    expect(createTestCredential).not.toHaveBeenCalled();
  });
});
