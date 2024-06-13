// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import Sinon from "sinon";
import { assert } from "@azure-tools/test-utils";
import { AuthError, AuthenticationResult, ManagedIdentityApplication } from "@azure/msal-node";
import { MsalMsiProvider } from "../../../../src/credentials/managedIdentityCredential/msalMsiProvider";
import { tokenExchangeMsi } from "../../../../src/credentials/managedIdentityCredential/tokenExchangeMsi";
import { imdsMsi } from "../../../../src/credentials/managedIdentityCredential/imdsMsi";
import { RestError } from "@azure/core-rest-pipeline";
import { AuthenticationRequiredError, CredentialUnavailableError } from "../../../../src/errors";

describe("ManagedIdentityCredential (MSAL)", function () {
  let msal: Sinon.SinonStub;
  const validAuthenticationResult: Partial<AuthenticationResult> = {
    accessToken: "test_token",
    expiresOn: new Date(),
  };

  afterEach(function () {
    Sinon.restore();
  });

  beforeEach(function () {
    // minimal stub
    msal = Sinon.stub(ManagedIdentityApplication.prototype, "acquireToken");
  });

  describe("constructor", function () {
    it("throws when both clientId and resourceId are provided", function () {
      assert.throws(
        () => new MsalMsiProvider({ clientId: "id", resourceId: "id" }),
        /provided at the same time./,
      );
    });
  });

  describe("#getToken", function () {
    describe("when getToken is successful", function () {
      it("returns a token", async function () {
        msal.resolves(validAuthenticationResult as AuthenticationResult);
        const provider = new MsalMsiProvider();
        const token = await provider.getToken("scope");
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
          };
          Sinon.stub(tokenExchangeMsi, "isAvailable").resolves(true);
          Sinon.stub(tokenExchangeMsi, "getToken").resolves(validToken);

          const provider = new MsalMsiProvider();
          const token = await provider.getToken("scope");
          assert.strictEqual(token.token, validToken.token);
          assert.strictEqual(token.expiresOnTimestamp, validToken.expiresOnTimestamp);
        });
      });

      describe("when using IMDS", function () {
        it("probes the IMDS endpoint", async function () {
          Sinon.stub(ManagedIdentityApplication.prototype, "getManagedIdentitySource").returns(
            "DefaultToImds",
          );
          const isAvailableStub = Sinon.stub(imdsMsi, "isAvailable").resolves(true);
          msal.resolves(validAuthenticationResult as AuthenticationResult);

          const provider = new MsalMsiProvider();
          await provider.getToken("scope");
          assert.isTrue(isAvailableStub.calledOnce);
        });
      });
    });

    it("validates multiple scopes are not supported", async function () {
      const provider = new MsalMsiProvider();
      await assert.isRejected(provider.getToken(["scope1", "scope2"]), /Multiple scopes/);
    });

    describe("error handling", function () {
      it("rethrows AuthenticationRequiredError", async function () {
        msal.rejects(new AuthenticationRequiredError({ scopes: ["scope"] }));
        const provider = new MsalMsiProvider();
        await assert.isRejected(provider.getToken("scope"), AuthenticationRequiredError);
      });

      it("handles an unreachable network error", async function () {
        msal.rejects(new AuthError("network_error"));
        const provider = new MsalMsiProvider();
        await assert.isRejected(provider.getToken("scope"), CredentialUnavailableError);
      });

      it("handles a 403 status code", async function () {
        msal.rejects(
          new RestError("A socket operation was attempted to an unreachable network", {
            statusCode: 403,
          }),
        );
        const provider = new MsalMsiProvider();
        await assert.isRejected(provider.getToken("scope"), /Network unreachable/);
      });

      it("handles unexpected errors", async function () {
        msal.rejects(new Error("Some unexpected error"));
        const provider = new MsalMsiProvider();
        await assert.isRejected(provider.getToken("scope"), /Authentication failed/);
      });
    });
  });
});
