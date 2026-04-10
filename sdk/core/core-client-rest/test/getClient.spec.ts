// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { getClient } from "../src/getClient.js";
import { isNodeLike } from "@typespec/ts-http-runtime/internal/util";
import type {
  HttpClient,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { createEmptyPipeline, createHttpHeaders, RestError } from "@azure/core-rest-pipeline";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";

describe("getClient", () => {
  const httpClient = {
    sendRequest: (req: PipelineRequest) => {
      return Promise.resolve({
        headers: createHttpHeaders(),
        status: 200,
        request: req,
      }) as Promise<PipelineResponse>;
    },
  };

  describe("#apiVersionPolicy", () => {
    it("should add apiVersion to requests if apiVersion is absent", async () => {
      const apiVersion = "2021-11-18";
      const client = getClient("https://example.org", { apiVersion, httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `api-version=${apiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").get();
    });

    it("should use operation-level apiVersion even if we config the client one", async () => {
      const clientApiVersion = "2021-11-18",
        operationApiVersion = "2022-01-01";
      const client = getClient("https://example.org", { apiVersion: clientApiVersion, httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `api-version=${operationApiVersion}`);
          assert.notInclude(req.url, `api-version=${clientApiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });

      // Define the apiVersion at operation-level
      await client.pathUnchecked("/foo").get({
        queryParameters: {
          "api-version": operationApiVersion,
        },
      });
    });

    it("should use apiVersion in url directly even if we config the client one", async () => {
      const clientApiVersion = "2021-11-18",
        operationApiVersion = "2022-01-01";
      const client = getClient("https://example.org", { apiVersion: clientApiVersion, httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `api-version=${operationApiVersion}`);
          assert.notInclude(req.url, `api-version=${clientApiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });

      // Define the apiVersion in url
      await client.pathUnchecked(`/foo?api-version=${operationApiVersion}`).get();
    });

    it("should not encode url when skip query parameter encoding and api version parameter exists", async () => {
      const apiVersion = "2021-11-18";
      const client = getClient("https://example.org", { apiVersion, httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `colors=blue,red,green&api-version=${apiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").get({
        queryParameters: {
          colors: ["blue", "red", "green"],
        },
        skipUrlEncoding: true,
      });
    });

    it("should encode url when not skip query parameter encoding and api version parameter exists", async () => {
      const apiVersion = "2021-11-18";
      const client = getClient("https://example.org", { apiVersion, httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `colors=blue,red,green&api-version=${apiVersion}`);
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").get({
        queryParameters: {
          colors: ["blue", "red", "green"],
        },
      });
    });
  });

  it("should append api version correctly", async () => {
    const apiVersion = "2021-11-18";
    const client = getClient("https://example.org", { apiVersion, httpClient });
    const validationPolicy: PipelinePolicy = {
      name: "validationPolicy",
      sendRequest: (req, next) => {
        assert.equal(req.url, `https://example.org/foo?api-version=${apiVersion}`);
        return next(req);
      },
    };

    client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
    await client.pathUnchecked("/foo").get();
  });

  it("should insert policies in the correct pipeline position", async function () {
    const sendRequest = (request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> =>
      next(request);
    const retryPolicy: PipelinePolicy = {
      name: "retry",
      sendRequest,
    };
    const policy1: PipelinePolicy = {
      name: "policy1",
      sendRequest,
    };
    const policy2: PipelinePolicy = {
      name: "policy2",
      sendRequest,
    };

    const client = getClient("https://example.org?api-version=1233321", {
      additionalPolicies: [
        { policy: policy1, position: "perRetry" },
        { policy: policy2, position: "perCall" },
      ],
    });
    client.pipeline.addPolicy(retryPolicy, { phase: "Retry" });
    assert(client);
    const policies = client.pipeline.getOrderedPolicies();
    assert.isTrue(policies.indexOf(policy2) < policies.indexOf(retryPolicy));
    assert.isTrue(policies.indexOf(retryPolicy) < policies.indexOf(policy1));
  });

  it("should use the client setting for `allowInsecureConnection` when the request setting is undefined", async () => {
    const fakeHttpClient: HttpClient = {
      sendRequest: async (request) => {
        assert.isTrue(request.allowInsecureConnection);
        return { headers: createHttpHeaders(), status: 200, request };
      },
    };

    const client = getClient("https://example.org", {
      allowInsecureConnection: true,
      httpClient: fakeHttpClient,
    });

    await client.pathUnchecked("/foo").get({
      allowInsecureConnection: undefined,
    });
  });

  it("should not use the client setting for `allowInsecureConnection` when the request setting is false", async () => {
    const fakeHttpClient: HttpClient = {
      sendRequest: async (request) => {
        assert.isFalse(request.allowInsecureConnection);
        return { headers: createHttpHeaders(), status: 200, request };
      },
    };

    const client = getClient("https://example.org", {
      allowInsecureConnection: true,
      httpClient: fakeHttpClient,
    });

    await client.pathUnchecked("/foo").get({
      allowInsecureConnection: false,
    });
  });

  it("stream methods should call onResponse", async () => {
    let called = false;
    const fakeHttpClient: HttpClient = {
      sendRequest: async (request) => {
        return { headers: createHttpHeaders(), status: 200, request };
      },
    };

    const client = getClient("https://example.org", {
      httpClient: fakeHttpClient,
    });
    const res = client.pathUnchecked("/foo").get({
      onResponse: () => {
        called = true;
      },
    });

    if (isNodeLike) {
      await res.asNodeStream();
    } else {
      await res.asBrowserStream();
    }
    assert.isTrue(called);
  });

  it("onResponse legacyError is passed in", async () => {
    let called = false;
    const fakeHttpClient: HttpClient = {
      sendRequest: async () => {
        throw new RestError("error", {
          response: { status: 404, headers: createHttpHeaders({}) } as PipelineResponse,
        });
      },
    };

    const client = getClient("https://example.org", {
      httpClient: fakeHttpClient,
    });

    try {
      await client.pathUnchecked("/foo").get({
        onResponse: (_, err, legacyError) => {
          assert.isDefined(err);
          assert.equal(err, legacyError);
          called = true;
        },
      });
      assert.fail("Expected error to be thrown");
    } catch (e: unknown) {
      assert.isTrue(called);
    }
  });

  it("should support query parameter with explode set to true", async () => {
    const client = getClient("https://example.org", { httpClient });
    const validationPolicy: PipelinePolicy = {
      name: "validationPolicy",
      sendRequest: (req, next) => {
        assert.include(req.url, `colors=blue&colors=red&colors=green`);
        return next(req);
      },
    };

    client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
    await client.pathUnchecked("/foo").get({
      queryParameters: {
        colors: {
          value: ["blue", "red", "green"],
          explode: true,
        },
      },
    });
  });

  it("should support path parameter with allowReserved set to true", async () => {
    const client = getClient("https://example.org", { httpClient });
    const validationPolicy: PipelinePolicy = {
      name: "validationPolicy",
      sendRequest: (req, next) => {
        assert.equal(req.url, `https://example.org/test/test!@#$%^/blah`);
        return next(req);
      },
    };

    client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
    await client
      .pathUnchecked("/{foo}/blah", { value: "test/test!@#$%^", allowReserved: true })
      .get();
  });

  describe("when pipeline is passed via options", () => {
    it("should use the provided pipeline when passed via second parameter (options only)", async () => {
      let customPolicyInvoked = false;
      const customPipeline = createEmptyPipeline();
      const customPolicy: PipelinePolicy = {
        name: "customTrackingPolicy",
        sendRequest: (req, next) => {
          customPolicyInvoked = true;
          return next(req);
        },
      };
      customPipeline.addPolicy(customPolicy);

      const client = getClient("https://example.org", {
        pipeline: customPipeline,
        httpClient,
      });

      await client.pathUnchecked("/foo").get();
      assert.isTrue(
        customPolicyInvoked,
        "Custom pipeline policy should have been invoked when pipeline passed via second parameter",
      );
    });

    it("should use the provided pipeline when passed via third parameter (with TokenCredential)", async () => {
      let customPolicyInvoked = false;
      const customPipeline = createEmptyPipeline();
      const customPolicy: PipelinePolicy = {
        name: "customTrackingPolicy",
        sendRequest: (req, next) => {
          customPolicyInvoked = true;
          return next(req);
        },
      };
      customPipeline.addPolicy(customPolicy);

      const mockCredential: TokenCredential = {
        getToken: async () => ({ token: "mock-token", expiresOnTimestamp: Date.now() + 3600000 }),
      };

      const client = getClient("https://example.org", mockCredential, {
        pipeline: customPipeline,
        httpClient,
      });

      await client.pathUnchecked("/foo").get();
      assert.isTrue(
        customPolicyInvoked,
        "Custom pipeline policy should have been invoked when pipeline passed via third parameter with TokenCredential",
      );
    });

    it("should use the provided pipeline when passed via third parameter (with KeyCredential)", async () => {
      let customPolicyInvoked = false;
      const customPipeline = createEmptyPipeline();
      const customPolicy: PipelinePolicy = {
        name: "customTrackingPolicy",
        sendRequest: (req, next) => {
          customPolicyInvoked = true;
          return next(req);
        },
      };
      customPipeline.addPolicy(customPolicy);

      const mockKeyCredential: KeyCredential = {
        key: "mock-api-key",
      };

      const client = getClient("https://example.org", mockKeyCredential, {
        pipeline: customPipeline,
        httpClient,
      });

      await client.pathUnchecked("/foo").get();
      assert.isTrue(
        customPolicyInvoked,
        "Custom pipeline policy should have been invoked when pipeline passed via third parameter with KeyCredential",
      );
    });

    it("should preserve custom pipeline policies order", async () => {
      const policiesInvoked: string[] = [];
      const customPipeline = createEmptyPipeline();

      const firstPolicy: PipelinePolicy = {
        name: "firstPolicy",
        sendRequest: (req, next) => {
          policiesInvoked.push("first");
          return next(req);
        },
      };
      const secondPolicy: PipelinePolicy = {
        name: "secondPolicy",
        sendRequest: (req, next) => {
          policiesInvoked.push("second");
          return next(req);
        },
      };

      customPipeline.addPolicy(firstPolicy);
      customPipeline.addPolicy(secondPolicy);

      const client = getClient("https://example.org", {
        pipeline: customPipeline,
        httpClient,
      });

      await client.pathUnchecked("/foo").get();
      assert.deepEqual(policiesInvoked, ["first", "second"], "Policies should be invoked in order");
    });

    it("should not add default policies when custom pipeline is provided", async () => {
      const customPipeline = createEmptyPipeline();
      const trackingPolicy: PipelinePolicy = {
        name: "trackingPolicy",
        sendRequest: (req, next) => {
          return next(req);
        },
      };
      customPipeline.addPolicy(trackingPolicy);

      const client = getClient("https://example.org", {
        pipeline: customPipeline,
        httpClient,
        apiVersion: "2021-01-01", // This would normally add apiVersionPolicy
      });

      const policies = client.pipeline.getOrderedPolicies();
      // The pipeline should only contain our custom policy, not any default policies
      assert.equal(policies.length, 1, "Custom pipeline should not have default policies added");
      assert.equal(policies[0].name, "trackingPolicy");
    });
  });
});
