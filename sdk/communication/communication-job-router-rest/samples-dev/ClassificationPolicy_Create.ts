// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import {
  QueueLengthExceptionTrigger
} from "../src";

import { AzureCommunicationRoutingServiceClient } from "../src"
import createClient from "../src/azureCommunicationRoutingServiceClient"

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Create an classification policy
async function createClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

  const distributionPolicyId = "distribution-policy-123";
  await routerClient.path("/routing/distributionPolicies/{id}", distributionPolicyId).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "distribution-policy-123",
      mode: {
        kind: "longest-idle",
        minConcurrentOffers: 1,
        maxConcurrentOffers: 5,
        bypassSelectors: false,
      },
      offerExpiresAfterSeconds: 120,
    }
  })

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
    kind: "queue-length",
    threshold: 100,
  };

  const exceptionPolicyId = "exception-policy-123";
  await routerClient.path("/routing/exceptionPolicies/{id}", exceptionPolicyId).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "test-policy",
      exceptionRules: {
        MaxWaitTimeExceeded: {
          actions: {
            MoveJobToEscalatedQueue: {
              kind: "reclassify",
              classificationPolicyId: "Main",
              labelsToUpsert: {
                escalated: true,
              },
            },
          },
          trigger: queueLengthExceptionTrigger,
        },
      }
    }
  })

  const classificationPolicyId = "classification-policy-123";
  const salesQueueId = "queue-123";
  await routerClient.path("/routing/classificationPolicies/{id}", classificationPolicyId).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "Default Classification Policy",
      fallbackQueueId: salesQueueId,
      queueSelectors: [
        {
          kind: "static",
          queueSelector: { key: "department", labelOperator: "equal", value: "xbox" }
        },
      ],
      workerSelectors: [{
        kind: "static",
        workerSelector: { key: "english", labelOperator: "greaterThan", value: 5 }
      }],
      prioritizationRule: {
        kind: "expression-rule",
        language: "powerFx",
        expression: "If(job.department = \"xbox\", 2, 1)"
      }
    }
  });

  const queueId = "queue-123";
  await routerClient.path("/routing/queues/{id}", queueId).patch({
    contentType: "application/merge-patch+json",
    body: {
      distributionPolicyId: "distribution-policy-123",
      name: "Main",
      labels: {},
      exceptionPolicyId: "exception-policy-123",
    }
  })


  const result = await routerClient.path("/routing/classificationPolicies/{id}", classificationPolicyId).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "test-policy",
      fallbackQueueId: "queue-123",
      queueSelectors: [
        {
          kind: "conditional",
          queueSelectors : [{
            key: "foo",
            labelOperator: "equal",
            value: { default: 10 },
          }],
          condition: {
            kind: "direct-map-rule"
          }
        },
      ],
      prioritizationRule: {
        kind: "static-rule",
        value: { default: 2 },
      },
    }
  });

  console.log("classification policy: " + result);
}

void createClassificationPolicy();
