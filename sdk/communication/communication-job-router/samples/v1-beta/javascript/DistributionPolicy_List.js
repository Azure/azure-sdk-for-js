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

// List distribution policies
async function listDistributionPolicies() {
  // Create the Router Client
  const routerAdministrationClient = new JobRouterAdministrationClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems = [];

  for await (const page of routerAdministrationClient
    .listDistributionPolicies({ maxPageSize })
    .byPage()) {
    ++pagesCount;
    console.log("page: " + pagesCount);
    for (const policy of page) {
      if (policy.distributionPolicy) {
        receivedPagedItems.push(policy);
        console.log("Listing distribution policy with id: " + policy.distributionPolicy.id);
      }
    }
  }
}

listDistributionPolicies().catch(console.error);
