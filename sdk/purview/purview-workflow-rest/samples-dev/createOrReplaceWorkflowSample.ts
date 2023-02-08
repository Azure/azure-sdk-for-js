// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  CreateOrReplaceWorkflowParameters
} from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or replace a workflow.
 *
 * @summary Create or replace a workflow.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/CreateOrReplaceWorkflow.json
 */
const endpoint = process.env["ENDPOINT"] || "";
const tenantId = process.env["TENANTID"] || "";
const clientId = process.env["CLIENTID"] || "";
const username = process.env["USERNAME"] || "";
const password = process.env["PASSWORD"] || "";

async function workflowCreateOrUpdate() {
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const workflowId = "4afb5752-e47f-43a1-8ba7-c696bf8d2745";
  const options: CreateOrReplaceWorkflowParameters = {
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
                    emailRecipients: [
                      "@{triggerBody()['request']['requestor']}"
                    ],
                    emailSubject: "Glossary Term Create - APPROVED"
                  }
                },
                runAfter: { "Create glossary term": ["Succeeded"] }
              }
            },
            else: {
              actions: {
                "Send reject email notification": {
                  type: "EmailNotification",
                  inputs: {
                    parameters: {
                      emailMessage:
                        "Your request for Glossary Term @{triggerBody()['request']['term']['name']} is rejected.",
                      emailRecipients: [
                        "@{triggerBody()['request']['requestor']}"
                      ],
                      emailSubject: "Glossary Term Create - REJECTED"
                    }
                  },
                  runAfter: {}
                }
              }
            },
            expression: {
              and: [
                {
                  equals: [
                    "@outputs('Start and wait for an approval')['body/outcome']",
                    "Approved"
                  ]
                }
              ]
            },
            runAfter: { "Start and wait for an approval": ["Succeeded"] }
          },
          "Start and wait for an approval": {
            type: "Approval",
            inputs: {
              parameters: {
                approvalType: "PendingOnAll",
                assignedTo: ["eece94d9-0619-4669-bb8a-d6ecec5220bc"],
                title: "Approval Request for Create Glossary Term"
              }
            },
            runAfter: {}
          }
        }
      },
      isEnabled: true,
      triggers: [
        {
          type: "when_term_creation_is_requested",
          underGlossaryHierarchy:
            "/glossaries/20031e20-b4df-4a66-a61d-1b0716f3fa48"
        }
      ]
    }
  };
  const result = await client
    .path("/workflows/{workflowId}", workflowId)
    .put(options);
  console.log(result);
}

workflowCreateOrUpdate().catch(console.error);
