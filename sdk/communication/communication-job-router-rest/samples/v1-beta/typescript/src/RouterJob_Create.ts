// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
import JobRouter, {
  AzureCommunicationRoutingServiceClient,
  QueueLengthExceptionTrigger
} from "@azure-rest/communication-job-router";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create a router job
async function createRouterJob(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);

  const distributionPolicyId = "distribution-policy-123";
  await routerClient.path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "distribution-policy-123",
      mode: {
        kind: "longest-idle",
        minConcurrentOffers: 1,
        maxConcurrentOffers: 5,
        bypassSelectors: false,
      },
      offerExpiresAfterSeconds: 120,
    }
  })

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
    kind: "queue-length",
    threshold: 100,
  };

  const exceptionPolicyId = "exception-policy-123";
  await routerClient.path("/routing/exceptionPolicies/{exceptionPolicyId}", exceptionPolicyId).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "test-policy",
      exceptionRules: [{
        id: "MaxWaitTimeExceeded",
        actions: [{
          kind: "reclassify",
          classificationPolicyId: "Main",
          labelsToUpsert: {
            escalated: true,
          },
        }],
        trigger: queueLengthExceptionTrigger,
      }]
    }
  });

  const queueId = "queue-123";
  await routerClient.path("/routing/queues/{queueId}", queueId).patch({
    contentType: "application/merge-patch+json",
    body: {
      distributionPolicyId: "distribution-policy-123",
      name: "Main",
      labels: {},
      exceptionPolicyId: "exception-policy-123",
    }
  })


  const jobId = "router-job-123";
  const result = await routerClient.path("/routing/jobs/{jobId}", jobId).patch({
    contentType: "application/merge-patch+json",
    body: {
      channelId: "ChatChannel",
      queueId: queueId,
      channelReference: "abc",
      priority: 2,
      labels: {},
    }
  })

  console.log("router job: " + result);
}

createRouterJob().catch(console.error);
