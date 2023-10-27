// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
import {
  CreateQueueOptions,
  JobrouterClient,
  JobRouterClient,
  UpdateJobOptions,
} from "../src";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a router job
async function updateRouterJob(): Promise<void> {
  // Create the JobRouter Client
  const jobRouterClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);
  const jobrouterClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

  const queueId = "queue-2";
  const createOptions: CreateQueueOptions = {
    distributionPolicyId: "distribution-policy-123",
    name: "Main",
    labels: {},
  };
  await jobrouterClient.createQueue(queueId, createOptions);

  const jobId = "router-job-123"
  const updateOptions: UpdateJobOptions = {
    channelId: "general",
    queueId: queueId,
    labels: {},
  };

  const result = await jobRouterClient.updateJob(jobId, updateOptions);

  console.log("router job: " + result);
}

updateRouterJob().catch(console.error);
