// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { JobRouterClient } from "@azure/communication-job-router";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a router jobQueue's statistics

async function getJobQueueStatistics(): Promise<void> {
  // Create the Router Client
  const routerClient: JobRouterClient = new JobRouterClient(connectionString);

  const entityId = "router-jobQueue-123";

  const result = await routerClient.getQueueStatistics(entityId);

  console.log("router jobQueue: " + result);
}

getJobQueueStatistics().catch(console.error);
