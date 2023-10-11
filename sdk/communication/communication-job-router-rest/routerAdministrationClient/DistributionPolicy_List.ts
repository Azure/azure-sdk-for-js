// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Distribution policy crud
 */
// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import {
  DistributionPolicyItem,
  AzureCommunicationRoutingServiceClient,
} from "../src";
import createClient from "../src/azureCommunicationRoutingServiceClient"
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// List distribution policies
async function listDistributionPolicies(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: DistributionPolicyItem[] = [];

  for await (const page of routerClient
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
    let pageSize = receivedPagedItems.length;
    assert.isAtMost(pageSize, maxPageSize);
  }
}

listDistributionPolicies().catch(console.error);
