// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BrokerCredential } from "$internal/credentials/brokerCredential.js";
import { DeveloperSignOnClientId } from "$internal/constants.js";
import { createMsalClient } from "$internal/msal/nodeFlows/msalClient.js";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { MockInstance } from "vitest";
import {
  resolveTenantId,
  resolveAdditionallyAllowedTenantIds,
  processMultiTenantRequest,
} from "$internal/util/tenantIdUtils.js";

vi.mock("$internal/msal/nodeFlows/msalClient.js", () => ({
  createMsalClient: vi.fn(),
}));

vi.mock("$internal/util/tenantIdUtils.js", () => ({
  resolveTenantId: vi.fn(),
  resolveAdditionallyAllowedTenantIds: vi.fn(),
  processMultiTenantRequest: vi.fn(),
}));

describe("BrokerCredential (internal)", function () {
  let mockMsalClient: any;
  let createMsalClientSpy: MockInstance;

  beforeEach(async function () {
    vi.mocked(resolveTenantId).mockReturnValue("test-tenant-id");
    vi.mocked(resolveAdditionallyAllowedTenantIds).mockReturnValue([]);
    vi.mocked(processMultiTenantRequest).mockReturnValue("test-tenant-id");

    mockMsalClient = {
      getBrokeredToken: vi.fn(),
    };

    createMsalClientSpy = vi.mocked(createMsalClient).mockReturnValue(mockMsalClient);
  });

  afterEach(async function () {
    vi.clearAllMocks();
  });

  const scope = "https://vault.azure.net/.default";

  describe("constructor", function () {
    it("should initialize with default options", function () {
      new BrokerCredential({});
      expect(createMsalClientSpy).toHaveBeenCalledWith(
        DeveloperSignOnClientId,
        "test-tenant-id",
        expect.objectContaining({
          logger: expect.anything(),
          brokerOptions: {
            enabled: true,
            parentWindowHandle: expect.any(Uint8Array),
            useDefaultBrokerAccount: true,
          },
        }),
      );
    });
    it("should pass through token credential options", function () {
      const options = {
        tenantId: "test-tenant",
        authorityHost: "https://custom.authority.com",
        additionallyAllowedTenants: ["tenant1"],
      };

      new BrokerCredential(options);

      expect(createMsalClientSpy).toHaveBeenCalledWith(
        DeveloperSignOnClientId,
        "test-tenant-id",
        expect.objectContaining({
          ...options,
          logger: expect.anything(),
          brokerOptions: {
            enabled: true,
            parentWindowHandle: expect.any(Uint8Array),
            useDefaultBrokerAccount: true,
          },
        }),
      );
    });
  });

  describe("getToken", function () {
    it("should get token with default options", async function () {
      const expectedToken = {
        token: "test-token",
        expiresOnTimestamp: Date.now() + 3600 * 1000,
        tokenType: "pop",
        refreshAfterTimestamp: undefined,
      };
      mockMsalClient.getBrokeredToken.mockResolvedValue(expectedToken);

      const credential = new BrokerCredential({});
      const token = await credential.getToken(scope);

      expect(token).toEqual(expectedToken);
    });
  });
});
