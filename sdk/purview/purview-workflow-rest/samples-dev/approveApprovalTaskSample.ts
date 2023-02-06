// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  ApproveApprovalTaskParameters
} from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Approve an approval task.
 *
 * @summary Approve an approval task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ApproveApprovalTask.json
 */
async function approvalTaskApprove() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const taskId = "98d98e2c-23fa-4157-a3f8-ff8ce5cc095c";
  const options: ApproveApprovalTaskParameters = {
    body: { comment: "Thanks for raising this!" }
  };
  const result = await client
    .path("/workflowtasks/{taskId}/approve-approval", taskId)
    .post(options);
  console.log(result);
}

approvalTaskApprove().catch(console.error);
