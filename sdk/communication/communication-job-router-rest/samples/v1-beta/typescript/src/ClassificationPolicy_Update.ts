// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import JobRouter, {
  AzureCommunicationRoutingServiceClient,
} from "@azure-rest/communication-job-router";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// Update a classification policy
async function updateClassificationPolicy(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);

  const classificationPolicyId = "classification-policy-123";
  const salesQueueId = "queue-123";
  const result = await routerClient.path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId).patch({
    contentType: "application/merge-patch+json",
    body: {
      name: "Default Classification Policy",
      fallbackQueueId: salesQueueId,
      queueSelectorAttachments: [
        {
          kind: "static",
          queueSelector: { key: "department", labelOperator: "equal", value: "xbox" }
        },
      ],
      workerSelectorAttachments: [{
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

  console.log("classification policy: " + result);
}

void updateClassificationPolicy();
