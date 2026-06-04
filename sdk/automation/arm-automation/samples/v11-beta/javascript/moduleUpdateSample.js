// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the module identified by module name.
 *
 * @summary update the module identified by module name.
 * x-ms-original-file: 2024-10-23/updateModule.json
 */
async function updateAModule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.module.update("rg", "MyAutomationAccount", "MyModule", {
    contentLink: {
      contentHash: {
        algorithm: "sha265",
        value: "07E108A962B81DD9C9BAA89BB47C0F6EE52B29E83758B07795E408D258B2B87A",
      },
      uri: "https://teststorage.blob.core.windows.net/mycontainer/MyModule.zip",
      version: "1.0.0.0",
    },
  });
  console.log(result);
}

async function main() {
  await updateAModule();
}

main().catch(console.error);
