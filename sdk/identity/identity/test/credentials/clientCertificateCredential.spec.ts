// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import jws from "jws";
import path from "path";
import assert from "assert";
import { ClientCertificateCredential } from "../../src";
import { MockAuthHttpClient } from "./authTestUtils";

describe("ClientCertificateCredential", function () {
  it("loads a PEM-formatted certificate from a file", () => {
    const credential = new ClientCertificateCredential(
      "tenant",
      "client",
      path.resolve(__dirname, "../test/azure-identity-test.crt")
    );

    assert.strictEqual(
      credential.certificateThumbprint,
      "47080F3BAA6BF8DF068531106FBCF2DC6E5F6919"
    );

    assert.strictEqual(credential.certificateX5t, "RwgPO6pr+N8GhTEQb7zy3G5faRk=");
  });

  it("throws when given a file that doesn't contain a PEM-formatted certificate", () => {
    assert.throws(() => {
      new ClientCertificateCredential(
        "tenant",
        "client",
        path.resolve(__dirname, "../src/index.ts")
      );
    });
  });

  it("sends a correctly formated token request", async () => {
    const tenantId = "tenantId";
    const clientId = "clientId";
    const mockHttpClient = new MockAuthHttpClient();

    const credential = new ClientCertificateCredential(
      tenantId,
      clientId,
      path.resolve(__dirname, "../test/azure-identity-test.crt"),
      mockHttpClient.identityClientOptions
    );

    await credential.getToken("scope");

    const authRequest = await mockHttpClient.getAuthRequest();
    if (!authRequest) {
      assert.fail("No authentication request was intercepted");
    } else {
      assert.strictEqual(
        authRequest.url.startsWith(`https://authority/${tenantId}`),
        true,
        "Request URL doesn't contain expected tenantId"
      );
      assert.strictEqual(
        authRequest.body.indexOf(`client_id=${clientId}`) > -1,
        true,
        "Request URL doesn't contain expected clientId"
      );

      const queryParams = qs.parse(authRequest.body);
      const jwtToken = jws.decode(queryParams.client_assertion);

      assert.strictEqual(jwtToken.header.x5t, credential.certificateX5t);
      assert.strictEqual(jwtToken.payload.iss, clientId);
      assert.strictEqual(jwtToken.payload.sub, clientId);
      assert.strictEqual(
        jwtToken.payload.aud.startsWith(`https://authority/${tenantId}`),
        true,
        "Audience does not have the correct authority or tenantId"
      );
    }
  });
});
