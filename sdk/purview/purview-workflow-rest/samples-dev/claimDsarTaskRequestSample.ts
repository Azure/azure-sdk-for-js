// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  ClaimDsarTaskRequestParameters
} from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Claim a DSAR task request.
 *
 * @summary Claim a DSAR task request.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ClaimDSARTaskRequest.json
 */
async function dsarTaskRequestClaim() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const taskId = "d5bd0215-df84-4245-8e18-3a8f012be376";
  const options: ClaimDsarTaskRequestParameters = {
    body: { comment: "Thanks!" }
  };
  const result = await client
    .path("/workflowtasks/{taskId}/claim-task", taskId)
    .post(options);
  console.log(result);
}

dsarTaskRequestClaim().catch(console.error);
