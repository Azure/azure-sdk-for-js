// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi, expect } from "vitest";
import { getClient } from "../../src/getClient.js";
import { isNodeLike } from "@typespec/ts-http-runtime/internal/util";
import type {
  HttpClient,
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import {
  createEmptyPipeline,
  createHttpHeaders,
  createPipelineRequest,
  RestError,
} from "@azure/core-rest-pipeline";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";

describe("getClient", () => {
  const httpClient: HttpClient = {
    sendRequest: (req: PipelineRequest) => {
      return Promise.resolve({
        headers: createHttpHeaders(),
        status: 200,
        request: req,
      });
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

    it("should preserve comma in query parameter when encoding is enabled and api version parameter exists", async () => {
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
    assert.isDefined(client);
    const policies = client.pipeline.getOrderedPolicies();
    const policy2Index = policies.indexOf(policy2);
    const retryPolicyIndex = policies.indexOf(retryPolicy);
    const policy1Index = policies.indexOf(policy1);
    assert.isBelow(policy2Index, retryPolicyIndex);
    assert.isBelow(retryPolicyIndex, policy1Index);
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
    const fakeHttpClient: HttpClient = {
      sendRequest: async (request) => {
        return { headers: createHttpHeaders(), status: 200, request };
      },
    };

    const onResponseFn = vi.fn();
    const client = getClient("https://example.org", {
      httpClient: fakeHttpClient,
    });
    const res = client.pathUnchecked("/foo").get({
      onResponse: onResponseFn,
    });

    if (isNodeLike) {
      await res.asNodeStream();
    } else {
      await res.asBrowserStream();
    }
    expect(onResponseFn).toHaveBeenCalled();
  });

  it("onResponse legacyError is passed in", async () => {
    const fakeHttpClient: HttpClient = {
      sendRequest: async () => {
        throw new RestError("error", {
          response: {
            status: 404,
            headers: createHttpHeaders({}),
            request: createPipelineRequest({ url: "https://example.org/foo" }),
          },
        });
      },
    };

    const onResponseFn = vi.fn((_: any, err: any, legacyError: any) => {
      assert.isDefined(err, "err should be defined");
      assert.equal(err, legacyError);
    });
    const client = getClient("https://example.org", {
      httpClient: fakeHttpClient,
    });

    await expect(
      client.pathUnchecked("/foo").get({
        onResponse: onResponseFn,
      }),
    ).rejects.toThrow(/error/);
    expect(onResponseFn).toHaveBeenCalled();
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

  describe("HTTP methods", () => {
    it("should support post method", async () => {
      const sendRequestSpy = vi.fn<
        (req: PipelineRequest, next: SendRequest) => Promise<PipelineResponse>
      >((req, next) => {
        assert.equal(req.method, "POST");
        return next(req);
      });
      const client = getClient("https://example.org", { httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: sendRequestSpy,
      };
      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").post();
      expect(sendRequestSpy).toHaveBeenCalled();
    });

    it("should support put method", async () => {
      const sendRequestSpy = vi.fn<
        (req: PipelineRequest, next: SendRequest) => Promise<PipelineResponse>
      >((req, next) => {
        assert.equal(req.method, "PUT");
        return next(req);
      });
      const client = getClient("https://example.org", { httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: sendRequestSpy,
      };
      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").put();
      expect(sendRequestSpy).toHaveBeenCalled();
    });

    it("should support patch method", async () => {
      const sendRequestSpy = vi.fn<
        (req: PipelineRequest, next: SendRequest) => Promise<PipelineResponse>
      >((req, next) => {
        assert.equal(req.method, "PATCH");
        return next(req);
      });
      const client = getClient("https://example.org", { httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: sendRequestSpy,
      };
      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").patch();
      expect(sendRequestSpy).toHaveBeenCalled();
    });

    it("should support delete method", async () => {
      const sendRequestSpy = vi.fn<
        (req: PipelineRequest, next: SendRequest) => Promise<PipelineResponse>
      >((req, next) => {
        assert.equal(req.method, "DELETE");
        return next(req);
      });
      const client = getClient("https://example.org", { httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: sendRequestSpy,
      };
      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").delete();
      expect(sendRequestSpy).toHaveBeenCalled();
    });

    it("should support head method", async () => {
      const sendRequestSpy = vi.fn<
        (req: PipelineRequest, next: SendRequest) => Promise<PipelineResponse>
      >((req, next) => {
        assert.equal(req.method, "HEAD");
        return next(req);
      });
      const client = getClient("https://example.org", { httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: sendRequestSpy,
      };
      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").head();
      expect(sendRequestSpy).toHaveBeenCalled();
    });

    it("should support options method", async () => {
      const sendRequestSpy = vi.fn<
        (req: PipelineRequest, next: SendRequest) => Promise<PipelineResponse>
      >((req, next) => {
        assert.equal(req.method, "OPTIONS");
        return next(req);
      });
      const client = getClient("https://example.org", { httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: sendRequestSpy,
      };
      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").options();
      expect(sendRequestSpy).toHaveBeenCalled();
    });

    it("should support trace method", async () => {
      const sendRequestSpy = vi.fn<
        (req: PipelineRequest, next: SendRequest) => Promise<PipelineResponse>
      >((req, next) => {
        assert.equal(req.method, "TRACE");
        return next(req);
      });
      const client = getClient("https://example.org", { httpClient });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: sendRequestSpy,
      };
      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });
      await client.pathUnchecked("/foo").trace();
      expect(sendRequestSpy).toHaveBeenCalled();
    });
  });

  describe("when pipeline is passed via options", () => {
    it("should use the provided pipeline when passed via second parameter (options only)", async () => {
      const sendRequestFn = vi.fn((req: PipelineRequest, next: SendRequest) => next(req));
      const customPipeline = createEmptyPipeline();
      const customPolicy: PipelinePolicy = {
        name: "customTrackingPolicy",
        sendRequest: sendRequestFn,
      };
      customPipeline.addPolicy(customPolicy);

      const client = getClient("https://example.org", {
        pipeline: customPipeline,
        httpClient,
      });

      await client.pathUnchecked("/foo").get();
      expect(sendRequestFn).toHaveBeenCalled();
    });

    it("should use the provided pipeline when passed via third parameter (with TokenCredential)", async () => {
      const sendRequestFn = vi.fn((req: PipelineRequest, next: SendRequest) => next(req));
      const customPipeline = createEmptyPipeline();
      const customPolicy: PipelinePolicy = {
        name: "customTrackingPolicy",
        sendRequest: sendRequestFn,
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
      expect(sendRequestFn).toHaveBeenCalled();
    });

    it("should use the provided pipeline when passed via third parameter (with KeyCredential)", async () => {
      const sendRequestFn = vi.fn((req: PipelineRequest, next: SendRequest) => next(req));
      const customPipeline = createEmptyPipeline();
      const customPolicy: PipelinePolicy = {
        name: "customTrackingPolicy",
        sendRequest: sendRequestFn,
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
      expect(sendRequestFn).toHaveBeenCalled();
    });

    it("should preserve custom pipeline policies order", async () => {
      const firstSpy = vi.fn<
        (req: PipelineRequest, next: SendRequest) => Promise<PipelineResponse>
      >((req, next) => next(req));
      const secondSpy = vi.fn<
        (req: PipelineRequest, next: SendRequest) => Promise<PipelineResponse>
      >((req, next) => next(req));
      const customPipeline = createEmptyPipeline();

      const firstPolicy: PipelinePolicy = {
        name: "firstPolicy",
        sendRequest: firstSpy,
      };
      const secondPolicy: PipelinePolicy = {
        name: "secondPolicy",
        sendRequest: secondSpy,
      };

      customPipeline.addPolicy(firstPolicy);
      customPipeline.addPolicy(secondPolicy);

      const client = getClient("https://example.org", {
        pipeline: customPipeline,
        httpClient,
      });

      await client.pathUnchecked("/foo").get();
      expect(firstSpy).toHaveBeenCalled();
      expect(secondSpy).toHaveBeenCalled();
      expect(firstSpy.mock.invocationCallOrder[0]).toBeLessThan(
        secondSpy.mock.invocationCallOrder[0],
      );
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
