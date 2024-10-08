// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createPurviewWorkflowClient = require("@azure-rest/purview-workflow").default,
  { isUnexpected } = require("@azure-rest/purview-workflow");
const { UsernamePasswordCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created. Before user submit a user request, a workflow should be created.
 *
 * @summary Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created.
 */
async function userRequestsSubmit() {
  // ================================================== Create client ==================================================

  const endpoint = process.env["ENDPOINT"] || "";
  const tenantId = process.env["TENANTID"] || "";
  const clientId = process.env["CLIENTID"] || "";
  const username = process.env["USERNAME"] || "";
  const password = process.env["PASSWORD"] || "";
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);

  // ================================================== Submit a user request ==================================================

  const userRequestPayload = {
    body: {
      comment: "Thanks!",
      operations: [
        {
          type: "CreateTerm",
          payload: {
            glossaryTerm: {
              name: "term",
              anchor: { glossaryGuid: "20031e20-b4df-4a66-a61d-1b0716f3fa48" },
              nickName: "term",
              status: "Approved",
            },
          },
        },
      ],
    },
  }; //This payload is an example payload, please replace the payload with real data.

  const result = await client.path("/userrequests").post(userRequestPayload);
  if (isUnexpected(result)) {
    throw result.body.error;
  }
  console.log(`The submitted user request is ${result.body}`);
}

userRequestsSubmit().catch(console.error);
