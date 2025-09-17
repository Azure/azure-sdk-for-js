// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Generate configurations for a Linker.
 *
 * @summary Generate configurations for a Linker.
 * x-ms-original-file: specification/servicelinker/resource-manager/Microsoft.ServiceLinker/preview/2024-07-01-preview/examples/LinkerGenerateConfigurations.json
 */

import type {
  ConfigurationInfo,
  LinkersGenerateConfigurationsOptionalParams,
} from "@azure/arm-servicelinker";
import { ServiceLinkerManagementClient } from "@azure/arm-servicelinker";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function generateConfiguration(): Promise<void> {
  const resourceUri =
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app";
  const linkerName = "linkName";
  const parameters: ConfigurationInfo = {
    customizedKeys: { aslDocumentDbConnectionString: "MyConnectionstring" },
  };
  const options: LinkersGenerateConfigurationsOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new ServiceLinkerManagementClient(credential);
  const result = await client.linkers.generateConfigurations(resourceUri, linkerName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await generateConfiguration();
}

main().catch(console.error);
