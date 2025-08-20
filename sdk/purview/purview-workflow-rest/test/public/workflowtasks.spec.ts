// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import type { PurviewWorkflowClient } from "$internal/clientDefinitions.js";
import type {
  ApproveApprovalTaskParameters,
  RejectApprovalTaskParameters,
} from "@azure-rest/purview-workflow";
import { isUnexpected } from "@azure-rest/purview-workflow";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Operate the workflow task.", () => {
  let recorder: Recorder;
  let client: PurviewWorkflowClient;
  let workflowtaskId1: string;
  let workflowtaskId2: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
    workflowtaskId1 = "721716fa-13b0-4613-beb5-87ffb5a3ce63";
    workflowtaskId2 = "f0d9bf80-9490-40f9-8bc4-ea70aef701de";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should approve a workflow task.", async () => {
    const options: ApproveApprovalTaskParameters = {
      body: { comment: "Thanks for raising this!" },
    };
    const result1 = await client
      .path("/workflowtasks/{taskId}/approve-approval", workflowtaskId1)
      .post(options);

    if (isUnexpected(result1)) {
      assert.isDefined(result1.body.error);
    }
  });

  it("should reject a workflow task.", async () => {
    const options: RejectApprovalTaskParameters = {
      body: { comment: "Thanks for raising this!" },
    };
    const result2 = await client
      .path("/workflowtasks/{taskId}/reject-approval", workflowtaskId2)
      .post(options);

    if (isUnexpected(result2)) {
      assert.isDefined(result2.body.error);
    }
  });
});
