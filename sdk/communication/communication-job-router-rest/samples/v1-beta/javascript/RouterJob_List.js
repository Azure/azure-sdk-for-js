// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary router job crud
 */
const JobRouter = require("../src").default,
  { paginate } = require("../src");
require("dotenv").config();
const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// List exception policies
async function listRouterJobs() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  const maxPageSize = 3;
  // Get the first page which also contains information on how to get the next page.
  const initialResponse = await routerClient
    .path("/routing/jobs")
    .get({ queryParameters: { maxpagesize: maxPageSize } });

  if (initialResponse.status == "200") {
    // The paginate helper creates a paged async iterator using metadata from the first page.
    const items = paginate(routerClient, initialResponse);

    // We get an PageableAsyncIterator so we need to do `for await`.
    for await (const item of items) {
      console.log(item);
    }
  }
}

listRouterJobs().catch(console.error);
