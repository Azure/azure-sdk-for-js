// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns details of a specific file in a work space.
 *
 * @summary returns details of a specific file in a work space.
 * x-ms-original-file: 2025-06-01-preview/GetFileDetails.json
 */
async function getDetailsOfASubscriptionFile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.filesNoSubscription.get("testworkspace", "test.txt");
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfASubscriptionFile();
}

main().catch(console.error);
