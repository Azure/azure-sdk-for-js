// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  CreateOrReplaceWorkflowParameters,
  PurviewWorkflowClient,
  isUnexpected,
  paginate,
} from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import { randomUUID } from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or replace a workflow.
 *
 * @summary Create or replace a workflow.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CreateOrReplaceWorkflow.json
 */
async function workflowCreateOrUpdate(
  client: PurviewWorkflowClient,
  workflow: CreateOrReplaceWorkflowParameters
) {
  const workflowId = randomUUID();
  const result = await client.path("/workflows/{workflowId}", workflowId).put(workflow);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`The created workflow is ${result.body}`);
}

/**
 * This sample demonstrates how to List all workflows.
 *
 * @summary List all workflows.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflows.json
 */
async function workflowsList(client: PurviewWorkflowClient) {
  const initialResponse = await client.path("/workflows").get();
  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(`The total count of workflows is ${result.length}, these workflows are ${result}`);
}

/**
 * This sample demonstrates how to Get a specific workflow.
 *
 * @summary Get a specific workflow.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/GetWorkflow.json
 */
async function workflowGet(client: PurviewWorkflowClient, workflowId: string) {
  const result = await client.path("/workflows/{workflowId}", workflowId).get();
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`The returned workflow is ${result.body}`);
}

/**
 * This sample demonstrates how to Delete a workflow.
 *
 * @summary Delete a workflow.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/DeleteWorkflow.json
 */
async function workflowDelete(client: PurviewWorkflowClient, workflowId: string) {
  const result = await client.path("/workflows/{workflowId}", workflowId).delete();
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`The deleted workflow id is ${workflowId}`);
}

async function main() {
  // ================================================== Create client ==================================================

  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);

  // ================================================== Create a workflow ==================================================

  const workflowPayload: CreateOrReplaceWorkflowParameters = {
    body: {
      name: "Create glossary term workflow",
      description: "",
      actionDag: {
        actions: {
          Condition: {
            type: "If",
            actions: {
              "Create glossary term": { type: "CreateTerm", runAfter: {} },
              "Send email notification": {
                type: "EmailNotification",
                inputs: {
                  parameters: {
                    emailMessage:
                      "Your request for Glossary Term @{triggerBody()['request']['term']['name']} is approved.",
                    emailRecipients: ["@{triggerBody()['request']['requestor']}"],
                    emailSubject: "Glossary Term Create - APPROVED",
                  },
                },
                runAfter: { "Create glossary term": ["Succeeded"] },
              },
            },
            else: {
              actions: {
                "Send reject email notification": {
                  type: "EmailNotification",
                  inputs: {
                    parameters: {
                      emailMessage:
                        "Your request for Glossary Term @{triggerBody()['request']['term']['name']} is rejected.",
                      emailRecipients: ["@{triggerBody()['request']['requestor']}"],
                      emailSubject: "Glossary Term Create - REJECTED",
                    },
                  },
                  runAfter: {},
                },
              },
            },
            expression: {
              and: [
                {
                  equals: [
                    "@outputs('Start and wait for an approval')['body/outcome']",
                    "Approved",
                  ],
                },
              ],
            },
            runAfter: { "Start and wait for an approval": ["Succeeded"] },
          },
          "Start and wait for an approval": {
            type: "Approval",
            inputs: {
              parameters: {
                approvalType: "PendingOnAll",
                assignedTo: ["eece94d9-0619-4669-bb8a-d6ecec5220bc"],
                title: "Approval Request for Create Glossary Term",
              },
            },
            runAfter: {},
          },
        },
      },
      isEnabled: true,
      triggers: [
        {
          type: "when_term_creation_is_requested",
          underGlossaryHierarchy: "/glossaries/20031e20-b4df-4a66-a61d-1b0716f3fa48",
        },
      ],
    },
  };
  workflowCreateOrUpdate(client, workflowPayload); //This payload is an example payload, please replace the payload with real data.

  // ================================================== List workflows ==================================================

  workflowsList(client);

  // ================================================== Get a workflow ==================================================

  const workflowId1 = "d503b2d2-84da-4a85-9e85-6e82e39d59a0"; // This is an example workflow id, user could get workflow id either from the response of creating or updating workflow api or list workflows api.
  workflowGet(client, workflowId1);

  // ================================================== Get a workflow ==================================================
  const workflowId2 = "2689fe8e-b410-11ed-afa1-0242ac120002"; // This is an example workflow id, user could get workflow id either from the response of creating or updating workflow api or list workflows api.
  workflowDelete(client, workflowId2);
}

main().catch(console.error);
