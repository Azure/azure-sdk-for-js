// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
const { JobRouterAdministrationClient } = require("@azure/communication-job-router");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Delete exception policy
async function deleteExceptionPolicy() {
  // Create the Router Client
  const routerAdministrationClient = new JobRouterAdministrationClient(connectionString);

  const policyId = "exception-policy-123";

  const result = await routerAdministrationClient.deleteExceptionPolicy(policyId);

  console.log("exception policy: " + result);
}

deleteExceptionPolicy().catch(console.error);
