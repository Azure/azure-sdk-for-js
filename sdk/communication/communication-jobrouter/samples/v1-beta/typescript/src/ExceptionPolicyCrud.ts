// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */
import { RouterAdministrationClient } from "@azure/communication-jobrouter";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { ExceptionPolicy } from "@azure/communication-jobrouter";
import { QueueLengthExceptionTrigger } from "@azure/communication-jobrouter";
import { ExceptionPolicyItem } from "@azure/communication-jobrouter";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// Create an exception policy
const createExceptionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

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

    const result = await routerAdministrationClient.createExceptionPolicy(request.id!, request);

    console.log("exception policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void createExceptionPolicy();

// Get a exception policy

const getExceptionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const policyId = "exception-policy-123"

  try {
    const result = await routerAdministrationClient.getExceptionPolicy(policyId);

    console.log("exception policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void getExceptionPolicy();


// Update a exception policy
const updateExceptionPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

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

    const result = await routerAdministrationClient.updateExceptionPolicy(request.id!, request);

    console.log("exception policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void updateExceptionPolicy();

// List exception policies
const listExceptionPolicies = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: ExceptionPolicyItem[] = [];
  try {
    for await (const page of routerAdministrationClient.listExceptionPolicies({ maxPageSize: maxPageSize }).byPage()) {
      ++pagesCount;
      let pageSize = 0;
      console.log("page: " + pagesCount);
      for (const policy of page) {
        ++pageSize;
        receivedPagedItems.push(policy);
        console.log("Listing exception policy with id: " + policy.exceptionPolicy!.id!);
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
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const policyId = "exception-policy-123"

  try {
    const result = await routerAdministrationClient.deleteExceptionPolicy(policyId);

    console.log("exception policy: " + result);
  } catch (error) {
    console.log(error);
  }
};

void deleteExceptionPolicy();
