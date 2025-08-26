// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns details of a specific file in a work space.
 *
 * @summary Returns details of a specific file in a work space.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/stable/2024-04-01/examples/GetFileDetails.json
 */

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDetailsOfASubscriptionFile(): Promise<void> {
  const fileWorkspaceName = "testworkspace";
  const fileName = "test.txt";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.filesNoSubscription.get(fileWorkspaceName, fileName);
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfASubscriptionFile();
}

main().catch(console.error);
