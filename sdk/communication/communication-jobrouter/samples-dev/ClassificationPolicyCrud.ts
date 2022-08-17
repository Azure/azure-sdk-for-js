// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import { DistributionPolicy, ExceptionPolicy, JobQueue, QueueLengthExceptionTrigger, RouterAdministrationClient } from "../src";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import { ClassificationPolicy } from "../src";
import { ClassificationPolicyItem } from "../src";
import { assert } from "chai";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// Create an classification policy
const createClassificationPolicy = async (): Promise<void> => {
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
  await routerAdministrationClient.createDistributionPolicy(distributionPolicyRequest.id!, distributionPolicyRequest);

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
  await routerAdministrationClient.createExceptionPolicy(exceptionPolicyRequest.id!, exceptionPolicyRequest);

  const queueRequest: JobQueue = {
    id: "queue-123",
    distributionPolicyId: "distribution-policy-123",
    name: "Main",
    labels: {},
    exceptionPolicyId: "exception-policy-123"
  };
  await routerAdministrationClient.createQueue(queueRequest.id!, queueRequest);

  const classificationPolicyRequest: ClassificationPolicy = {
    id: "classification-policy-123",
    name: "test-policy",
    fallbackQueueId: "queue-123",
    queueSelectors: [
      {
        kind: "conditional",
        labelSelectors: [
          {
            key: "foo",
            labelOperator: "equal",
            value: { "default": 10 }
          }
        ]
      }
    ],
    prioritizationRule: {
      kind: "static-rule",
      value: { "default": 2 }
    }
  };


  const request = classificationPolicyRequest;

  const result = await routerAdministrationClient.createClassificationPolicy(request.id!, request);

  console.log("classification policy: " + result);

};

void createClassificationPolicy();

// Get a classification policy

const getClassificationPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const policyId = "classification-policy-123"


  const result = await routerAdministrationClient.getClassificationPolicy(policyId);

  console.log("classification policy: " + result);

};

void getClassificationPolicy();


// Update a classification policy
const updateClassificationPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const classificationPolicyRequest: ClassificationPolicy = {
    id: "classification-policy-123",
    name: "test-policy-new-name",
    fallbackQueueId: "queue-123",
    queueSelectors: [
      {
        kind: "conditional",
        labelSelectors: [
          {
            key: "foo",
            labelOperator: "lessThan",
            value: { "default": 5 }
          }
        ]
      }
    ],
    prioritizationRule: {
      kind: "static-rule",
      value: { "default": 20 }
    }
  };


  const request = classificationPolicyRequest;

  const result = await routerAdministrationClient.updateClassificationPolicy(request.id!, request);

  console.log("classification policy: " + result);

};

void updateClassificationPolicy();

// List classification policies
const listClassificationPolicies = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: ClassificationPolicyItem[] = [];

  for await (const page of routerAdministrationClient.listClassificationPolicies({ maxPageSize: maxPageSize }).byPage()) {
    ++pagesCount;

    console.log("page: " + pagesCount);
    for (const policy of page) {
      receivedPagedItems.push(policy);
      console.log("Listing classification policy with id: " + policy.classificationPolicy!.id!);
    }
    let pageSize = receivedPagedItems.length;
    assert.isAtMost(pageSize, maxPageSize);
  }

};

void listClassificationPolicies();


// Delete classification policy
const deleteClassificationPolicy = async (): Promise<void> => {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const policyId = "classification-policy-123"


  const result = await routerAdministrationClient.deleteClassificationPolicy(policyId);

  console.log("classification policy: " + result);

};

void deleteClassificationPolicy();
