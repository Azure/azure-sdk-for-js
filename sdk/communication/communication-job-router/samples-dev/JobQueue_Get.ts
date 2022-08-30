// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import { RouterAdministrationClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";



// Get a router jobQueue

async function getJobQueue(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const entityId = "router-jobQueue-123"


  const result = await routerAdministrationClient.getQueue(entityId);

  console.log("router jobQueue: " + result);

};

getJobQueue().catch(console.error);

