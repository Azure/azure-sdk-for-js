// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// import { PurviewWorkflowClient } from "@azure-rest/purview-workflow";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient";

import { Context } from "mocha";
import { PurviewWorkflowClient } from "../../src/clientDefinitions";
import { SubmitUserRequestsParameters } from "../../src/parameters";
import { isUnexpected } from "../../src/isUnexpected";
import { assert } from "chai";

describe("Submit a user request", () => {
  let recorder: Recorder;
  let client: PurviewWorkflowClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should submit a user request.", async function () {
    const options: SubmitUserRequestsParameters = {
      body: {
        comment: "Thanks!",
        operations: [
          {
            type: "CreateTerm",
            payload: {
              glossaryTerm: {
                name: "term",
                anchor: { glossaryGuid: "5dae5e5b-5aa6-48f1-9e46-26fe7328de71" },
                nickName: "term",
                status: "Approved",
              },
            },
          },
        ],
      },
    };
    const result = await client.path("/userrequests").post(options);
    if (isUnexpected(result)) {
      throw result.body.error;
    }
    assert.equal(result.body.status, "InProgress");
  });
});
