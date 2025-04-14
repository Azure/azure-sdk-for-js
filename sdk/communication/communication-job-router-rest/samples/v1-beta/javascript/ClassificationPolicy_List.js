// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
const JobRouter = require("@azure-rest/communication-job-router").default,
  { paginate } = require("@azure-rest/communication-job-router");
require("dotenv").config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// List classification policies
async function listClassificationPolicies() {
  // Create the Router Client
  const routerClient = JobRouter(connectionString);

  // let pagesCount = 1;
  const maxPageSize = 3;
  // Get the first page which also contains information on how to get the next page.
  const initialResponse = await routerClient
    .path("/routing/classificationPolicies")
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

listClassificationPolicies().catch(console.error);
