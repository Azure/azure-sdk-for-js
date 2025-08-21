// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Creates a run of a pipeline.
 *
 * @summary Creates a run of a pipeline.
 * x-ms-original-file: specification/datafactory/resource-manager/Microsoft.DataFactory/stable/2018-06-01/examples/Pipelines_CreateRun.json
 */

import {
  PipelinesCreateRunOptionalParams,
  DataFactoryManagementClient,
} from "@azure/arm-datafactory";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function pipelinesCreateRun(): Promise<void> {
  const subscriptionId =
    process.env["DATAFACTORY_SUBSCRIPTION_ID"] ||
    "12345678-1234-1234-1234-12345678abc";
  const resourceGroupName =
    process.env["DATAFACTORY_RESOURCE_GROUP"] || "exampleResourceGroup";
  const factoryName = "exampleFactoryName";
  const pipelineName = "examplePipeline";
  const referencePipelineRunId = undefined;
  const parameters: { [propertyName: string]: any } = {
    outputBlobNameList: ["exampleoutput.csv"],
  };
  const options: PipelinesCreateRunOptionalParams = {
    referencePipelineRunId,
    parameters,
  };
  const credential = new DefaultAzureCredential();
  const client = new DataFactoryManagementClient(credential, subscriptionId);
  const result = await client.pipelines.createRun(
    resourceGroupName,
    factoryName,
    pipelineName,
    options,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await pipelinesCreateRun();
}

main().catch(console.error);
