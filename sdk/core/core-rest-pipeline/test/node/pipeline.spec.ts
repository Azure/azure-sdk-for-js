// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as td from "testdouble";
import { /* proxyPolicy, */ proxyPolicy, proxyPolicyName } from "../../src/policies/proxyPolicy.js";
import { tlsPolicy, tlsPolicyName } from "../../src/policies/tlsPolicy.js";
import { HttpClient } from "../../src/interfaces.js";
import { HttpsProxyAgent } from "https-proxy-agent";
import { assert } from "chai";
import { createEmptyPipeline } from "../../src/pipeline.js";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import { createPipelineFromOptions } from "../../src/createPipelineFromOptions.js";

describe("HttpsPipeline", function () {
  describe("Agent creation", function () {
    afterEach(() => {
      td.reset();
    });

    it("should create a proxy agent", async function () {
      const pipeline = createPipelineFromOptions({
        proxyOptions: { host: "https://foo", port: 12345 },
      });
      const httpClient: HttpClient = {
        sendRequest: async (request) => {
          assert.instanceOf(request.agent, HttpsProxyAgent);
          return {
            request,
            headers: createHttpHeaders(),
            status: 200,
          };
        },
      };
      await pipeline.sendRequest(httpClient, {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "1",
        timeout: 10000,
        url: "https://localhost",
        withCredentials: false,
      });
    });

    it("should honor proxy over tls", async function () {
      const fakePfx = "fakeCert";
      const pipeline = createPipelineFromOptions({
        proxyOptions: { host: "https://foo2", port: 12345 },
      });
      const httpClient: HttpClient = {
        sendRequest: async (request) => {
          assert.instanceOf(request.agent, HttpsProxyAgent);
          assert.isUndefined((request.agent as any).proxy.pfx);
          return {
            request,
            headers: createHttpHeaders(),
            status: 200,
          };
        },
      };

      pipeline.removePolicy({ name: tlsPolicyName });
      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }), { beforePolicies: [proxyPolicyName] });

      await pipeline.sendRequest(httpClient, {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "1",
        timeout: 10000,
        url: "https://localhost2",
        withCredentials: false,
      });
    });

    it("should create an agent with certificates", async function () {
      const https = await td.replaceEsm("https");
      const { createNodeHttpClient } = await import("../../src/nodeHttpClient.js");

      td.when(https.request(), { ignoreExtraArgs: true }).thenThrow(new Error("ok"));

      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const httpClient: HttpClient = createNodeHttpClient();

      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }));

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });

      td.verify(new https.Agent(td.matchers.contains({ pfx: fakePfx })));
    });

    it("should honor tls in request over pipeline options", async function () {
      const https = await td.replaceEsm("https");
      const { createNodeHttpClient } = await import("../../src/nodeHttpClient.js");

      td.when(https.request(), { ignoreExtraArgs: true }).thenThrow(new Error("ok"));

      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const httpClient: HttpClient = createNodeHttpClient();

      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }));

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
          tlsSettings: { pfx: "requestPfx" },
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });

      td.verify(new https.Agent(td.matchers.contains({ pfx: "requestPfx" })));
    });

    it("should set tls options when only request tls is set", async function () {
      const https = await td.replaceEsm("https");
      const { createNodeHttpClient } = await import("../../src/nodeHttpClient.js");

      td.when(https.request(), { ignoreExtraArgs: true }).thenThrow(new Error("ok"));

      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const httpClient: HttpClient = createNodeHttpClient();

      pipeline.addPolicy(tlsPolicy());

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
          tlsSettings: { pfx: fakePfx },
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });

      td.verify(new https.Agent(td.matchers.contains({ pfx: fakePfx })));
    });

    it("should use cached agent when TLS settings did not change", async function () {
      const https = await td.replaceEsm("https");
      const { createNodeHttpClient } = await import("../../src/nodeHttpClient.js");

      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const httpClient: HttpClient = createNodeHttpClient();

      td.when(https.request(td.matchers.anything(), td.matchers.anything())).thenThrow(new Error("ok"));

      td.when(new https.Agent(td.matchers.contains({ pfx: fakePfx })), { times: 1 }).thenReturn({
        options: {
          pfx: fakePfx,
          keepAlive: true,
        }
      });

      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }));

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });
    });

    it("should create a new agent if new tlsSettings are set", async function () {
      const https = await td.replaceEsm("https");
      const { createNodeHttpClient } = await import("../../src/nodeHttpClient.js");

      const pipeline = createEmptyPipeline();
      const fakePfx = "fakecert";
      const newFakePfx = "newFakeCert";

      const httpClient: HttpClient = createNodeHttpClient();
      td.when(https.request(td.matchers.anything(), td.matchers.anything())).thenThrow(new Error("ok"));

      td.when(new https.Agent(td.matchers.contains({ pfx: fakePfx })), { times: 1 }).thenReturn({
        options: {
          pfx: fakePfx,
          keepAlive: true,
        }
      });
      td.when(new https.Agent(td.matchers.contains({ pfx: newFakePfx })), { times: 1 }).thenReturn({
        options: {
          pfx: newFakePfx,
          keepAlive: true,
        }
      });

      pipeline.addPolicy(tlsPolicy({ pfx: fakePfx }));

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });

      await pipeline
        .sendRequest(httpClient, {
          headers: createHttpHeaders(),
          method: "GET",
          requestId: "1",
          timeout: 10000,
          url: "https://localhost",
          withCredentials: false,
          tlsSettings: { pfx: newFakePfx },
        })
        .catch((error) => {
          assert.equal(error.message, "ok");
        });
    });

    it("should honor custom agent when proxy policy is enabled", async () => {
      const https = await td.replaceEsm("https");

      // Set up options on new instances
      td.when(new https.Agent({ maxSockets: 99 })).thenReturn({
        maxSockets: 99,
        options: {
          keepAlive: true,
        }
      });

      const pipeline = createEmptyPipeline();
      const httpClient: HttpClient = {
        sendRequest: (req) => {
          assert.equal(req.agent?.maxSockets, 99);
          return {} as any;
        },
      };
      pipeline.addPolicy(proxyPolicy());

      await pipeline.sendRequest(httpClient, {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "1",
        timeout: 1000,
        url: "https://localhost",
        withCredentials: false,
        agent: new https.Agent({ maxSockets: 99 }),
        proxySettings: { host: "https://localhost", port: 12345 },
      });
    });

    it("should honor custom agent when tlsSettings are passed", async () => {
      const https = await td.replaceEsm("https");

      // Set up options on new instances
      td.when(new https.Agent(td.matchers.contains({ maxSockets: 99 }))).thenReturn({
        maxSockets: 99,
        options: {
          keepAlive: true,
        }
      });

      const pipeline = createEmptyPipeline();
      const httpClient: HttpClient = {
        sendRequest: (req) => {
          assert.equal(req.agent?.maxSockets, 99);
          return {} as any;
        },
      };
      pipeline.addPolicy(tlsPolicy({ pfx: "foo" }));

      await pipeline.sendRequest(httpClient, {
        headers: createHttpHeaders(),
        method: "GET",
        requestId: "1",
        timeout: 1000,
        url: "https://localhost",
        withCredentials: false,
        agent: new https.Agent({ maxSockets: 99 }),
        proxySettings: { host: "https://localhost", port: 12345 },
      });
    });

  });
});
