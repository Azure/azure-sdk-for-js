// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import type {
  AzureCommunicationRoutingServiceClient,
  QueueLengthExceptionTrigger,
} from "@azure-rest/communication-job-router";
import JobRouter from "@azure-rest/communication-job-router";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// Create an exception policy
async function createExceptionPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient = JobRouter(
    endpoint,
    new DefaultAzureCredential(),
  );

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
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
