// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Classification policy crud
 */
import {
  AzureCommunicationRoutingServiceClient, ClassificationPolicy
} from "../src";
import createClient from "../src/azureCommunicationRoutingServiceClient"
import { paginate } from "../src";

// Load the .env file (you will need to set these environment variables)
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["COMMUNICATION_CONNECTION_STRING"] || "";

// List classification policies
async function listClassificationPolicies(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    createClient(connectionString);

  // let pagesCount = 1;
  const maxPageSize = 3;
  const receivedPagedItems: ClassificationPolicy[] = [];

  // Get the first page which also contains information on how to get the next page.
  const initialResponse = await routerClient.path("/routing/classificationPolicies").get({ queryParameters: { maxpagesize: maxPageSize} })
  
// The paginate helper creates a paged async iterator using metadata from the first page.
  const items = paginate(routerClient, initialResponse);

// We get an PageableAsyncIterator so we need to do `for await`.
  for await (const policy of items) {
    if (policy.classificationPolicy) {
      receivedPagedItems.push(policy);
      console.log("Listing classification policy with id: " + policy.classificationPolicy.id);
    }
  }

}

listClassificationPolicies().catch(console.error);
