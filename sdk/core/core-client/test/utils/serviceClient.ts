// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { createEmptyPipeline, createHttpHeaders, HttpClient } from "@azure/core-rest-pipeline";
import {
  createSerializer,
  deserializationPolicy,
  FullOperationResponse,
  OperationRequest,
  OperationResponseMap,
  ServiceClient
} from "../../src";

export async function assertServiceClientResponse(
  bodyAsText: string,
  mapper: OperationResponseMap,
  expectedResult: unknown
): Promise<void> {
  let request: OperationRequest;
  const httpClient: HttpClient = {
    sendRequest: (req) => {
      request = req;
      return Promise.resolve({
        request,
        status: 200,
        headers: createHttpHeaders(),
        bodyAsText: bodyAsText
      });
    }
  };

  const pipeline = createEmptyPipeline();
  pipeline.addPolicy(deserializationPolicy());
  const client1 = new ServiceClient({
    httpClient,
    pipeline
  });

  let rawResponse: FullOperationResponse | undefined;
  const res = await client1.sendOperationRequest<Array<number>>(
    {
      options: {
        onResponse: (response) => {
          rawResponse = response;
        }
      }
    },
    {
      serializer: createSerializer(),
      httpMethod: "GET",
      baseUrl: "https://example.com",
      responses: {
        200: mapper
      }
    }
  );

  assert.strictEqual(rawResponse?.status, 200);
  assert.deepStrictEqual(res, expectedResult);
}
