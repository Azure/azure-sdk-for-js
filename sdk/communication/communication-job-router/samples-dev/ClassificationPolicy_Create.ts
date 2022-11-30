// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import {
  ClassificationPolicy,
  DistributionPolicy,
  ExceptionPolicy,
  JobQueue,
  QueueLengthExceptionTrigger,
  RouterAdministrationClient } from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";


// Create an classification policy
async function createClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: RouterAdministrationClient = new RouterAdministrationClient(connectionString);

  const distributionPolicyId = "distribution-policy-123";
  const distributionPolicyRequest: DistributionPolicy = {
    name: "distribution-policy-123",
    mode: {
      kind: "longest-idle",
      minConcurrentOffers: 1,
      maxConcurrentOffers: 1,
      bypassSelectors: false
    },
    offerTtlInSeconds: 15
  };
  await routerAdministrationClient.createDistributionPolicy(distributionPolicyId, distributionPolicyRequest);

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
    kind: "queue-length",
    maxJobCount: 100
  }

  const exceptionPolicyId = "exception-policy-123";
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
  await routerAdministrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);

  const queueId = "queue-123";
  const queueRequest: JobQueue = {
    id: "queue-123",
    distributionPolicyId: "distribution-policy-123",
    name: "Main",
    labels: {},
    exceptionPolicyId: "exception-policy-123"
  };
  await routerAdministrationClient.createQueue(queueId, queueRequest);

  const classificationPolicyId = "classification-policy-123";
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

  const result = await routerAdministrationClient.createClassificationPolicy(classificationPolicyId, request);

  console.log("classification policy: " + result);

};

void createClassificationPolicy();
