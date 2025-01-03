// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
const { JobRouterAdministrationClient } = require("@azure/communication-job-router");

// Load the .env file (you will need to set these environment variables)
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Get a classification policy

async function getClassificationPolicy() {
  // Create the Router Client
  const routerAdministrationClient = new JobRouterAdministrationClient(connectionString);

  const policyId = "classification-policy-123";

  const result = await routerAdministrationClient.getClassificationPolicy(policyId);

  console.log("classification policy: " + result);
}

void getClassificationPolicy();
