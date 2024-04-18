// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary job queue crud
 */
import JobRouter, {
  paginate,
  AzureCommunicationRoutingServiceClient
} from "@azure-rest/communication-job-router";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// List exception policies
async function listJobQueues(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter(connectionString);

  const maxPageSize = 3;
  // Get the first page which also contains information on how to get the next page.
  const initialResponse = await routerClient.path("/routing/queues").get({ queryParameters: { maxpagesize: maxPageSize } })

  if (initialResponse.status == "200") {
    // The paginate helper creates a paged async iterator using metadata from the first page.
    const items = paginate(routerClient, initialResponse);

    // We get an PageableAsyncIterator so we need to do `for await`.
    for await (const item of items) {
      console.log(item);
    }
  }
}

listJobQueues().catch(console.error);
