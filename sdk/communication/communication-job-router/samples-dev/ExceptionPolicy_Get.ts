// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import { JobRouterAdministrationClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a exception policy

async function getExceptionPolicy(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: JobRouterAdministrationClient =
    new JobRouterAdministrationClient(connectionString);

  const policyId = "exception-policy-123";

  const result = await routerAdministrationClient.getExceptionPolicy(policyId);

  console.log("exception policy: " + result);
}

getExceptionPolicy().catch(console.error);
