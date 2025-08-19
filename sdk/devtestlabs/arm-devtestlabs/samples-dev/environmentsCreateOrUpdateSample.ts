// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DtlEnvironment } from "@azure/arm-devtestlabs";
import { DevTestLabsClient } from "@azure/arm-devtestlabs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Create or replace an existing environment. This operation can take a while to complete.
 *
 * @summary Create or replace an existing environment. This operation can take a while to complete.
 * x-ms-original-file: specification/devtestlabs/resource-manager/Microsoft.DevTestLab/stable/2018-09-15/examples/Environments_CreateOrUpdate.json
 */
async function environmentsCreateOrUpdate(): Promise<void> {
  const subscriptionId = "{subscriptionId}";
  const resourceGroupName = "resourceGroupName";
  const labName = "{labName}";
  const userName = "@me";
  const name = "{environmentName}";
  const dtlEnvironment: DtlEnvironment = {
    deploymentProperties: {
      armTemplateId:
        "/subscriptions/{subscriptionId}/resourceGroups/resourceGroupName/providers/Microsoft.DevTestLab/labs/{labName}/artifactSources/{artifactSourceName}/armTemplates/{armTemplateName}",
      parameters: [],
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DevTestLabsClient(credential, subscriptionId);
  const result = await client.environments.beginCreateOrUpdateAndWait(
    resourceGroupName,
    labName,
    userName,
    name,
    dtlEnvironment,
  );
  console.log(result);
}

environmentsCreateOrUpdate().catch(console.error);
