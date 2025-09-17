// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Diagnose workspace setup issue.
 *
 * @summary Diagnose workspace setup issue.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Workspace/diagnose.json
 */

import type {
  DiagnoseWorkspaceParameters,
  WorkspacesDiagnoseOptionalParams,
} from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function diagnoseWorkspace(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "workspace-1234";
  const workspaceName = "testworkspace";
  const parameters: DiagnoseWorkspaceParameters = {
    value: {
      applicationInsights: {},
      containerRegistry: {},
      dnsResolution: {},
      keyVault: {},
      nsg: {},
      others: {},
      resourceLock: {},
      storageAccount: {},
      udr: {},
    },
  };
  const options: WorkspacesDiagnoseOptionalParams = { parameters };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginDiagnoseAndWait(
    resourceGroupName,
    workspaceName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await diagnoseWorkspace();
}

main().catch(console.error);
