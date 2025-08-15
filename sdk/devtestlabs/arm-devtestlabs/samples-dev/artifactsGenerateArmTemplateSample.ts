// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GenerateArmTemplateRequest } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Generates an ARM template for the given artifact, uploads the required files to a storage account, and validates the generated artifact.
 *
 * @summary Generates an ARM template for the given artifact, uploads the required files to a storage account, and validates the generated artifact.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Artifacts_GenerateArmTemplate.json
 */
async function artifactsGenerateArmTemplate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const artifactSourceName = "{artifactSourceName}";
  const name = "{artifactName}";
  const generateArmTemplateRequest: GenerateArmTemplateRequest = {
    fileUploadOptions: "None",
    location: "{location}",
    virtualMachineName: "{vmName}",
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.artifacts.generateArmTemplate(
    resourceGroupName,
    labName,
    artifactSourceName,
    name,
    generateArmTemplateRequest,
  );
  console.log(result);
}

artifactsGenerateArmTemplate().catch(console.error);
