// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import {
  ExceptionPolicyItem,
  AzureCommunicationRoutingServiceClient,
} from "../src";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// List exception policies
async function listExceptionPolicies(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: ExceptionPolicyItem[] = [];

  for await (const page of routerClient
    .listExceptionPolicies({ maxPageSize })
    .byPage()) {
    ++pagesCount;
    console.log("page: " + pagesCount);
    for (const policy of page) {
      if (policy.exceptionPolicy) {
        receivedPagedItems.push(policy);
        console.log("Listing exception policy with id: " + policy.exceptionPolicy.id);
      }
    }
    let pageSize = receivedPagedItems.length;
    assert.isAtMost(pageSize, maxPageSize);
  }
}

listExceptionPolicies().catch(console.error);
