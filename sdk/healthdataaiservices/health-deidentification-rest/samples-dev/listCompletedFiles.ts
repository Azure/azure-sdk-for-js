// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to list files that were completed by a job.
 */

import type { DeidentificationJob } from "@azure-rest/health-deidentification";
import createClient, { isUnexpected, paginate } from "@azure-rest/health-deidentification";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint = process.env["HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT"] as string;
  const storageLocation = process.env["HEALTHDATAAISERVICES_STORAGE_ACCOUNT_LOCATION"] as string;
  const location = storageLocation || "defaultSasUri";
  const OUTPUT_FOLDER = "_output";
  const inputPrefix = "example_patient_1";
  const client = createClient(serviceEndpoint, credential);
  const jobName = "exampleJob";

  const job: DeidentificationJob = {
    operation: "Redact",
    sourceLocation: { location, prefix: inputPrefix },
    targetLocation: { location, prefix: OUTPUT_FOLDER, overwrite: true },
    customizations: {
      redactionFormat: "<{TYPE}>",
    },
  };

  await client.path("/jobs/{name}", jobName).put({ body: job });

  const response = await client.path("/jobs/{name}/documents", jobName).get();

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  const items = [];
  const iter = paginate(client, response);

  for await (const item of iter) {
    items.push(item);
  }

  console.log(items); // items will contain all the completed files
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
