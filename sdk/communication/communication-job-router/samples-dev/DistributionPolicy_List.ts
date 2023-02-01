// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { DistributionPolicyItem, RouterAdministrationClient } from "@azure/communication-job-router";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// List distribution policies
async function listDistributionPolicies(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: DistributionPolicyItem[] = [];

  for await (const page of routerAdministrationClient.listDistributionPolicies({ maxPageSize: maxPageSize }).byPage()) {
    ++pagesCount;
    console.log("page: " + pagesCount);
    for (const policy of page) {
      if (policy.distributionPolicy) {
        receivedPagedItems.push(policy);
        console.log("Listing distribution policy with id: " + policy.distributionPolicy.id);
      }
    }
    let pageSize = receivedPagedItems.length;
    assert.isAtMost(pageSize, maxPageSize);
  }

};

listDistributionPolicies().catch(console.error);
