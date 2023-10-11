// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import { JobrouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a router jobQueue

async function getJobQueue(): Promise<void> {
  // Create the Router Client
  const routerClient: JobrouterClient =
    new JobrouterClient(connectionString);

  const entityId = "router-jobQueue-123";

  const result = await routerClient.getQueue(entityId);

  console.log("router jobQueue: " + result);
}

getJobQueue().catch(console.error);
