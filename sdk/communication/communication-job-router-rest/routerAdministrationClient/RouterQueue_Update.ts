// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import { RouterQueueResponse, JobrouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a router jobQueue
async function updateJobQueue(): Promise<void> {
  // Create the Router Client
  const routerClient: JobrouterClient =
    new JobrouterClient(connectionString);

  const request: RouterQueueResponse = {
    id: "queue-123",
    distributionPolicyId: "distribution-policy-123",
    name: "MainNewName",
    labels: {},
  };

  const result = await routerClient.updateQueue(request.id, request);

  console.log("router jobQueue: " + result);
}

updateJobQueue().catch(console.error);
