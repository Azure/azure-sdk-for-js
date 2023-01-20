// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { getCachedDefaultHttpsClient } from "../src/clientHelpers";
import { getClient } from "../src/getClient";
import sinon from "sinon";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";

describe("getClient", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("#apiVersionPolicy", () => {
    it("should add apiVersion to requests if apiVersion is absent", async () => {
      const defaultHttpClient = getCachedDefaultHttpsClient();
      sinon.stub(defaultHttpClient, "sendRequest").callsFake(async (req) => {
        return { headers: createHttpHeaders(), status: 200, request: req } as PipelineResponse;
      });

      const apiVersion = "2021-11-18";
      const client = getClient("https://example.org", { apiVersion });
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
      const defaultHttpClient = getCachedDefaultHttpsClient();
      sinon.stub(defaultHttpClient, "sendRequest").callsFake(async (req) => {
        return { headers: createHttpHeaders(), status: 200, request: req } as PipelineResponse;
      });

      const clientApiVersion = "2021-11-18",
        operationApiVersion = "2022-01-01";
      const client = getClient("https://example.org", { apiVersion: clientApiVersion });
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
      const defaultHttpClient = getCachedDefaultHttpsClient();
      sinon.stub(defaultHttpClient, "sendRequest").callsFake(async (req) => {
        return { headers: createHttpHeaders(), status: 200, request: req } as PipelineResponse;
      });

      const clientApiVersion = "2021-11-18",
        operationApiVersion = "2022-01-01";
      const client = getClient("https://example.org", { apiVersion: clientApiVersion });
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
  });

  it("should insert policies in the correct pipeline position", async function () {
    const sendRequest = (request: PipelineRequest, next: SendRequest) => next(request);
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
});
