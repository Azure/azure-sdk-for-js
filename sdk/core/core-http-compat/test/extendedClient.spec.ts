// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { PipelinePolicy, createEmptyPipeline, createHttpHeaders } from "@azure/core-rest-pipeline";
import {
  DictionaryMapper,
  OperationArguments,
  OperationRequest,
  OperationSpec,
  createSerializer,
  serializationPolicy,
} from "@azure/core-client";
import { ExtendedServiceClient, disableKeepAlivePolicyName } from "../src/index.js";
import {
  pipelineContainsDisableKeepAlivePolicy,
  createDisableKeepAlivePolicy,
} from "../src/policies/disableKeepAlivePolicy.js";

describe("Extended Client", () => {
  it("should add the disable keep alive policy", () => {
    const extendedClient = new ExtendedServiceClient({
      keepAliveOptions: {
        enable: false,
      },
    });

    const disableKeepAlivePolicyFound = pipelineContainsDisableKeepAlivePolicy(
      extendedClient.pipeline,
    );

    assert.isTrue(disableKeepAlivePolicyFound);
  });

  it("should not add the disable keep alive policy twice", () => {
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(createDisableKeepAlivePolicy());
    assert.doesNotThrow(() => {
      const extendedClient = new ExtendedServiceClient({
        keepAliveOptions: {
          enable: false,
        },
        pipeline,
      });
      extendedClient.pipeline.getOrderedPolicies();
    });
  });

  it("should remove the redirect policy", () => {
    const extendedClient: ExtendedServiceClient = new ExtendedServiceClient({
      redirectOptions: {
        handleRedirects: false,
      },
    });

    const pipelinePolicies: PipelinePolicy[] = extendedClient.pipeline.getOrderedPolicies();
    let redirectPolicyFound: boolean = false;

    for (const pipelinePolicy of pipelinePolicies) {
      if (pipelinePolicy.name === disableKeepAlivePolicyName) {
        redirectPolicyFound = true;
      }
    }

    assert.deepStrictEqual(redirectPolicyFound, false);
  });

  it("should have a _response property", async function () {
    let request: OperationRequest;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });

    const extendedClient: ExtendedServiceClient = new ExtendedServiceClient({
      httpClient: {
        sendRequest: (req) => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    const result: any = await extendedClient.sendOperationRequest(
      {
        metadata: {
          alpha: "hello",
          beta: "world",
        },
        unrelated: 42,
      },
      {
        httpMethod: "GET",
        baseUrl: "https://example.com",
        serializer: createSerializer(),
        headerParameters: [
          {
            parameterPath: "metadata",
            mapper: {
              serializedName: "metadata",
              type: {
                name: "Dictionary",
                value: {
                  type: {
                    name: "String",
                  },
                },
              },
              headerCollectionPrefix: "foo-bar-",
            } as DictionaryMapper,
          },
          {
            parameterPath: "unrelated",
            mapper: {
              serializedName: "unrelated",
              type: {
                name: "Number",
              },
            },
          },
        ],
        responses: {
          200: {},
        },
      },
    );

    assert.isNotNull(result._response.headers);
    assert.equal(result._response.status, 200);
    assert.equal(result._response.request.url, "https://example.com");
  });

  it("onResponse should be called for each call", async function () {
    let request: OperationRequest;
    const pipeline = createEmptyPipeline();
    pipeline.addPolicy(serializationPolicy(), { phase: "Serialize" });

    const extendedClient: ExtendedServiceClient = new ExtendedServiceClient({
      httpClient: {
        sendRequest: (req) => {
          request = req;
          return Promise.resolve({ request, status: 200, headers: createHttpHeaders() });
        },
      },
      pipeline,
    });

    let counter = 0;

    function onResponse(): void {
      counter++;
    }

    const operationArguments: OperationArguments = {
      metadata: {
        alpha: "hello",
        beta: "world",
      },
      unrelated: 42,
      options: {
        onResponse,
      },
    };

    const operationSpec: OperationSpec = {
      httpMethod: "GET",
      baseUrl: "https://example.com",
      serializer: createSerializer(),
      headerParameters: [
        {
          parameterPath: "metadata",
          mapper: {
            serializedName: "metadata",
            type: {
              name: "Dictionary",
              value: {
                type: {
                  name: "String",
                },
              },
            },
            headerCollectionPrefix: "foo-bar-",
          } as DictionaryMapper,
        },
        {
          parameterPath: "unrelated",
          mapper: {
            serializedName: "unrelated",
            type: {
              name: "Number",
            },
          },
        },
      ],
      responses: {
        200: {},
      },
    };

    await extendedClient.sendOperationRequest(operationArguments, operationSpec);
    await extendedClient.sendOperationRequest(operationArguments, operationSpec);

    assert.equal(counter, 2);
  });
});
