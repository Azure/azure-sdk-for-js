// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  ReassignWorkflowTaskParameters
} from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Reassign a workflow task.
 *
 * @summary Reassign a workflow task.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ReassignWorkflowTask.json
 */
async function approvalRequestReassign() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const taskId = "11b0244b-70ea-4c6b-9d28-08f52de40f2f";
  const options: ReassignWorkflowTaskParameters = {
    body: {
      reassignments: [
        {
          reassignFrom: "eece94d9-0619-4669-bb8a-d6ecec5220bc",
          reassignTo: "7645223c-cdca-43e9-98c8-bd4d97e79e5e"
        }
      ]
    }
  };
  const result = await client
    .path("/workflowtasks/{taskId}/reassign", taskId)
    .post(options);
  console.log(result);
}

approvalRequestReassign().catch(console.error);
