import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { assert } from "@azure/test-utils";
import { KnownErrorCode } from "../../src/generated";
import { AnalyzeBatchActionNames } from "../../src/models";
import { TextAnalysisClient } from "../../src/textAnalysisClient";

describe("Error targets", function () {
  let client: TextAnalysisClient;

  before(async function () {
    client = new TextAnalysisClient("", 0 as any, {
      httpClient: {
        sendRequest(request) {
          return Promise.resolve({
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
                failed: 0,
                inProgress: 0,
                total: 1,
                items: [
                  {
                    kind: "HealthcareLROResults",
                    lastUpdateDateTime: "2022-11-01T22:55:29.619398Z",
                    status: "succeeded",
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
        },
      },
    });
  });

  it("1 action failed 1 action succeeded", async function () {
    const docs = ["I will go to the park."];
    const poller = await client.beginAnalyzeBatch(
      [
        {
          kind: AnalyzeBatchActionNames.Healthcare,
        },
        {
          kind: AnalyzeBatchActionNames.EntityRecognition,
        },
      ],
      docs,
      "en"
    );
    const result = await poller.pollUntilDone();
    for await (const action of result) {
      if (action.error){
        const target = action.error.target;

      }
    }
    assert.equal()
  });
});
