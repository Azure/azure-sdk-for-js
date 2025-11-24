// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */

const JobRouter = require("@azure-rest/communication-job-router").default;
require("dotenv").config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a exception policy
async function updateExceptionPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger = {
    kind: "queue-length",
    threshold: 10,
  };

  const id = "exception-policy-123";

  const result = await routerClient
    .path("/routing/exceptionPolicies/{exceptionPolicyId}", id)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        name: "test-policy",
        exceptionRules: [
          {
            id: "MaxWaitTimeExceeded",
            actions: [
              {
                kind: "reclassify",
                classificationPolicyId: "Main",
                labelsToUpsert: {
                  escalated: true,
                },
              },
            ],
            trigger: queueLengthExceptionTrigger,
          },
        ],
      },
    });
  console.log("exception policy: " + result);
}

updateExceptionPolicy().catch(console.error);
