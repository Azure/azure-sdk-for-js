// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an assembly for an integration account.
 *
 * @summary Create or update an assembly for an integration account.
 * x-ms-original-file: specification/logic/resource-manager/Microsoft.Logic/stable/2019-05-01/examples/IntegrationAccountAssemblies_CreateOrUpdate.json
 */

import type { AssemblyDefinition } from "@azure/arm-logic";
import { LogicManagementClient } from "@azure/arm-logic";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateAnAccountAssembly(): Promise<void> {
  const subscriptionId =
    process.env["LOGIC_SUBSCRIPTION_ID"] || "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["LOGIC_RESOURCE_GROUP"] || "testResourceGroup";
  const integrationAccountName = "testIntegrationAccount";
  const assemblyArtifactName = "testAssembly";
  const assemblyArtifact: AssemblyDefinition = {
    location: "westus",
    properties: {
      assemblyName: "System.IdentityModel.Tokens.Jwt",
      content: "Base64 encoded Assembly Content",
      metadata: {},
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new LogicManagementClient(credential, subscriptionId);
  const result = await client.integrationAccountAssemblies.createOrUpdate(
    resourceGroupName,
    integrationAccountName,
    assemblyArtifactName,
    assemblyArtifact,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAnAccountAssembly();
}

main().catch(console.error);
