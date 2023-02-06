// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  ListWorkflowRunsParameters,
  paginate
} from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List workflow runs.
 *
 * @summary List workflow runs.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflowRuns.json
 */
async function workflowRunsList() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const options: ListWorkflowRunsParameters = {
    queryParameters: {
      timeWindow: "30d",
      orderby: "startTime desc",
      maxpagesize: 1000
    }
  };
  const initialResponse = await client.path("/workflowruns").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

workflowRunsList().catch(console.error);
