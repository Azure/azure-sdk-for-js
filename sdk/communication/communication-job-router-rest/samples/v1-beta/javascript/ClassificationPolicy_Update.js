// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a classification policy
async function updateClassificationPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const classificationPolicyId = "classification-policy-123";
  const salesQueueId = "queue-123";
  const result = await routerClient
    .path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        name: "Default Classification Policy",
        fallbackQueueId: salesQueueId,
        queueSelectorAttachments: [
          {
            kind: "static",
            queueSelector: { key: "department", labelOperator: "equal", value: "xbox" },
          },
        ],
        workerSelectorAttachments: [
          {
            kind: "static",
            workerSelector: { key: "english", labelOperator: "greaterThan", value: 5 },
          },
        ],
        prioritizationRule: {
          kind: "expression-rule",
          language: "powerFx",
          expression: 'If(job.department = "xbox", 2, 1)',
        },
      },
    });

  console.log("classification policy: " + result);
}

void updateClassificationPolicy();
