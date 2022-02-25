// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FullOperationResponse,
  OperationRequest,
  OperationResponseMap,
  Serializer,
  ServiceClient,
  createSerializer,
  deserializationPolicy,
} from "../../src";
import {
  HttpClient,
  HttpHeaders,
  HttpMethods,
  createEmptyPipeline,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { assert } from "chai";

/**
 * Representation of a Service Client test case where the response status is 200.
 */
export interface ServiceClientTestSpec {
  /** The HTTP request method */
  requestMethod?: HttpMethods;
  /** The request headers */
  requestHeaders?: HttpHeaders;
  /** The request serializer */
  requestSerializer?: Serializer;
  /** The response headers */
  responseHeaders?: HttpHeaders;
  /** The response body */
  responseBodyAsText: string;
  /** The response mapper */
  responseMapper: OperationResponseMap;
}

export async function assertServiceClientResponse(
  testSpec: ServiceClientTestSpec,
  expectedResponse: unknown
): Promise<void> {
  let request: OperationRequest;
  const httpClient: HttpClient = {
    sendRequest: (req) => {
      request = req;
      return Promise.resolve({
        request,
        status: 200,
        headers: testSpec.responseHeaders ?? createHttpHeaders(),
        bodyAsText: testSpec.responseBodyAsText,
      });
    },
  };

  const pipeline = createEmptyPipeline();
  pipeline.addPolicy(deserializationPolicy());
  const client1 = new ServiceClient({
    httpClient,
    pipeline,
  });

  let rawResponse: FullOperationResponse | undefined;
  const res = await client1.sendOperationRequest<Array<number>>(
    {
      options: {
        onResponse: (response) => {
          rawResponse = response;
        },
      },
    },
    {
      serializer: testSpec.requestSerializer ?? createSerializer(),
      httpMethod: testSpec.requestMethod ?? "GET",
      baseUrl: "https://example.com",
      responses: {
        200: testSpec.responseMapper,
      },
    }
  );

  assert.strictEqual(rawResponse?.status, 200);
  assert.deepStrictEqual(res, expectedResponse);
}
