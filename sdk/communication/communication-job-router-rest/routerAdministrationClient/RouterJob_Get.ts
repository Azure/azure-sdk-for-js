// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
import { AzureCommunicationRoutingServiceClient } from "../src"
import createClient from "../src/azureCommunicationRoutingServiceClient"

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a router job

async function getRouterJob(): Promise<void> {
  // Create the Router Client
  const routerClient: JobRouterClient = new JobRouterClient(connectionString);

  const entityId = "router-job-123";

  const result = await routerClient.getJob(entityId);

  console.log("router job: " + result);
}

getRouterJob().catch(console.error);
