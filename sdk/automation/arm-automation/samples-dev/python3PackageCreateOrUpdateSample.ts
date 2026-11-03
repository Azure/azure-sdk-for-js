// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or Update the python 3 package identified by package name.
 *
 * @summary create or Update the python 3 package identified by package name.
 * x-ms-original-file: 2024-10-23/createOrUpdatePython3Package.json
 */
async function createOrUpdateAPython3Package(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.python3Package.createOrUpdate(
    "rg",
    "myAutomationAccount33",
    "OmsCompositeResources",
    {
      contentLink: {
        contentHash: {
          algorithm: "sha265",
          value: "07E108A962B81DD9C9BAA89BB47C0F6EE52B29E83758B07795E408D258B2B87A",
        },
        uri: "https://teststorage.blob.core.windows.net/dsccomposite/OmsCompositeResources.zip",
        version: "1.0.0.0",
      },
      tags: {},
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAPython3Package();
}

main().catch(console.error);
