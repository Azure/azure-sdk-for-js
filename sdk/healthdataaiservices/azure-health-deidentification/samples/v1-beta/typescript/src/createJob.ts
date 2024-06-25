// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary This sample demonstrates how to create a job which will deidentify all files within a blob storage container filtering via a prefix.
 */

import createClient, {
  DeidentificationJob,
  DeidentificationJobOutput,
  isUnexpected,
} from "@azure-rest/health-deidentification";
import { DefaultAzureCredential } from "@azure/identity";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint = "https://example.api.cac001.deid.azure.com";
  const storageAccountSASUri = "exampleSASUri";
  const OUTPUT_FOLDER = "_output";
  const inputPrefix = "example_patient_1";
  const client = createClient(serviceEndpoint, credential);
  const jobName = "exampleJob";

  const job: DeidentificationJob = {
    dataType: "Plaintext",
    operation: "Surrogate",
    sourceLocation: { location: storageAccountSASUri, prefix: inputPrefix, extensions: ["*"] },
    targetLocation: { location: storageAccountSASUri, prefix: OUTPUT_FOLDER },
  };
  const response = await client.path("/jobs/{name}", jobName).put({ body: job });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body as DeidentificationJobOutput);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
