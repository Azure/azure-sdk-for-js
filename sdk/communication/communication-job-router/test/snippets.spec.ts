// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { JobRouterAdministrationClient, JobRouterClient } from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    // @ts-preserve-whitespace
    // Create router client
    const jobRouterClient = new JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    // Create router administration client
    const jobRouterAdministrationClient = new JobRouterAdministrationClient(connectionString);
  });

  it("ReadmeSampleCreateDistributionPolicy", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const jobRouterAdministrationClient = new JobRouterAdministrationClient(connectionString);
    // @ts-preserve-whitespace
    const distributionPolicy = await jobRouterAdministrationClient.createDistributionPolicy(
      "default-distribution-policy-id",
      {
        name: "Default Distribution Policy",
        offerExpiresAfterSeconds: 30,
        mode: {
          kind: "longest-idle",
          minConcurrentOffers: 1,
          maxConcurrentOffers: 3,
        },
      },
    );
  });

  it("ReadmeSampleCreateClassificationPolicy", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const jobRouterAdministrationClient = new JobRouterAdministrationClient(connectionString);
    // @ts-preserve-whitespace
    const classificationPolicy = await jobRouterAdministrationClient.createClassificationPolicy(
      "default-classification-policy-id",
      {
        name: "Default Classification Policy",
        fallbackQueueId: "<salesQueueResponse.id>",
        queueSelectors: [
          {
            kind: "static",
            queueSelector: { key: "department", labelOperator: "equal", value: "xbox" },
          },
        ],
        workerSelectors: [
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
    );
  });

  it("ReadmeSampleCreateQueue", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    const jobRouterAdministrationClient = new JobRouterAdministrationClient(connectionString);
    // @ts-preserve-whitespace
    const salesQueueResponse = await jobRouterAdministrationClient.createQueue("sales-queue-id", {
      name: "Sales",
      distributionPolicyId: "<distributionPolicy.id>",
      labels: {
        department: "xbox",
      },
    });
  });

  it("ReadmeSampleCreateWorkers", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    // @ts-preserve-whitespace
    const jobRouterClient = new JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    // Create worker "Alice".
    const salesQueueResponseIdAlice = "sales-queue-id";
    const workerAliceId = "773accfb-476e-42f9-a202-b211b41a4ea4";
    const workerAliceResponse = await jobRouterClient.createWorker(workerAliceId, {
      totalCapacity: 120,
      labels: {
        Xbox: 5,
        german: 4,
        name: "Alice",
      },
      queueAssignments: { [`${salesQueueResponseIdAlice}`]: {} },
      availableForOffers: true,
    });
    // @ts-preserve-whitespace
    // Create worker "Bob".
    const salesQueueResponseIdBob = "sales-queue-id";
    const workerBobId = "21837c88-6967-4078-86b9-1207821a8392";
    const workerBobResponse = await jobRouterClient.createWorker(workerBobId, {
      totalCapacity: 100,
      labels: {
        xbox: 5,
        english: 3,
        name: "Bob",
      },
      queueAssignments: { [`${salesQueueResponseIdBob}`]: {} },
      availableForOffers: true,
    });
  });

  it("ReadmeSampleCreateJob", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    // @ts-preserve-whitespace
    const jobRouterClient = new JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const job = await jobRouterClient.createJob("job-id", {
      // e.g. callId or chat threadId
      channelReference: "66e4362e-aad5-4d71-bb51-448672ebf492",
      channelId: "voice",
      priority: 2,
      queueId: "<salesQueueResponse.id>",
    });
  });

  it("ReadmeSampleCreateJobWithClassificationPolicy", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    // @ts-preserve-whitespace
    const jobRouterClient = new JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const classificationJob = await jobRouterClient.createJob("classification-job-id", {
      // e.g. callId or chat threadId
      channelReference: "66e4362e-aad5-4d71-bb51-448672ebf492",
      channelId: "voice",
      classificationPolicyId: "<classificationPolicy.id>",
      labels: {
        department: "xbox",
      },
    });
  });

  it("ReadmeSampleAcceptOrDeclineJobOffer", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    // @ts-preserve-whitespace
    const jobRouterClient = new JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const workerId = "773accfb-476e-42f9-a202-b211b41a4ea4";
    const offerId = "offer-id";
    // @ts-preserve-whitespace
    const acceptResponse = await jobRouterClient.acceptJobOffer(workerId, offerId);
    // or
    const declineResponse = await jobRouterClient.declineJobOffer(workerId, offerId);
  });

  it("ReadmeSampleCompleteJob", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    // @ts-preserve-whitespace
    const jobRouterClient = new JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const jobId = "job-id";
    const assignmentId = "assignment-id";
    // @ts-preserve-whitespace
    // Complete the job
    await jobRouterClient.completeJob(jobId, assignmentId);
  });

  it("ReadmeSampleCloseJob", async () => {
    const connectionString =
      "endpoint=https://<YOUR_ACS>.communication.azure.com/;accesskey=<YOUR_ACCESS_KEY>";
    // @ts-preserve-whitespace
    const jobRouterClient = new JobRouterClient(connectionString);
    // @ts-preserve-whitespace
    const jobId = "job-id";
    const assignmentId = "assignment-id";
    // @ts-preserve-whitespace
    // Close the job
    await jobRouterClient.closeJob(jobId, assignmentId, { dispositionCode: "Resolved" });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
