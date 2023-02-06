// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createPurviewWorkflowClient, {
  ListWorkflowTasksParameters,
  paginate
} from "@azure-rest/purview-workflow";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get all workflow tasks.
 *
 * @summary Get all workflow tasks.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ListWorkflowTasks.json
 */
async function workflowTasksList() {
  const credential = new DefaultAzureCredential();
  const client = createPurviewWorkflowClient(credential);
  const options: ListWorkflowTasksParameters = {
    queryParameters: {
      viewMode: "sent",
      timeWindow: "30d",
      maxpagesize: 1000,
      orderby: "createdTime desc"
    }
  };
  const initialResponse = await client.path("/workflowtasks").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

workflowTasksList().catch(console.error);
