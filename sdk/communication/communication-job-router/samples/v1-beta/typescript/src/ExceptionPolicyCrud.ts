// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import { RouterClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { ExceptionPolicy } from "@azure/communication-job-router";
import { QueueLengthExceptionTrigger } from "@azure/communication-job-router";
import { PagedExceptionPolicy } from "@azure/communication-job-router";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_LIVETEST_DYNAMIC_CONNECTION_STRING"] || "";


// Create an exception policy
const createExceptionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
    kind: "queue-length",
    threshold: 10
  }

  const exceptionPolicyRequest: ExceptionPolicy = {
    id: "exception-policy-123",
    name: "test-policy",
    exceptionRules: {
      MaxWaitTimeExceeded: {
        actions: {
          MoveJobToEscalatedQueue: {
            kind: "reclassify",
            classificationPolicyId: "Main",
            labelsToUpsert: {
              escalated: true
            }
          }
        },
        trigger: queueLengthExceptionTrigger
      }
    }
  };

  try {
    const request = exceptionPolicyRequest;

    const result = await routerClient.createExceptionPolicy(request.id!, request);

    console.log("exception policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void createExceptionPolicy();

// Get a exception policy

const getExceptionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const policyId = "exception-policy-123"

  try {
    const result = await routerClient.getExceptionPolicy(policyId);

    console.log("exception policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void getExceptionPolicy();


// Update a exception policy
const updateExceptionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
    kind: "queue-length",
    threshold: 100
  }

  const exceptionPolicyRequest: ExceptionPolicy = {
    id: "exception-policy-123",
    name: "test-policy",
    exceptionRules: {
      MaxWaitTimeExceeded: {
        actions: {
          MoveJobToEscalatedQueue: {
            kind: "reclassify",
            classificationPolicyId: "Main",
            labelsToUpsert: {
              escalated: true
            }
          }
        },
        trigger: queueLengthExceptionTrigger
      }
    }
  };

  try {
    const request = exceptionPolicyRequest;

    const result = await routerClient.updateExceptionPolicy(request.id!, request);

    console.log("exception policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void updateExceptionPolicy();

// List exception policies
const listExceptionPolicies = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: PagedExceptionPolicy[] = [];
  try {
    for await (const page of routerClient.listExceptionPolicies({ maxpagesize: maxPageSize }).byPage()) {
      ++pagesCount;
      let pageSize = 0;
      console.log("page: " + pagesCount);
      for (const policy of page) {
        ++pageSize;
        receivedPagedItems.push(policy);
        console.log("Listing exception policy with id: " + policy.id!);
      }
      assert.isAtMost(pageSize, maxPageSize);
    }
  } catch (error) {
    console.log(error);
  }
};

void listExceptionPolicies();


// Delete exception policy
const deleteExceptionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerClient: RouterClient = new RouterClient(connectionString);

  const policyId = "exception-policy-123"

  try {
    const result = await routerClient.deleteExceptionPolicy(policyId);

    console.log("exception policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void deleteExceptionPolicy();
