// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
import { RouterAdministrationClient, RouterClient, JobQueueResponse, RouterJobResponse } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// Update a router job
async function updateRouterJob(): Promise<void> {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const queueRequest: JobQueueResponse = {
    id: "queue-2",
    distributionPolicyId: "distribution-policy-123",
    name: "Main",
    labels: {}
  };
  await routerAdministrationClient.createQueue(queueRequest.id, queueRequest);


  const request: RouterJobResponse = {
    id: "router-job-123",
    channelId: "general",
    queueId: queueRequest.id,
    labels: {}
  };

  const result = await routerClient.updateJob(request.id, request);

  console.log("router job: " + result);

};

updateRouterJob().catch(console.error);
