// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create the configuration identified by configuration name.
 *
 * @summary create the configuration identified by configuration name.
 * x-ms-original-file: 2024-10-23/createOrUpdateDscConfiguration.json
 */
async function createOrUpdateConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscConfigurationOperations.createOrUpdate(
    "rg",
    "myAutomationAccount18",
    "SetupServer",
    {
      name: "SetupServer",
      location: "East US 2",
      description: "sample configuration",
      source: {
        type: "embeddedContent",
        hash: {
          algorithm: "sha256",
          value: "A9E5DB56BA21513F61E0B3868816FDC6D4DF5131F5617D7FF0D769674BD5072F",
        },
        value:
          'Configuration SetupServer {\r\n    Node localhost {\r\n                               WindowsFeature IIS {\r\n                               Name = "Web-Server";\r\n            Ensure = "Present"\r\n        }\r\n    }\r\n}',
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateConfiguration();
}

main().catch(console.error);
