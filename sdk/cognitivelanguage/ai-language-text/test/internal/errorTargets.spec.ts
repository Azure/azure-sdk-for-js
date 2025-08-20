// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpHeaders, PipelineRequest } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { KnownErrorCode } from "$internal/generated/index.js";
import { AnalyzeBatchActionNames } from "@azure/ai-language-text";
import { TextAnalysisClient } from "@azure/ai-language-text";
import { extractErrorPointerIndex } from "$internal/util.js";
import { expectation73 } from "../public/expectations.js";
import { assertActionsResults } from "../public/utils/resultHelper.js";
import { describe, it, assert } from "vitest";

describe("Error targets", () => {
  it("handles a mix of action results with failed actions", async () => {
    const client = mockClientResponse();
    const docs = ["I will go to the park."];
    const poller = await client.beginAnalyzeBatch(
      [
        {
          kind: AnalyzeBatchActionNames.EntityRecognition,
        },
        {
          kind: AnalyzeBatchActionNames.Healthcare,
        },
      ],
      docs,
      "en",
    );
    assertActionsResults(await poller.pollUntilDone(), expectation73);
  });
});

describe("extractErrorPointerIndex", () => {
  it("Successful parsing the index", async () => {
    const error = {
      code: KnownErrorCode.InvalidRequest,
      message: "error",
      target: "#/tasks/items/2",
    };
    assert.equal(extractErrorPointerIndex(error), 2);
  });

  it("Throws an error if no target field present", async () => {
    const error = {
      code: KnownErrorCode.InvalidRequest,
      message: "error",
    };
    assert.Throw(
      () => extractErrorPointerIndex(error),
      "Unexpected response from service - no target present",
    );
  });

  it("Throw error on invalid format target string", async () => {
    const error = {
      code: KnownErrorCode.InvalidRequest,
      message: "error",
      target: "invalid target", // invalid JSON formar
    };
    assert.Throw(
      () => extractErrorPointerIndex(error),
      'Unexpected response from service - action pointer "invalid target" is not a valid action pointer.',
    );
  });
});

/**
 *
 * @returns a client that mocks the response of the service
 */
function mockClientResponse(): TextAnalysisClient {
  const response1 = (
    request: PipelineRequest,
  ): {
    request: PipelineRequest;
    headers: HttpHeaders;
    status: number;
  } => ({
    request,
    headers: createHttpHeaders({
      "operation-location":
        "https://endpoint/language/analyze-text/jobs/74e9b38a-bc51-4baa-8108-ee5575eb63df?api-version=2022-10-01-preview",
    }),
    status: 202,
  });
  const response2 = (
    request: PipelineRequest,
  ): {
    request: PipelineRequest;
    headers: HttpHeaders;
    status: number;
    bodyAsText: string;
  } => ({
    request,
    headers: createHttpHeaders(),
    status: 200,
    bodyAsText: JSON.stringify({
      jobId: "123456789",
      lastUpdateDateTime: "2022-11-01T22:55:29Z",
      createdDateTime: "2022-11-01T22:55:23Z",
      expirationDateTime: "2022-11-02T22:55:23Z",
      status: "succeeded",
      errors: [
        {
          code: KnownErrorCode.InvalidRequest,
          message: "oh my bad",
          target: "#/tasks/items/0", // first action failed
        },
      ],
      tasks: {
        completed: 1,
        failed: 1,
        inProgress: 0,
        total: 2,
        items: [
          {
            kind: "EntityRecognitionLROResults",
            lastUpdateDateTime: "2022-11-01T22:55:29.619398Z",
            status: "failed",
          },
          {
            kind: "HealthcareLROResults",
            lastUpdateDateTime: "2022-11-01T22:55:29.619398Z",
            status: "partiallySucceeded",
            results: {
              documents: [
                {
                  id: "0",
                  entities: [],
                  relations: [],
                  warnings: [
                    {
                      code: "DocumentTruncated",
                      message:
                        "Document is large and must be split to be processed; relations across splits may not be caught by the model",
                    },
                  ],
                },
              ],
              errors: [],
              modelVersion: "2022-03-01",
            },
          },
        ],
      },
    }),
  });
  const responseList = [response1, response2, response2];
  return new TextAnalysisClient("https://sample.cognitiveservices.azure.com", 0 as any, {
    httpClient: {
      sendRequest(request) {
        const makeResponse = responseList.shift();
        if (makeResponse === undefined) {
          throw new Error("Unexpected request");
        }
        return Promise.resolve(makeResponse(request));
      },
    },
  });
}
