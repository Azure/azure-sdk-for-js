// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftSupport } from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this operation fetches ARM resource id of support resource type.
 *
 * @summary this operation fetches ARM resource id of support resource type.
 * x-ms-original-file: 2026-07-01/LookUpResourceId.json
 */
async function lookUpResourceIdOfSupportResourceType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential);
  const result = await client.supportTickets.lookUpResourceId({
    type: "Microsoft.Support/supportTickets",
    identifier: "1234668596",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await lookUpResourceIdOfSupportResourceType();
}

main().catch(console.error);
