// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the Package identified by Package name.
 *
 * @summary update the Package identified by Package name.
 * x-ms-original-file: 2024-10-23/package/updatePackage.json
 */
async function updateAPackage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.package.update(
    "rg",
    "MyAutomationAccount",
    "runtimeEnvironmentName",
    "OmsCompositeResources",
    {
      contentLink: {
        contentHash: {
          algorithm: "sha265",
          value: "07E108A962B81DD9C9BAA89BB47C0F6EE52B29E83758B07795E408D258B2B87A",
        },
        uri: "https://teststorage.blob.core.windows.net/mycontainer/MyModule.zip",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAPackage();
}

main().catch(console.error);
