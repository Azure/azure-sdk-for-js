// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
// Load the .env file (you will need to set these environment variables)
import "dotenv/config";
import { JobRouterAdministrationClient } from "@azure/communication-job-router";

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete distribution policy
async function deleteDistributionPolicy(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: JobRouterAdministrationClient =
    new JobRouterAdministrationClient(connectionString);

  const policyId = "distribution-policy-123";

  const result = await routerAdministrationClient.deleteDistributionPolicy(policyId);

  console.log("distribution policy: " + result);
}

deleteDistributionPolicy().catch(console.error);
