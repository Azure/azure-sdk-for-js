// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
import {
  ExceptionPolicyResponse,
  QueueLengthExceptionTrigger,
  JobRouterAdministrationClient,
} from "@azure/communication-job-router";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a exception policy
async function updateExceptionPolicy(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: JobRouterAdministrationClient =
    new JobRouterAdministrationClient(connectionString);

  // define exception trigger for queue over flow
  const queueLengthExceptionTrigger: QueueLengthExceptionTrigger = {
    kind: "queue-length",
    threshold: 100,
  };

  const exceptionPolicyRequest: ExceptionPolicyResponse = {
    id: "exception-policy-123",
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
    },
  };

  const request = exceptionPolicyRequest;

  const result = await routerAdministrationClient.updateExceptionPolicy(request.id, request);

  console.log("exception policy: " + result);
}

updateExceptionPolicy().catch(console.error);
