// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Create an exception policy
async function createExceptionPolicy() {
  // Create the Router Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger = {
    kind: "queueLength",
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

createExceptionPolicy().catch(console.error);
