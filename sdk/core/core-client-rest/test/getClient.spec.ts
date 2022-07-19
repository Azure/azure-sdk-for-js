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

    it("should replace existing apiVersion to requests with client api-version", async () => {
      const defaultHttpClient = getCachedDefaultHttpsClient();
      sinon.stub(defaultHttpClient, "sendRequest").callsFake(async (req) => {
        return { headers: createHttpHeaders(), status: 200, request: req } as PipelineResponse;
      });

      const apiVersion = "2021-11-18";
      const client = getClient("https://example.org?api-version=1233321", { apiVersion });
      const validationPolicy: PipelinePolicy = {
        name: "validationPolicy",
        sendRequest: (req, next) => {
          assert.include(req.url, `api-version=${apiVersion}`);
          assert.notInclude(req.url, "api-version=1233321");
          return next(req);
        },
      };

      client.pipeline.addPolicy(validationPolicy, { afterPhase: "Serialize" });

      await client.pathUnchecked("/foo").get();
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
