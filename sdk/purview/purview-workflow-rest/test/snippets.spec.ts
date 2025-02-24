// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import PurviewWorkflow, {
  ApproveApprovalTaskParameters,
  isUnexpected,
  SubmitUserRequestsParameters,
} from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = PurviewWorkflow(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
  });

  it("ReadmeSampleUserRequestsSubmit", async () => {
    const client = PurviewWorkflow(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const options: SubmitUserRequestsParameters = {
      body: {
        comment: "Thanks!",
        operations: [
          {
            type: "CreateTerm",
            payload: {
              glossaryTerm: {
                name: "term",
                anchor: { glossaryGuid: "20031e20-b4df-4a66-a61d-1b0716f3fa48" },
                nickName: "term",
                status: "Approved",
              },
            },
          },
        ],
      },
    };
    const result = await client.path("/userrequests").post(options);
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result.body.error;
    }
    // @ts-preserve-whitespace
    console.log(`Requestor: ${result.body.requestor}`);
  });

  it("ReadmeSampleWorkflowTaskApprove", async () => {
    const client = PurviewWorkflow(
      "https://<my-account-name>.purview.azure.com",
      new DefaultAzureCredential(),
    );
    // @ts-preserve-whitespace
    const taskId = "98d98e2c-23fa-4157-a3f8-ff8ce5cc095c";
    const options: ApproveApprovalTaskParameters = {
      body: { comment: "Thanks for raising this!" },
    };
    const result = await client
      .path("/workflowtasks/{taskId}/approve-approval", taskId)
      .post(options);
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result.body.error;
    }
    // @ts-preserve-whitespace
    console.log(`Task approved with Task ID: ${taskId}`);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
