// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
import { RouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { DistributionPolicy } from "@azure/communication-job-router";
import { PagedDistributionPolicy } from "@azure/communication-job-router";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"] || "";


// Create an distribution policy
const createDistributionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const distributionPolicyRequest: DistributionPolicy = {
    name: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 5,
      bypassSelectors: false
    },
    offerTtlSeconds: 120
  };

  try {
    const request = distributionPolicyRequest;

    const result = await routerClient.createDistributionPolicy(request.id!, request);

    console.log("distribution policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void createDistributionPolicy();

// Get a distribution policy

const getDistributionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const policyId = "distribution-policy-123"

  try {
    const result = await routerClient.getDistributionPolicy(policyId);

    console.log("distribution policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void getDistributionPolicy();


// Update a distribution policy
const updateDistributionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const distributionPolicyRequest: DistributionPolicy = {
    name: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 1,
      bypassSelectors: false
    },
    offerTtlSeconds: 15
  };

  try {
    const request = distributionPolicyRequest;

    const result = await routerClient.updateDistributionPolicy(request.id!, request);

    console.log("distribution policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void updateDistributionPolicy();

// List distribution policies
const listDistributionPolicies = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: PagedDistributionPolicy[] = [];
  try {
    for await (const page of routerClient.listDistributionPolicies({ maxpagesize: maxPageSize }).byPage()) {
      ++pagesCount;
      let pageSize = 0;
      console.log("page: " + pagesCount);
      for (const policy of page) {
        ++pageSize;
        receivedPagedItems.push(policy);
        console.log("Listing distribution policy with id: " + policy.id!);
      }
      assert.isAtMost(pageSize, maxPageSize);
    }
  } catch (error) {
    console.log(error);
  }
};

void listDistributionPolicies();


// Delete distribution policy
const deleteDistributionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const policyId = "distribution-policy-123"

  try {
    const result = await routerClient.deleteDistributionPolicy(policyId);

    console.log("distribution policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void deleteDistributionPolicy();
