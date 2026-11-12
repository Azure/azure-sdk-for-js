// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { getSendCertificateChain } from "$internal/credentials/environmentCredential.js";
import { DefaultAzureCredential, EnvironmentCredential } from "@azure/identity";
import type { AuthenticationResult } from "@azure/msal-node";
import { ConfidentialClientApplication } from "@azure/msal-node";
import path from "node:path";
import { describe, it, assert, expect, vi, beforeEach, afterEach, type MockInstance } from "vitest";

describe("EnvironmentCredential (internal)", function () {
  afterEach(function () {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  describe("#getSendCertificateChain", () => {
    it("should parse 'true' correctly", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", "true");

      const sendCertificateChain = getSendCertificateChain();
      assert.isTrue(sendCertificateChain);
    });

    it("should parse '1' correctly", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", "1");

      const sendCertificateChain = getSendCertificateChain();
      assert.isTrue(sendCertificateChain);
    });

    it("is case insensitive", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", "TrUe");

      const sendCertificateChain = getSendCertificateChain();
      assert.isTrue(sendCertificateChain);
    });

    it("should parse undefined correctly", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", undefined);

      const sendCertificateChain = getSendCertificateChain();
      assert.isFalse(sendCertificateChain);
    });

    it("should default other values to false", async () => {
      vi.stubEnv("AZURE_CLIENT_SEND_CERTIFICATE_CHAIN", "foobar");

      const sendCertificateChain = getSendCertificateChain();
      assert.isFalse(sendCertificateChain);
    });
  });

  describe("AZURE_ADDITIONALLY_ALLOWED_TENANTS", () => {
    const scope = "https://vault.azure.net/.default";
    const otherTenantId = "other-tenant";
    const certificatePath = path.resolve(__dirname, "..", "..", "..", "assets", "fake-cert.pem");
    const notAllowedMessage = `The current credential is not configured to acquire tokens for tenant ${otherTenantId}`;

    let acquireTokenSpy: MockInstance<
      typeof ConfidentialClientApplication.prototype.acquireTokenByClientCredential
    >;

    beforeEach(() => {
      for (const name of [
        "AZURE_CLIENT_SECRET",
        "AZURE_CLIENT_CERTIFICATE_PATH",
        "AZURE_CLIENT_CERTIFICATE_PASSWORD",
        "AZURE_USERNAME",
        "AZURE_PASSWORD",
        "AZURE_ADDITIONALLY_ALLOWED_TENANTS",
        "AZURE_TOKEN_CREDENTIALS",
      ]) {
        vi.stubEnv(name, undefined);
      }
      vi.stubEnv("AZURE_TENANT_ID", "home-tenant");
      vi.stubEnv("AZURE_CLIENT_ID", "client-id");

      acquireTokenSpy = vi
        .spyOn(ConfidentialClientApplication.prototype, "acquireTokenByClientCredential")
        .mockResolvedValue({
          accessToken: "token",
          expiresOn: new Date(Date.now() + 3600 * 1000),
        } as AuthenticationResult);
    });

    function assertTokenRequestedFor(tenantId: string): void {
      expect(acquireTokenSpy).toHaveBeenCalledOnce();
      assert.include(acquireTokenSpy.mock.calls[0][0].authority, tenantId);
    }

    const environments = [
      { name: "a client secret", variables: { AZURE_CLIENT_SECRET: "secret" } },
      {
        name: "a client certificate",
        variables: { AZURE_CLIENT_CERTIFICATE_PATH: certificatePath },
      },
    ];

    for (const { name, variables } of environments) {
      describe(`with ${name}`, () => {
        beforeEach(() => {
          for (const [key, value] of Object.entries(variables)) {
            vi.stubEnv(key, value);
          }
        });

        it("acquires a token for a tenant listed in the variable", async () => {
          vi.stubEnv("AZURE_ADDITIONALLY_ALLOWED_TENANTS", `some-tenant;${otherTenantId}`);

          const credential = new EnvironmentCredential();
          const token = await credential.getToken(scope, { tenantId: otherTenantId });

          assert.equal(token.token, "token");
          assertTokenRequestedFor(otherTenantId);
        });

        it("acquires a token for any tenant when the variable is '*'", async () => {
          vi.stubEnv("AZURE_ADDITIONALLY_ALLOWED_TENANTS", "*");

          const credential = new EnvironmentCredential();
          const token = await credential.getToken(scope, { tenantId: otherTenantId });

          assert.equal(token.token, "token");
          assertTokenRequestedFor(otherTenantId);
        });

        it("rejects a tenant that is not listed in the variable", async () => {
          vi.stubEnv("AZURE_ADDITIONALLY_ALLOWED_TENANTS", "some-tenant");

          const credential = new EnvironmentCredential();
          await expect(credential.getToken(scope, { tenantId: otherTenantId })).rejects.toThrow(
            notAllowedMessage,
          );
          expect(acquireTokenSpy).not.toHaveBeenCalled();
        });
      });
    }

    it("keeps the additionallyAllowedTenants option when the variable is not set", async () => {
      vi.stubEnv("AZURE_CLIENT_SECRET", "secret");

      const credential = new EnvironmentCredential({ additionallyAllowedTenants: [otherTenantId] });
      const token = await credential.getToken(scope, { tenantId: otherTenantId });

      assert.equal(token.token, "token");
      assertTokenRequestedFor(otherTenantId);
    });

    it("prefers the additionallyAllowedTenants option over the variable", async () => {
      vi.stubEnv("AZURE_CLIENT_SECRET", "secret");
      vi.stubEnv("AZURE_ADDITIONALLY_ALLOWED_TENANTS", "*");

      const credential = new EnvironmentCredential({ additionallyAllowedTenants: ["some-tenant"] });
      await expect(credential.getToken(scope, { tenantId: otherTenantId })).rejects.toThrow(
        notAllowedMessage,
      );
    });

    it("applies to the EnvironmentCredential in DefaultAzureCredential", async () => {
      vi.stubEnv("AZURE_CLIENT_SECRET", "secret");
      vi.stubEnv("AZURE_ADDITIONALLY_ALLOWED_TENANTS", otherTenantId);

      const credential = new DefaultAzureCredential();
      const token = await credential.getToken(scope, { tenantId: otherTenantId });

      assert.equal(token.token, "token");
      assertTokenRequestedFor(otherTenantId);
    });
  });
});
