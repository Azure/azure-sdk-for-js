// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
// Load the .env file (you will need to set these environment variables)
import "dotenv/config";
import { JobRouterAdministrationClient } from "@azure/communication-job-router";

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a distribution policy

async function getDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: JobRouterAdministrationClient =
    new JobRouterAdministrationClient(connectionString);

  const policyId = "distribution-policy-123";

  const result = await routerAdministrationClient.getDistributionPolicy(policyId);

  console.log("distribution policy: " + result);
}

getDistributionPolicy().catch(console.error);
