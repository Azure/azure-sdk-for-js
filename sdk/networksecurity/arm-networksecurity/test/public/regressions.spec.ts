import { describe, it, expect, vi } from "vitest";
import { getClient } from "@azure-rest/core-client";
import { createNetworkSecurityManagement } from "../../src/api/networkSecurityManagementContext.js";
import { AzureClouds } from "../../src/static-helpers/cloudSettingHelpers.js";
import {
  neuroShieldPatchSerializer,
  neuroShieldProtectedResourceIdentitySerializer,
  neuroShieldProtectedResourceIdentityDeserializer,
} from "../../src/models/models.js";

vi.mock("@azure-rest/core-client", () => ({ getClient: vi.fn(() => ({})) }));
vi.mock("../../src/logger.js", () => ({ logger: { info: vi.fn() } }));

describe("cloud authentication", () => {
  const credential = { getToken: async () => null };

  it.each([
    [undefined, "https://management.azure.com"],
    [AzureClouds.AZURE_PUBLIC_CLOUD, "https://management.azure.com"],
    [AzureClouds.AZURE_CHINA_CLOUD, "https://management.chinacloudapi.cn"],
    [AzureClouds.AZURE_US_GOVERNMENT, "https://management.usgovcloudapi.net"],
  ] as const)("uses the ARM audience for %s", (cloudSetting, endpoint) => {
    createNetworkSecurityManagement(credential, "subscription", { cloudSetting });
    expect(getClient).toHaveBeenLastCalledWith(
      cloudSetting === undefined ? endpoint : `${endpoint}/`,
      credential,
      expect.objectContaining({ credentials: { scopes: [`${endpoint}/.default`] } }),
    );
  });

  it("preserves explicit scopes and endpoint overrides", () => {
    createNetworkSecurityManagement(credential, "subscription", {
      cloudSetting: AzureClouds.AZURE_CHINA_CLOUD,
      endpoint: "https://custom.example",
      credentials: { scopes: ["https://custom-audience.example/.default"] },
    });
    expect(getClient).toHaveBeenLastCalledWith(
      "https://custom.example",
      credential,
      expect.objectContaining({
        credentials: { scopes: ["https://custom-audience.example/.default"] },
      }),
    );
  });

  it("does not infer an audience from an endpoint override", () => {
    createNetworkSecurityManagement(credential, "subscription", {
      endpoint: "https://custom.example",
    });
    expect(getClient).toHaveBeenLastCalledWith(
      "https://custom.example",
      credential,
      expect.objectContaining({
        credentials: { scopes: ["https://management.azure.com/.default"] },
      }),
    );
  });
});

describe("dictionary serialization", () => {
  it("preserves flat tag dictionaries", () => {
    expect(neuroShieldPatchSerializer({ tags: { env: "production" } }).tags).toEqual({
      env: "production",
    });
  });

  it("preserves empty and omitted tags", () => {
    expect(neuroShieldPatchSerializer({ tags: {} }).tags).toEqual({});
    expect(neuroShieldPatchSerializer({}).tags).toBeUndefined();
  });

  it("round-trips flat user-assigned identity dictionaries", () => {
    const identity = {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/sub/resourceGroups/rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/id":
          {
            principalId: "11111111-1111-1111-1111-111111111111",
            clientId: "22222222-2222-2222-2222-222222222222",
          },
      },
    };
    expect(neuroShieldProtectedResourceIdentitySerializer(identity)).toEqual(identity);
    expect(neuroShieldProtectedResourceIdentityDeserializer(identity)).toEqual(identity);
  });

  it("preserves empty and omitted user-assigned identities", () => {
    for (const identity of [{ type: "None" }, { type: "None", userAssignedIdentities: {} }]) {
      expect(neuroShieldProtectedResourceIdentitySerializer(identity)).toEqual(identity);
      expect(neuroShieldProtectedResourceIdentityDeserializer(identity)).toEqual(identity);
    }
  });
});
