// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { createClient } from "./utils/recordedClient.js";
import type { PurviewWorkflowClient } from "$internal/clientDefinitions.js";
import type { CreateOrReplaceWorkflowParameters } from "$internal/parameters.js";
import { isUnexpected } from "@azure-rest/purview-workflow";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("Get a workflow", () => {
  let recorder: Recorder;
  let client: PurviewWorkflowClient;
  let workflowId: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    client = await createClient(recorder);
    workflowId = "e3467b48-a9d8-11ed-afa1-0242ac120002";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create a workflow", async () => {
    const options: CreateOrReplaceWorkflowParameters = {
      body: {
        name: "Create glossary term workflow",
        description: "",
        actionDag: {
          actions: {
            Condition: {
              type: "If",
              actions: {
                "Create glossary term": { type: "CreateTerm", runAfter: {} },
                "Send email notification": {
                  type: "EmailNotification",
                  inputs: {
                    parameters: {
                      emailMessage:
                        "Your request for Glossary Term @{triggerBody()['request']['term']['name']} is approved.",
                      emailRecipients: ["@{triggerBody()['request']['requestor']}"],
                      emailSubject: "Glossary Term Create - APPROVED",
                    },
                  },
                  runAfter: { "Create glossary term": ["Succeeded"] },
                },
              },
              else: {
                actions: {
                  "Send reject email notification": {
                    type: "EmailNotification",
                    inputs: {
                      parameters: {
                        emailMessage:
                          "Your request for Glossary Term @{triggerBody()['request']['term']['name']} is rejected.",
                        emailRecipients: ["@{triggerBody()['request']['requestor']}"],
                        emailSubject: "Glossary Term Create - REJECTED",
                      },
                    },
                    runAfter: {},
                  },
                },
              },
              expression: {
                and: [
                  {
                    equals: [
                      "@outputs('Start and wait for an approval')['body/outcome']",
                      "Approved",
                    ],
                  },
                ],
              },
              runAfter: { "Start and wait for an approval": ["Succeeded"] },
            },
            "Start and wait for an approval": {
              type: "Approval",
              inputs: {
                parameters: {
                  approvalType: "PendingOnAll",
                  assignedTo: ["83ffc40f-f670-49b0-a17e-30c7f74f209a"],
                  title: "Approval Request for Create Glossary Term",
                },
              },
              runAfter: {},
            },
          },
        },
        isEnabled: true,
        triggers: [
          {
            type: "when_term_creation_is_requested",
            underGlossaryHierarchy: "/glossaries/5dae5e5b-5aa6-48f1-9e46-26fe7328de71",
          },
        ],
      },
    };
    const createResult = await client.path("/workflows/{workflowId}", workflowId).put(options);

    if (isUnexpected(createResult)) {
      throw createResult.body.error;
    }

    assert.equal(createResult.body.id, workflowId);
  });

  it("should get a workflow", async () => {
    const getResult = await client.path("/workflows/{workflowId}", workflowId).get();
    if (isUnexpected(getResult)) {
      throw getResult.body.error;
    }

    assert.equal(getResult.body.id, workflowId);
  });
});
