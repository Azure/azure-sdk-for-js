// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { DistributionPolicy } from "../src";
import { DistributionPolicyItem } from "../src";
import { assert } from "chai";
import { RouterAdministrationClient } from "../src";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// Create an distribution policy
const createDistributionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

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


  const request = distributionPolicyRequest;

  const result = await routerAdministrationClient.createDistributionPolicy(request.id!, request);

  console.log("distribution policy: " + result);

};

void createDistributionPolicy();

// Get a distribution policy

const getDistributionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const policyId = "distribution-policy-123"


  const result = await routerAdministrationClient.getDistributionPolicy(policyId);

  console.log("distribution policy: " + result);

};

void getDistributionPolicy();


// Update a distribution policy
const updateDistributionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

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


  const request = distributionPolicyRequest;

  const result = await routerAdministrationClient.updateDistributionPolicy(request.id!, request);

  console.log("distribution policy: " + result);

};

void updateDistributionPolicy();

// List distribution policies
const listDistributionPolicies = async (): Promise<void> => {
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

void listDistributionPolicies();


// Delete distribution policy
const deleteDistributionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const policyId = "distribution-policy-123"


  const result = await routerAdministrationClient.deleteDistributionPolicy(policyId);

  console.log("distribution policy: " + result);

};

void deleteDistributionPolicy();
