// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createPurviewWorkflowClient = require("@azure-rest/purview-workflow").default;
const { UsernamePasswordCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Reassign a workflow task.
 *
 * @summary Reassign a workflow task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ReassignWorkflowTask.json
 */
const endpoint = process.env["ENDPOINT"] || "";
const tenantId = process.env["TENANTID"] || "";
const clientId = process.env["CLIENTID"] || "";
const username = process.env["USERNAME"] || "";
const password = process.env["PASSWORD"] || "";

async function approvalRequestReassign() {
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const taskId = "11b0244b-70ea-4c6b-9d28-08f52de40f2f";
  const options = {
    body: {
      reassignments: [
        {
          reassignFrom: "eece94d9-0619-4669-bb8a-d6ecec5220bc",
          reassignTo: "7645223c-cdca-43e9-98c8-bd4d97e79e5e",
        },
      ],
    },
  };
  const result = await client.path("/workflowtasks/{taskId}/reassign", taskId).post(options);
  console.log(result);
}

approvalRequestReassign().catch(console.error);
