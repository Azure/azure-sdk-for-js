// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update the package identified by package name.
 *
 * @summary create or update the package identified by package name.
 * x-ms-original-file: 2024-10-23/package/createOrUpdatePackage.json
 */
async function createOrUpdateAPackage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.package.createOrUpdate(
    "rg",
    "myAutomationAccount33",
    "runtimeEnvironmentName",
    "OmsCompositeResources",
    {
      contentLink: {
        contentHash: {
          algorithm: "sha265",
          value: "07E108A962B81DD9C9BAA89BB47C0F6EE52B29E83758B07795E408D258B2B87A",
        },
        uri: "https://teststorage.blob.core.windows.net/dsccomposite/OmsCompositeResources.zip",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAPackage();
}

main().catch(console.error);
