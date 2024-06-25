// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary This sample demonstrates how to create a `DeidentificationClient` and then deidentify a `string`
 */

import createClient, {
  DeidentificationContent,
  DeidentificationResultOutput,
  isUnexpected,
} from "@azure-rest/health-deidentification";
import { DefaultAzureCredential } from "@azure/identity";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const serviceEndpoint = "https://example.api.cac001.deid.azure.com";
  const client = createClient(serviceEndpoint, credential);

  const content: DeidentificationContent = {
    dataType: "Plaintext",
    inputText: "Hello John!",
    operation: "Surrogate",
  };

  const response = await client.path("/deid").post({ body: content });

   if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log((response.body as DeidentificationResultOutput).outputText); // Hello, Tom!
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
