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


// De-register a router worker

async function deregisterRouterWorker(): Promise<void> {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const entityId = "router-worker-123"


  const result = await routerClient.deregisterWorker(entityId);

  console.log("router worker: " + result);

};

deregisterRouterWorker().catch(console.error);
