// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
import { RouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// Register a router worker

async function registerRouterWorker(): Promise<void> {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const entityId = "router-worker-123"


  const result = await routerClient.registerWorker(entityId);

  console.log("router worker: " + result);

};

registerRouterWorker().catch(console.error);
