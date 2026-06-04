// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create the node configuration identified by node configuration name.
 *
 * @summary create the node configuration identified by node configuration name.
 * x-ms-original-file: 2024-10-23/createOrUpdateDscNodeConfiguration.json
 */
async function createNodeConfiguration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.dscNodeConfiguration.createOrUpdate(
    "rg",
    "myAutomationAccount20",
    "configName.nodeConfigName",
    {
      name: "configName.nodeConfigName",
      configuration: { name: "configName" },
      incrementNodeConfigurationBuild: true,
      source: {
        type: "embeddedContent",
        hash: {
          algorithm: "sha256",
          value: "6DE256A57F01BFA29B88696D5E77A383D6E61484C7686E8DB955FA10ACE9FFE5",
        },
        value:
          '\r\ninstance of MSFT_RoleResource as $MSFT_RoleResource1ref\r\n{\r\nResourceID = "[WindowsFeature]IIS";\r\n Ensure = "Present";\r\n SourceInfo = "::3::32::WindowsFeature";\r\n Name = "Web-Server";\r\n ModuleName = "PsDesiredStateConfiguration";\r\n\r\nModuleVersion = "1.0";\r\r\n ConfigurationName = "configName";\r\r\n};\r\ninstance of OMI_ConfigurationDocument\r\n\r\r\n                    {\r\n Version="2.0.0";\r\n \r\r\n                        MinimumCompatibleVersion = "1.0.0";\r\n \r\r\n                        CompatibleVersionAdditionalProperties= {"Omi_BaseResource:ConfigurationName"};\r\n \r\r\n                        Author="weijiel";\r\n \r\r\n                        GenerationDate="03/30/2017 13:40:25";\r\n \r\r\n                        GenerationHost="TEST-BACKEND";\r\n \r\r\n                        Name="configName";\r\n\r\r\n                    };\r\n',
        version: "1.0",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createNodeConfiguration();
}

main().catch(console.error);
