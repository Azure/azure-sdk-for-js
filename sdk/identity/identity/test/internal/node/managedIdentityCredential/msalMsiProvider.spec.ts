// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { AuthenticationResult, ManagedIdentityRequestParams } from "@azure/msal-node";
import { AuthError, ManagedIdentityApplication } from "@azure/msal-node";
import { ManagedIdentityCredential } from "../../../../src/credentials/managedIdentityCredential/index.js";
import { tokenExchangeMsi } from "../../../../src/credentials/managedIdentityCredential/tokenExchangeMsi.js";
import { imdsMsi } from "../../../../src/credentials/managedIdentityCredential/imdsMsi.js";
import { RestError } from "@azure/core-rest-pipeline";
import { AuthenticationRequiredError, CredentialUnavailableError } from "../../../../src/errors.js";
import type { AccessToken, GetTokenOptions } from "@azure/core-auth";
import { describe, it, assert, expect, vi, beforeEach, afterEach, MockInstance } from "vitest";
import { IdentityClient } from "../../../../src/client/identityClient.js";

describe("ManagedIdentityCredential (MSAL)", function () {
  let acquireTokenStub: MockInstance<
    (managedIdentityRequestParams: ManagedIdentityRequestParams) => Promise<AuthenticationResult>
  >;
  let imdsIsAvailableStub: MockInstance<
    (options: {
      scopes: string | string[];
      identityClient?: IdentityClient;
      clientId?: string;
      resourceId?: string;
      getTokenOptions?: GetTokenOptions;
    }) => Promise<boolean>
  >;

  const validAuthenticationResult: Partial<AuthenticationResult> = {
    accessToken: "test_token",
    expiresOn: new Date(),
  };

  beforeEach(function () {
    acquireTokenStub = vi.spyOn(ManagedIdentityApplication.prototype, "acquireToken");
    imdsIsAvailableStub = vi.spyOn(imdsMsi, "isAvailable").mockResolvedValue(true); // Skip pinging the IMDS endpoint in tests
  });

  afterEach(function () {
    vi.restoreAllMocks();
  });

  describe("constructor", function () {
    describe("constructor overloads", function () {
      // ensures that the constructor supports the following signatures:
      // 1. MsalMsiProvider(options: MsalMsiOptions)
      // 2. MsalMsiProvider(clientId: string, options: MsalMsiOptions)
      // by relying on the error handling of the constructor
      it("throws when both clientId and resourceId are provided", function () {
        assert.throws(
          () => new ManagedIdentityCredential("id", { resourceId: "id" } as any),
          /only one of 'clientId', 'resourceId', or 'objectId' can be provided/,
        );
      });

      it("throws when both clientId and resourceId are provided via options", function () {
        assert.throws(
          () => new ManagedIdentityCredential({ clientId: "id", resourceId: "id" } as any),
          /only one of 'clientId', 'resourceId', or 'objectId' can be provided/,
        );
      });

      it("throws when both clientId and objectId are provided", function () {
        assert.throws(
          () => new ManagedIdentityCredential("id", { objectId: "id" } as any),
          /only one of 'clientId', 'resourceId', or 'objectId' can be provided/,
        );
      });

      it("throws when both resourceId and objectId are provided via options", function () {
        assert.throws(
          () => new ManagedIdentityCredential({ resourceId: "id", objectId: "id" } as any),
          /only one of 'clientId', 'resourceId', or 'objectId' can be provided/,
        );
      });
    });

    describe("when using CloudShell Managed Identity", function () {
      it("throws when user-assigned IDs are provided", function () {
        vi.spyOn(ManagedIdentityApplication.prototype, "getManagedIdentitySource").mockReturnValue(
          "CloudShell",
        );

        assert.throws(
          () => new ManagedIdentityCredential({ clientId: "id" }),
          /Specifying a user-assigned managed identity is not supported for CloudShell at runtime/,
        );
        assert.throws(
          () => new ManagedIdentityCredential({ resourceId: "id" }),
          /Specifying a user-assigned managed identity is not supported for CloudShell at runtime/,
        );
        assert.throws(
          () => new ManagedIdentityCredential({ objectId: "id" }),
          /Specifying a user-assigned managed identity is not supported for CloudShell at runtime/,
        );
      });
    });
  });

  describe("#getToken", function () {
    describe("when getToken is successful", function () {
      it("returns a token", async function () {
        acquireTokenStub.mockResolvedValue(validAuthenticationResult as AuthenticationResult);
        const credential = new ManagedIdentityCredential();
        const token = await credential.getToken("scope");
        assert.strictEqual(token.token, validAuthenticationResult.accessToken);
        assert.strictEqual(
          token.expiresOnTimestamp,
          validAuthenticationResult.expiresOn?.getTime(),
        );
      });

      describe("when using tokenExchangeMsi", function () {
        it("gets a token using the tokenExchangeMsi implementation", async function () {
          const validToken = {
            token: "test_token",
            expiresOnTimestamp: new Date().getTime(),
            tokenType: "Bearer",
          } as AccessToken;

          vi.spyOn(tokenExchangeMsi, "isAvailable").mockResolvedValue(true);

          vi.spyOn(tokenExchangeMsi, "getToken").mockResolvedValue(validToken);

          const credential = new ManagedIdentityCredential();
          const token = await credential.getToken("scope");
          assert.strictEqual(token.token, validToken.token);
          assert.strictEqual(token.expiresOnTimestamp, validToken.expiresOnTimestamp);
        });
      });

      describe("when using IMDS", function () {
        it("probes the IMDS endpoint", async function () {
          vi.spyOn(
            ManagedIdentityApplication.prototype,
            "getManagedIdentitySource",
          ).mockReturnValue("DefaultToImds");
          acquireTokenStub.mockResolvedValue(validAuthenticationResult as AuthenticationResult);

          const credential = new ManagedIdentityCredential();
          await credential.getToken("scope");
          expect(imdsIsAvailableStub).toHaveBeenCalledOnce();
        });
      });
    });

    it("validates multiple scopes are not supported", async function () {
      const credential = new ManagedIdentityCredential();
      await expect(credential.getToken(["scope1", "scope2"])).rejects.toThrow(/Multiple scopes/);
    });

    describe("error handling", function () {
      it("rethrows AuthenticationRequiredError", async function () {
        acquireTokenStub.mockRejectedValue(new AuthenticationRequiredError({ scopes: ["scope"] }));
        const credential = new ManagedIdentityCredential();
        await expect(credential.getToken("scope")).rejects.toThrow(AuthenticationRequiredError);
      });

      it("handles an unreachable network error", async function () {
        acquireTokenStub.mockRejectedValue(new AuthError("network_error"));
        const credential = new ManagedIdentityCredential();
        await expect(credential.getToken("scope")).rejects.toThrow(CredentialUnavailableError);
      });

      it("handles a 403 status code", async function () {
        acquireTokenStub.mockRejectedValue(
          new RestError("A socket operation was attempted to an unreachable network", {
            statusCode: 403,
          }),
        );
        const credential = new ManagedIdentityCredential();
        await expect(credential.getToken("scope")).rejects.toThrow(/Network unreachable/);
      });

      it("handles unexpected errors", async function () {
        acquireTokenStub.mockRejectedValue(new Error("Some unexpected error"));
        const credential = new ManagedIdentityCredential();
        await expect(credential.getToken("scope")).rejects.toThrow(/Authentication failed/);
      });
    });
  });
});
