// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to create a job which will deidentify all files within a specific folder of a blob storage container.
 */

import type { DeidentificationJob } from "@azure-rest/health-deidentification";
import DeidentificationClient, {
  getLongRunningPoller,
  isUnexpected,
} from "@azure-rest/health-deidentification";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint = process.env["HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT"] as string;
  const storageLocation = process.env["HEALTHDATAAISERVICES_STORAGE_ACCOUNT_LOCATION"] as string;
  const inputPrefix = "example_patient_1";
  const outputPrefix = process.env["OUTPUT_PREFIX"] || "_output";
  // @ts-preserve-whitespace
  const client = DeidentificationClient(serviceEndpoint, credential);
  const jobName = "sample-job-" + new Date().getTime().toString().slice(-8);
  // @ts-preserve-whitespace
  const job: DeidentificationJob = {
    operation: "Surrogate",
    sourceLocation: { location: storageLocation, prefix: inputPrefix },
    targetLocation: { location: storageLocation, prefix: outputPrefix },
  };
  const response = await client.path("/jobs/{name}", jobName).put({ body: job });
  // @ts-preserve-whitespace
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  // @ts-preserve-whitespace
  const poller = await getLongRunningPoller(client, response);
  const finalOutput = await poller.pollUntilDone();
  console.log(finalOutput.body);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
