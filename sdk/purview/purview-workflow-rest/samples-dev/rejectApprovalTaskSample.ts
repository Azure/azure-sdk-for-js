// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  RejectApprovalTaskParameters
} from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Reject an approval task.
 *
 * @summary Reject an approval task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/RejectApprovalTask.json
 */
async function approvalRequestReject() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const taskId = "98d98e2c-23fa-4157-a3f8-ff8ce5cc095c";
  const options: RejectApprovalTaskParameters = {
    body: { comment: "Thanks for raising this!" }
  };
  const result = await client
    .path("/workflowtasks/{taskId}/reject-approval", taskId)
    .post(options);
  console.log(result);
}

approvalRequestReject().catch(console.error);
