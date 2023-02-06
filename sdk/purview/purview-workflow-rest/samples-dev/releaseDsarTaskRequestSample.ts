// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  ReleaseDsarTaskRequestParameters
} from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Release a DSAR task request.
 *
 * @summary Release a DSAR task request.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ReleaseDSARTaskRequest.json
 */
async function dsarTaskRequestRelease() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const taskId = "5cc7992a-7f5e-11ed-a1eb-0242ac120002";
  const options: ReleaseDsarTaskRequestParameters = {
    body: { comment: "Thanks!" }
  };
  const result = await client
    .path("/workflowtasks/{taskId}/release-task", taskId)
    .post(options);
  console.log(result);
}

dsarTaskRequestRelease().catch(console.error);
