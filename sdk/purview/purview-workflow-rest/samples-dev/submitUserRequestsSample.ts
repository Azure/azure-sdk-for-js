// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  SubmitUserRequestsParameters,
} from "@azure-rest/purview-workflow";
import { UsernamePasswordCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created.
 *
 * @summary Submit a user request for requestor, a user  request describes user ask to do operation(s) on Purview. If any workflow's trigger matches with an operation in request, a run of the workflow is created.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/SubmitUserRequests.json
 */
const endpoint = process.env["ENDPOINT"] || "";
const tenantId = process.env["TENANTID"] || "";
const clientId = process.env["CLIENTID"] || "";
const username = process.env["USERNAME"] || "";
const password = process.env["PASSWORD"] || "";

async function userRequestsSubmit() {
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const options: SubmitUserRequestsParameters = {
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
  };
  const result = await client.path("/userrequests").post(options);
  console.log(result);
}

userRequestsSubmit().catch(console.error);
