// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import qs from "qs";
import jws from "jws";
import path from "path";
import assert from "assert";
import { ClientCertificateCredential } from "../../src";
import { MockAuthHttpClient } from "../authTestUtils";
import { TracerProxy, SupportedPlugins } from "@azure/core-http";
import * as tracing from "@opencensus/nodejs";

describe("ClientCertificateCredential", function() {
  it("loads a PEM-formatted certificate from a file", () => {
    const credential = new ClientCertificateCredential(
      "tenant",
      "client",
      path.resolve(__dirname, "../test/azure-identity-test.crt")
    );

    assert.strictEqual(
      (credential as any).certificateThumbprint,
      "47080F3BAA6BF8DF068531106FBCF2DC6E5F6919"
    );

    assert.strictEqual((credential as any).certificateX5t, "RwgPO6pr+N8GhTEQb7zy3G5faRk=");
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

    const authRequest = mockHttpClient.requests[0];
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

      assert.strictEqual(jwtToken.header.x5t, (credential as any).certificateX5t);
      assert.strictEqual(jwtToken.payload.iss, clientId);
      assert.strictEqual(jwtToken.payload.sub, clientId);
      assert.strictEqual(
        jwtToken.payload.aud.startsWith(`https://authority/${tenantId}`),
        true,
        "Audience does not have the correct authority or tenantId"
      );
    }
  });

  it("sends a correctly formated token request with tracer", async () => {
    const tracer = tracing.start({ samplingRate: 1 }).tracer;
    TracerProxy.setTracer(tracer, SupportedPlugins.OPENCENSUS);
    const tenantId = "tenantId";
    const clientId = "clientId";
    const mockHttpClient = new MockAuthHttpClient();

    const credential = new ClientCertificateCredential(
      tenantId,
      clientId,
      path.resolve(__dirname, "../test/azure-identity-test.crt"),
      mockHttpClient.identityClientOptions
    );

    await tracer.startRootSpan({ name: "main" }, async (rootSpan) => {
      await credential.getToken("scope", {
        spanOptions: {
          parent: rootSpan
        }
      });

      assert.strictEqual(
        rootSpan.numberOfChildren,
        1,
        `Number of children ${rootSpan.numberOfChildren} is not equal to 1.`
      );
      const numberOfDescendants = rootSpan.allDescendants().length;
      assert.strictEqual(
        numberOfDescendants,
        1,
        `Number of Descendants ${numberOfDescendants} is not equal to 1.`
      );
    });
  });
});
