// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import Sinon from "sinon";
import { assert } from "@azure-tools/test-utils";
import type { AuthenticationResult } from "@azure/msal-node";
import { AuthError, ManagedIdentityApplication } from "@azure/msal-node";
import { ManagedIdentityCredential } from "../../../../src/credentials/managedIdentityCredential/index";
import { tokenExchangeMsi } from "../../../../src/credentials/managedIdentityCredential/tokenExchangeMsi";
import { imdsMsi } from "../../../../src/credentials/managedIdentityCredential/imdsMsi";
import { RestError } from "@azure/core-rest-pipeline";
import { AuthenticationRequiredError, CredentialUnavailableError } from "../../../../src/errors";
import type { AccessToken } from "@azure/core-auth";

describe("ManagedIdentityCredential (MSAL)", function () {
  let acquireTokenStub: Sinon.SinonStub;
  let imdsIsAvailableStub: Sinon.SinonStub;

  const validAuthenticationResult: Partial<AuthenticationResult> = {
    accessToken: "test_token",
    expiresOn: new Date(),
  };

  beforeEach(function () {
    acquireTokenStub = Sinon.stub(ManagedIdentityApplication.prototype, "acquireToken");
    imdsIsAvailableStub = Sinon.stub(imdsMsi, "isAvailable").resolves(true); // Skip pinging the IMDS endpoint in tests
  });

  afterEach(function () {
    Sinon.restore();
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
        Sinon.stub(ManagedIdentityApplication.prototype, "getManagedIdentitySource").returns(
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
        acquireTokenStub.resolves(validAuthenticationResult as AuthenticationResult);
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
          Sinon.stub(tokenExchangeMsi, "isAvailable").resolves(true);
          Sinon.stub(tokenExchangeMsi, "getToken").resolves(validToken);

          const credential = new ManagedIdentityCredential();
          const token = await credential.getToken("scope");
          assert.strictEqual(token.token, validToken.token);
          assert.strictEqual(token.expiresOnTimestamp, validToken.expiresOnTimestamp);
        });
      });

      describe("when using IMDS", function () {
        it("probes the IMDS endpoint", async function () {
          Sinon.stub(ManagedIdentityApplication.prototype, "getManagedIdentitySource").returns(
            "DefaultToImds",
          );
          acquireTokenStub.resolves(validAuthenticationResult as AuthenticationResult);

          const credential = new ManagedIdentityCredential();
          await credential.getToken("scope");
          assert.isTrue(imdsIsAvailableStub.calledOnce);
        });
      });
    });

    it("validates multiple scopes are not supported", async function () {
      const credential = new ManagedIdentityCredential();
      await assert.isRejected(credential.getToken(["scope1", "scope2"]), /Multiple scopes/);
    });

    describe("error handling", function () {
      it("rethrows AuthenticationRequiredError", async function () {
        acquireTokenStub.rejects(new AuthenticationRequiredError({ scopes: ["scope"] }));
        const credential = new ManagedIdentityCredential();
        await assert.isRejected(credential.getToken("scope"), AuthenticationRequiredError);
      });

      it("handles an unreachable network error", async function () {
        acquireTokenStub.rejects(new AuthError("network_error"));
        const credential = new ManagedIdentityCredential();
        await assert.isRejected(credential.getToken("scope"), CredentialUnavailableError);
      });

      it("handles a 403 status code", async function () {
        acquireTokenStub.rejects(
          new RestError("A socket operation was attempted to an unreachable network", {
            statusCode: 403,
          }),
        );
        const credential = new ManagedIdentityCredential();
        await assert.isRejected(credential.getToken("scope"), /Network unreachable/);
      });

      it("handles unexpected errors", async function () {
        acquireTokenStub.rejects(new Error("Some unexpected error"));
        const credential = new ManagedIdentityCredential();
        await assert.isRejected(credential.getToken("scope"), /Authentication failed/);
      });
    });
  });
});
