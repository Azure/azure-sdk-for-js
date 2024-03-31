// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import {
  ClassificationPolicyResponse,
  JobRouterAdministrationClient,
} from "@azure/communication-job-router";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a classification policy
async function updateClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerAdministrationClient: JobRouterAdministrationClient =
    new JobRouterAdministrationClient(connectionString);

  const classificationPolicyRequest: ClassificationPolicyResponse = {
    id: "classification-policy-123",
    name: "test-policy-new-name",
    fallbackQueueId: "queue-123",
    queueSelectors: [
      {
        kind: "conditional",
        queueSelectors: [
          {
            key: "foo",
            labelOperator: "lessThan",
            value: { default: 5 },
          },
        ],
      },
    ],
    prioritizationRule: {
      kind: "static-rule",
      value: { default: 20 },
    },
  };

  const request = classificationPolicyRequest;

  const result = await routerAdministrationClient.updateClassificationPolicy(request.id, request);

  console.log("classification policy: " + result);
}

void updateClassificationPolicy();
