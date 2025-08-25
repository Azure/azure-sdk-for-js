// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import JobRouterClient, { isUnexpected } from "@azure-rest/communication-job-router";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
  });

  it("ReadmeSampleCreateDistributionPolicy", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const id = "distribution-policy-123";
    const result = await routerClient
      .path("/routing/distributionPolicies/{distributionPolicyId}", id)
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          name: "distribution-policy-123",
          mode: {
            kind: "longestIdle",
            minConcurrentOffers: 1,
            maxConcurrentOffers: 5,
            bypassSelectors: false,
          },
          offerExpiresAfterSeconds: 120,
        },
      });
  });

  it("ReadmeSampleCreateQueue", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const distributionPolicyId = "distribution-policy-123";
    const queueId = "queue-123";
    const result = await routerClient.path("/routing/queues/{queueId}", queueId).patch({
      contentType: "application/merge-patch+json",
      body: {
        distributionPolicyId: distributionPolicyId,
        name: "Main",
      },
    });
  });

  it("ReadmeSampleCreateWorkers", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const id = "router-worker-123";
    const result = await routerClient.path("/routing/workers/{workerId}", id).patch({
      contentType: "application/merge-patch+json",
      body: {
        capacity: 100,
        queues: ["MainQueue", "SecondaryQueue"],
        labels: {},
        channels: [
          {
            channelId: "CustomChatChannel",
            capacityCostPerJob: 10,
          },
          {
            channelId: "CustomVoiceChannel",
            capacityCostPerJob: 100,
          },
        ],
      },
    });
  });

  it("ReadmeSampleCreateJob", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const queueId = "queue-123";
    const jobId = "router-job-123";
    const result = await routerClient.path("/routing/jobs/{jobId}", jobId).patch({
      contentType: "application/merge-patch+json",
      body: {
        channelId: "ChatChannel",
        queueId: queueId,
        channelReference: "abc",
        priority: 2,
        labels: {},
      },
    });
  });

  it("ReadmeSampleCreateClassificationPolicy", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const classificationPolicyId = "classification-policy-123";
    // @ts-preserve-whitespace
    const result = await routerClient
      .path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId)
      .patch({
        contentType: "application/merge-patch+json",
        body: {
          name: "test-policy",
          fallbackQueueId: "queue-123",
          queueSelectorAttachments: [
            {
              kind: "conditional",
              queueSelectors: [
                {
                  key: "foo",
                  labelOperator: "equal",
                  value: { default: 10 },
                },
              ],
              condition: {
                kind: "direct-map-rule",
              },
            },
          ],
          prioritizationRule: {
            kind: "static",
            value: { default: 2 },
          },
        },
      });
  });

  it("ReadmeSampleCreateJobWithClassificationPolicy", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const jobId = "router-job-123";
    const classificationPolicyId = "classification-policy-123";
    const job = await routerClient.path("/routing/jobs/{jobId}", jobId).patch({
      contentType: "application/merge-patch+json",
      body: {
        channelReference: "66e4362e-aad5-4d71-bb51-448672ebf492",
        channelId: "voice",
        classificationPolicyId: classificationPolicyId,
        labels: {
          department: "xbox",
        },
      },
    });
  });

  it("ReadmeSampleAcceptOrDeclineOffer", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const workerId = "router-worker-123";
    const offerId = "offer-id";
    // @ts-preserve-whitespace
    // Accept the job offer
    const acceptResponse = await routerClient
      .path("/routing/workers/{workerId}/offers/{offerId}:accept", workerId, offerId)
      .post();
    // or decline the job offer
    const declineResponse = await routerClient
      .path("/routing/workers/{workerId}/offers/{offerId}:decline", workerId, offerId)
      .post();
  });

  it("ReadmeSampleCompleteJob", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const workerId = "router-worker-123";
    const jobId = "job-id";
    const assignmentId = "assignment-id";
    // @ts-preserve-whitespace
    const completeJob = await routerClient
      .path("/routing/jobs/{jobId}/assignments/{assignmentId}:complete", jobId, assignmentId)
      .post({
        body: {
          note: `Job has been completed by ${workerId} at ${new Date()}`,
        },
      });
  });

  it("ReadmeSampleCloseJob", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const routerClient = JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const workerId = "router-worker-123";
    const jobId = "job-id";
    const assignmentId = "assignment-id";
    // @ts-preserve-whitespace
    const closeJob = await routerClient
      .path("/routing/jobs/{jobId}/assignments/{assignmentId}:close", jobId, assignmentId)
      .post({
        body: {
          note: `Job has been closed by ${workerId} at ${new Date()}`,
        },
      });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
