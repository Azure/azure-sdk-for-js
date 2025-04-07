// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router worker crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default,
  { isUnexpected, paginate } = require("@azure-rest/communication-job-router");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const endpoint = process.env["COMMUNICATION_ENDPOINT"] || "";

// List exception policies
async function listRouterWorkers() {
  // Create the Router Client
  const routerClient = JobRouter(endpoint, new DefaultAzureCredential());

  const maxPageSize = 3;
  // Get the first page which also contains information on how to get the next page.
  const initialResponse = await routerClient
    .path("/routing/queues")
    .get({ queryParameters: { maxpagesize: maxPageSize } });

  if (!isUnexpected(initialResponse)) {
    // The paginate helper creates a paged async iterator using metadata from the first page.
    const items = paginate(routerClient, initialResponse);

    // We get an PageableAsyncIterator so we need to do `for await`.
    for await (const item of items) {
      console.log(item);
    }
  }
}

listRouterWorkers().catch(console.error);
