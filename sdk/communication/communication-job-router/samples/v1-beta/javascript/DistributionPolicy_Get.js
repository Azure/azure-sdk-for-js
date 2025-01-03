// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
// Load the .env file (you will need to set these environment variables)
const dotenv = require("dotenv");
const { JobRouterAdministrationClient } = require("@azure/communication-job-router");
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a distribution policy

async function getDistributionPolicy() {
  // Create the Router Client
  const routerAdministrationClient = new JobRouterAdministrationClient(connectionString);

  const policyId = "distribution-policy-123";

  const result = await routerAdministrationClient.getDistributionPolicy(policyId);

  console.log("distribution policy: " + result);
}

getDistributionPolicy().catch(console.error);
