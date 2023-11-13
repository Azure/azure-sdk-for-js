// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Quick start workflow for creating queue, job and worker, routing/matching job with worker
 */
import JobRouter, { RouterWorkerOutput } from "../src";
import * as dotenv from "dotenv";
dotenv.config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";
import { AzureCommunicationRoutingServiceClient } from "../src";
import { AcceptJobOfferResultOutput, RouterJobOutput } from "../src";


async function quickStart(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);


  // Create a Distribution Policy
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

  // Create a Queue
  const queueId = "queue-123";
  await routerClient.path("/routing/queues/{queueId}", queueId).patch({
    contentType: "application/merge-patch+json",
    body: {
      distributionPolicyId: distributionPolicyId,
      name: "Main",
    }
  })

  // Create a Job
  const jobId = "router-job-123";
  await routerClient.path("/routing/jobs/{jobId}", jobId).patch({
    contentType: "application/merge-patch+json",
    body: {
      channelId: "ChatChannel",
      queueId: queueId,
      channelReference: "abc",
      priority: 2,
      labels: {},
    }
  })

  // Register a Worker
  // Register a worker associated with the queue that was just created. We will assign labels to the
  // worker to include all relevant information for example, skills, which will be used to determine
  // whether a job can be offered to a worker or not.
  const workerId = "router-worker-123"
  await routerClient.path("/routing/workers/{workerId}", workerId).patch({
    contentType: "application/merge-patch+json",
    body: {
      capacity: 100,
      queues: [
        queueId
      ],
      labels: {},
      channels: [{
        channelId: "ChatChannel",
        capacityCostPerJob: 10
      }, {
        channelId: "CustomVoiceChannel",
        capacityCostPerJob: 100
      }],
      availableForOffers: true
    }
  })

  await delay(5000);
  // Check offers to a Worker
  // Once the worker has been registered, Router will send an offer to the worker if the worker satisfies requirements
  // for a job. See Offer flow https://docs.microsoft.com/azure/communication-services/concepts/router/concepts#offer
  //
  // We should get a RouterWorkerOfferIssued from our EventGrid subscription.

  // However, we could also wait a few seconds and then query the worker directly against the Job Router API to see if
  // an offer was issued to it.
  const workerResponse = await routerClient.path("/routing/workers/{workerId}", workerId).get();
  if (workerResponse.status !== "200") {
    throw new Error("get works fails")
  }
  const workerResult = (workerResponse.body as RouterWorkerOutput)

  for await (let offer of workerResult.offers!) {
    console.log(`Worker ${workerId} has an active offer for job ${offer.jobId}`);
  }


  // Accepting an offer
  // Once a worker receives an offer, it can take two possible actions: accept or decline. We are going to accept the offer.
  // fetching the offer id
  const jobOffer = workerResult.offers![0];

  const offerId = jobOffer.offerId; // `OfferId` can be retrieved directly from consuming event from Event grid

  // accepting the offer sent to `worker-1`
  const acceptJobOfferResponse = await routerClient.path("/routing/workers/{workerId}/offers/{offerId}:accept", workerId, offerId).post()
  if (acceptJobOfferResponse.status !== "200") {
    throw new Error("accept job offer fails")
  }
  const acceptJobOfferResult = (acceptJobOfferResponse.body as AcceptJobOfferResultOutput)

  console.log(`Offer: ${jobOffer.offerId} sent to worker: ${workerId} has been accepted`);
  console.log(
    `Job has been assigned to worker: ${workerId} with assignment: ${acceptJobOfferResult.assignmentId}`
  );

  // verify job assignment is populated when querying job
  let updatedJobResponse = await routerClient.path("/routing/jobs/{jobId}", jobId).get();
  if (updatedJobResponse.status !== "200") {
    throw new Error("get job fails")
  }
  let updatedJob = (updatedJobResponse.body as RouterJobOutput)


  console.log(`Job assignment has been successful: 
  ${updatedJob.status == "assigned" &&
    updatedJob.assignments!.hasOwnProperty(acceptJobOfferResult.assignmentId)
    }`);

  // Completing a job
  // Once the worker is done with the job, the worker has to mark the job as `completed`.
  const completeJob = await routerClient.path("/routing/jobs/{jobId}:complete", jobId).post({
    body: {
      assignmentId: acceptJobOfferResult.assignmentId,
      note: `Job has been completed by ${workerId} at ${new Date()}`
    }
  })

  console.log(`Job has been successfully completed: ${completeJob}`);

  // Closing a job
  // After a job has been completed, the worker can perform wrap up actions to the job before closing the job and finally
  // releasing its capacity to accept more incoming jobs
  const closeJob = await routerClient.path("/routing/jobs/{jobId}:close", jobId).post({
    body: {
      assignmentId: acceptJobOfferResult.assignmentId,
      note: `Job has been closed by ${workerId} at ${new Date()}`
    }
  })
  console.log(`Job has been successfully closed: ${closeJob}`);

  // Optionally, a job can also be set up to be marked as closed in the future.
  const afterTwoSeconds = new Date();
  afterTwoSeconds.setSeconds(afterTwoSeconds.getSeconds() + 2);
  const closeJobInFuture = await routerClient.path("/routing/jobs/{jobId}:close", jobId).post({
    body: {
      closeAt: afterTwoSeconds,
      assignmentId: acceptJobOfferResult.assignmentId,
      note: `Job has been marked to close in the future by ${workerId} at ${afterTwoSeconds}`
    }
  })
  console.log(`Job has been marked to close: ${closeJobInFuture}`); // You'll received a 202 in that case

  await delay(2000);

  updatedJobResponse = await routerClient.path("/routing/jobs/{jobId}", jobId).get();
  if (updatedJobResponse.status !== "200") {
    throw new Error("get job fails")
  }
  updatedJob = (updatedJobResponse.body as RouterJobOutput)

  console.log(`Updated job status: ${updatedJob.status == "closed"}`);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

quickStart().catch(console.error);
