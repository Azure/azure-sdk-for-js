// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary This sample demonstrates how to list jobs and iterate over them in a for loop.
 */

import createClient, { isUnexpected, paginate } from "@azure-rest/health-deidentification";
import { DefaultAzureCredential } from "@azure/identity";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint = "https://example.api.cac001.deid.azure.com";
  const client = createClient(serviceEndpoint, credential);

  const response = await client.path("/jobs").get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const items = [];
  const iter = paginate(client, response);
  for await (const item of iter) {
    items.push(item);
  }

  console.log(items); // items will contain all the jobs
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
