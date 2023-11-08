// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import { PurviewWorkflowClient } from "@azure-rest/purview-workflow";
import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient";

import { Context } from "mocha";
import { PurviewWorkflowClient } from "../../src/clientDefinitions";
import { ApprovalApproveParameters, ApprovalRejectParameters } from "../../src/parameters";
import { isUnexpected } from "../../src/isUnexpected";

describe("Operate the workflow task.", () => {
  let recorder: Recorder;
  let client: PurviewWorkflowClient;
  let workflowtaskId1: string;
  let workflowtaskId2: string;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
    workflowtaskId1 = "05a55acb-7cb8-4b8e-83ad-4191c9b6f411";
    workflowtaskId2 = "2bb8243e-f65e-4094-8dc7-8f01aae3e1b4";
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should approve a workflow task.", async function () {
    const options: ApprovalApproveParameters = {
      body: { comment: "Thanks for raising this!" },
    };
    const result1 = await client
      .path("/workflowtasks/{taskId}/approve-approval", workflowtaskId1)
      .post(options);

    if (isUnexpected(result1)) {
      throw result1.body.error;
    }
  });

  it("should reject a workflow task.", async function () {
    const options: ApprovalRejectParameters = {
      body: { comment: "Thanks for raising this!" },
    };
    const result2 = await client
      .path("/workflowtasks/{taskId}/reject-approval", workflowtaskId2)
      .post(options);

    if (isUnexpected(result2)) {
      throw result2.body.error;
    }
  });
});
