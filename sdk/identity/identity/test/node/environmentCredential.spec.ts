// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EnvironmentCredential } from "../../src";
import { MockAuthHttpClient, assertClientCredentials } from "../authTestUtils";
import { TracerProxy, SupportedPlugins } from "@azure/core-http";
import * as tracing from "@opencensus/nodejs";
import assert from "assert";

describe("EnvironmentCredential", function() {
  it("finds and uses client credential environment variables", async () => {
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";

    const mockHttpClient = new MockAuthHttpClient();

    const credential = new EnvironmentCredential(mockHttpClient.identityClientOptions);
    await credential.getToken("scope");

    delete process.env.AZURE_TENANT_ID;
    delete process.env.AZURE_CLIENT_ID;
    delete process.env.AZURE_CLIENT_SECRET;

    const authRequest = mockHttpClient.requests[0];
    assertClientCredentials(authRequest, "tenant", "client", "secret");
  });

  it("finds and uses client credential environment variables with tracer", async () => {
    const tracer = tracing.start({ samplingRate: 1 }).tracer;
    TracerProxy.setTracer(tracer, SupportedPlugins.OPENCENSUS);
    process.env.AZURE_TENANT_ID = "tenant";
    process.env.AZURE_CLIENT_ID = "client";
    process.env.AZURE_CLIENT_SECRET = "secret";
    const mockHttpClient = new MockAuthHttpClient();
    const credential = new EnvironmentCredential(mockHttpClient.identityClientOptions);

    await tracer.startRootSpan({ name: "main" }, async (rootSpan) => {
      await credential.getToken("scope", {
        spanOptions: {
          parent: rootSpan
        }
      });

      delete process.env.AZURE_TENANT_ID;
      delete process.env.AZURE_CLIENT_ID;
      delete process.env.AZURE_CLIENT_SECRET;
      assert.strictEqual(
        rootSpan.numberOfChildren,
        1,
        `Number of children ${rootSpan.numberOfChildren} is not equal to 1.`
      );
      const numberOfDescendants = rootSpan.allDescendants().length;
      assert.strictEqual(
        numberOfDescendants,
        2,
        `Number of Descendants ${numberOfDescendants} is not equal to 2.`
      );
    });
  });
});
