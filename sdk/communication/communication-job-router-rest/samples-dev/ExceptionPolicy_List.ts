// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @summary Exception policy crud
 */



import {
  AzureCommunicationRoutingServiceClient, 
  paginate
} from "../src";
import JobRouter from "../src";
import { DefaultAzureCredential } from "@azure/identity";




// List exception policies
async function listExceptionPolicies(): Promise<void> {
  // Create the Router Client
  const routerClient: AzureCommunicationRoutingServiceClient =
    JobRouter("https://<endpoint>", new DefaultAzureCredential());

  const maxPageSize = 3;
  // Get the first page which also contains information on how to get the next page.
  const initialResponse = await routerClient.path("/routing/exceptionPolicies").get({ queryParameters: { maxpagesize: maxPageSize} })

  if (initialResponse.status == "200") {
    // The paginate helper creates a paged async iterator using metadata from the first page.
    const items = paginate(routerClient, initialResponse);

    // We get an PageableAsyncIterator so we need to do `for await`.
    for await (const item of items) {
      console.log(item);
    }
  }
}

listExceptionPolicies().catch(console.error);
