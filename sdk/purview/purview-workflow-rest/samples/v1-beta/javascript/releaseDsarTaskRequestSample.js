// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createPurviewWorkflowClient = require("@azure-rest/purview-workflow").default;
const { UsernamePasswordCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Release a DSAR task request.
 *
 * @summary Release a DSAR task request.
 * x-ms-original-file: specification/purview/data-plane/Azure.Analytics.Purview.Workflow/preview/2022-05-01-preview/examples/ReleaseDSARTaskRequest.json
 */
const endpoint = process.env["ENDPOINT"] || "";
const tenantId = process.env["TENANTID"] || "";
const clientId = process.env["CLIENTID"] || "";
const username = process.env["USERNAME"] || "";
const password = process.env["PASSWORD"] || "";

async function dsarTaskRequestRelease() {
  const credential = new UsernamePasswordCredential(tenantId, clientId, username, password);
  const client = createPurviewWorkflowClient(endpoint, credential);
  const taskId = "5cc7992a-7f5e-11ed-a1eb-0242ac120002";
  const options = {
    body: { comment: "Thanks!" },
  };
  const result = await client.path("/workflowtasks/{taskId}/release-task", taskId).post(options);
  console.log(result);
}

dsarTaskRequestRelease().catch(console.error);
