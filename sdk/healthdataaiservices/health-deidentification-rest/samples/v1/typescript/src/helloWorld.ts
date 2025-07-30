// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to create a `DeidentificationClient` and then deidentify a `string`
 */

import createClient, {
  DeidentificationContent,
  isUnexpected,
} from "@azure-rest/health-deidentification";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint = process.env["HEALTHDATAAISERVICES_DEID_SERVICE_ENDPOINT"] as string;
  const client = createClient(serviceEndpoint, credential);

  const content: DeidentificationContent = {
    inputText: "Hello, John!",
  };

  const response = await client.path("/deid").post({ body: content });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.outputText); // Hello, Tom!
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
