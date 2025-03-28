/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  ProjectsGetJobStatusOptionalParams,
  VisualStudioResourceProviderClient
} from "@azure/arm-visualstudio";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Gets the status of the project resource creation job.
 *
 * @summary Gets the status of the project resource creation job.
 * x-ms-original-file: specification/visualstudio/resource-manager/Microsoft.VisualStudio/preview/2014-04-01-preview/examples/GetProjectJobStatus.json
 */
async function getTheStatusOfTheProjectCreationJob(): Promise<void> {
  const subscriptionId = "0de7f055-dbea-498d-8e9e-da287eedca90";
  const resourceGroupName = "VS-Example-Group";
  const rootResourceName = "ExampleAccount";
  const resourceName = "ExampleProject";
  const subContainerName = "ExampleProject";
  const operation = "put";
  const jobId = "126167d2-d710-4b5d-80a8-a1d58717142d";
  const options: ProjectsGetJobStatusOptionalParams = { jobId };
  const credential = new DefaultAzureCredential();
  const client = new VisualStudioResourceProviderClient(
    credential,
    subscriptionId
  );
  const result = await client.projects.getJobStatus(
    resourceGroupName,
    rootResourceName,
    resourceName,
    subContainerName,
    operation,
    options
  );
  console.log(result);
}

getTheStatusOfTheProjectCreationJob().catch(console.error);
