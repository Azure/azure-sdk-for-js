// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import { AIProjectClient, DatasetVersion } from "@azure/ai-projects";
import type {
  AzureAISearchIndex,
  Connection,
  DatasetVersionUnion,
  ModelDeployment,
} from "@azure/ai-projects";
import { isRestError } from "@azure/core-rest-pipeline";
import { createProjectsClient } from "./public/utils/createClient.js";
import { DefaultAzureCredential } from "@azure/identity";
import { beforeEach, it, describe } from "vitest";
import { RestError } from "@azure/core-rest-pipeline";
import * as path from "path";

describe("snippets", function () {
  let project: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    project = createProjectsClient();
  });

  it("setup", async function () {
    const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
    const client = new AIProjectClient(endpoint, new DefaultAzureCredential());
  });

  it("agentsSample", async function () {
    const agent = await project.agents.createAgent("gpt-4o", {
      name: "my-agent",
      instructions: "You are a helpful agent",
    });
    console.log(`Created agent, agent ID : ${agent.id}`);
    // @ts-preserve-whitespace
    // Do something with your Agent!
    // See samples here https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/ai/ai-agents/samples

    await project.agents.deleteAgent(agent.id);
    console.log(`Deleted agent, agent ID: ${agent.id}`);
  });

  it("openAI", async function () {
    const client = await project.inference.azureOpenAI({
      // The API version should match the version of the Azure OpenAI resource.
      apiVersion: "2024-10-21",
    });
    const response = await client.chat.completions.create({
      model: deploymentName,
      messages: [{ role: "user", content: "How many feet are in a mile?" }],
    });
    console.log("response = ", JSON.stringify(response, null, 2));
  });

  it("deployments", async function () {
    const modelPublisher = process.env["MODEL_PUBLISHER"] || "<model publisher>";
    console.log("List all deployments:");
    const deployments: ModelDeployment[] = [];
    const properties: Array<Record<string, string>> = [];
    // @ts-preserve-whitespace
    for await (const deployment of project.deployments.list()) {
      // Check if this is a ModelDeployment (has the required properties)
      if (
        deployment.type === "ModelDeployment" &&
        "modelName" in deployment &&
        "modelPublisher" in deployment &&
        "modelVersion" in deployment
      ) {
        deployments.push(deployment);
        properties.push({
          name: deployment.name,
          modelPublisher: deployment.modelPublisher,
          modelName: deployment.modelName,
        });
      }
    }
    console.log(`Retrieved deployments: ${JSON.stringify(properties, null, 2)}`);
    // @ts-preserve-whitespace
    // List all deployments by a specific model publisher (assuming we have one from the list)
    console.log(`List all deployments by the model publisher '${modelPublisher}':`);
    const filteredDeployments: ModelDeployment[] = [];
    for await (const deployment of project.deployments.list({
      modelPublisher,
    })) {
      // Check if this is a ModelDeployment
      if (
        deployment.type === "ModelDeployment" &&
        "modelName" in deployment &&
        "modelPublisher" in deployment &&
        "modelVersion" in deployment
      ) {
        filteredDeployments.push(deployment);
      }
    }
    console.log(
      `Retrieved ${filteredDeployments.length} deployments from model publisher '${modelPublisher}'`,
    );
    // @ts-preserve-whitespace
    // Get a single deployment by name
    if (deployments.length > 0) {
      const deploymentName = deployments[0].name;
      console.log(`Get a single deployment named '${deploymentName}':`);
      const singleDeployment = await project.deployments.get(deploymentName);
      console.log(`Retrieved deployment: ${JSON.stringify(singleDeployment, null, 2)}`);
    }
  });

  it("connections", async function () {
    // List the details of all the connections
    const connections: Connection[] = [];
    const connectionNames: string[] = [];
    for await (const connection of project.connections.list()) {
      connections.push(connection);
      connectionNames.push(connection.name);
    }
    console.log(`Retrieved connections: ${connectionNames}`);
    // @ts-preserve-whitespace
    // Get the details of a connection, without credentials
    const connectionName = connections[0].name;
    const connection = await project.connections.get(connectionName);
    console.log(`Retrieved connection ${JSON.stringify(connection, null, 2)}`);
    // @ts-preserve-whitespace
    const connectionWithCredentials = await project.connections.getWithCredentials(connectionName);
    console.log(
      `Retrieved connection with credentials ${JSON.stringify(connectionWithCredentials, null, 2)}`,
    );
    // @ts-preserve-whitespace
    // List all connections of a specific type
    const azureAIConnections: Connection[] = [];
    for await (const azureOpenAIConnection of project.connections.list({
      connectionType: "AzureOpenAI",
      defaultConnection: true,
    })) {
      azureAIConnections.push(azureOpenAIConnection);
    }
    console.log(`Retrieved ${azureAIConnections.length} Azure OpenAI connections`);
    // @ts-preserve-whitespace
    // Get the details of a default connection
    const defaultConnection = await project.connections.getDefault("AzureOpenAI", true);
    console.log(`Retrieved default connection ${JSON.stringify(defaultConnection, null, 2)}`);
  });

  it("datasets", async function () {
    const VERSION1 = "1.0";
    const VERSION2 = "2.0";
    const VERSION3 = "3.0";
    // @ts-preserve-whitespace
    // sample files to use in the demonstration
    const sampleFolder = "sample_folder";

    // Create a unique dataset name for this sample run
    const datasetName = `sample-dataset-basic`;

    console.log("Upload a single file and create a new Dataset to reference the file.");
    console.log("Here we explicitly specify the dataset version.");
    // @ts-preserve-whitespace
    const dataset1 = await project.datasets.uploadFile(
      datasetName,
      VERSION1,
      path.join(__dirname, sampleFolder, "sample_file1.txt"),
    );
    console.log("Dataset1 created:", JSON.stringify(dataset1, null, 2));
    // @ts-preserve-whitespace
    const credential = project.datasets.getCredentials(dataset1.name, dataset1.version, {});
    console.log("Credential for the dataset:", credential);

    console.log(
      "Upload all files in a folder (including subfolders) to the existing Dataset to reference the folder.",
    );
    console.log("Here again we explicitly specify a new dataset version");

    const dataset2 = await project.datasets.uploadFolder(
      datasetName,
      VERSION2,
      path.join(__dirname, sampleFolder),
    );
    console.log("Dataset2 created:", JSON.stringify(dataset2, null, 2));

    console.log(
      "Upload a single file to the existing dataset, while letting the service increment the version",
    );
    const dataset3 = await project.datasets.uploadFile(
      datasetName,
      VERSION3,
      path.join(__dirname, sampleFolder, "sample_file2.txt"),
    );
    console.log("Dataset3 created:", JSON.stringify(dataset3, null, 2));

    // @ts-preserve-whitespace
    console.log("Get an existing Dataset version `1`:");
    const datasetVersion1 = await project.datasets.get(datasetName, VERSION1);
    console.log("Dataset version 1:", JSON.stringify(datasetVersion1, null, 2));

    console.log(`Listing all versions of the Dataset named '${datasetName}':`);
    const datasetVersions = await project.datasets.listVersions(datasetName);
    for await (const version of datasetVersions) {
      console.log("List versions:", version);
    }

    console.log("List latest versions of all Datasets:");
    const latestDatasets = project.datasets.list();
    for await (const dataset of latestDatasets) {
      console.log("List datasets:", dataset);
    }

    // List the details of all the datasets
    const datasets = project.datasets.listVersions(datasetName);
    const allDatasets: DatasetVersionUnion[] = [];
    for await (const dataset of datasets) {
      allDatasets.push(dataset);
    }
    console.log(`Retrieved ${allDatasets.length} datasets`);

    console.log("Delete all Datasets created above:");
    await project.datasets.delete(datasetName, VERSION1);
    await project.datasets.delete(datasetName, VERSION2);
    await project.datasets.delete(datasetName, dataset3.version);
    console.log("All specified Datasets have been deleted.");
  });

  it("indexes", async function () {
    const indexName = "sample-index";
    const version = "1";
    const azureAIConnectionConfig: AzureAISearchIndex = {
      name: indexName,
      type: "AzureSearch",
      version,
      indexName,
      connectionName: "sample-connection",
    };
    // @ts-preserve-whitespace
    // Create a new Index
    const newIndex = await project.indexes.createOrUpdate(
      indexName,
      version,
      azureAIConnectionConfig,
    );
    console.log("Created a new Index:", newIndex);
    console.log(`Get an existing Index version '${version}':`);
    const index = await project.indexes.get(indexName, version);
    console.log(index);

    console.log(`Listing all versions of the Index named '${indexName}':`);
    const indexVersions = project.indexes.listVersions(indexName);
    for await (const indexVersion of indexVersions) {
      console.log(indexVersion);
    }

    console.log("List all Indexes:");
    const allIndexes = project.indexes.list();
    for await (const i of allIndexes) {
      console.log("Index:", i);
    }

    console.log("Delete the Index versions created above:");
    await project.indexes.delete(indexName, version);
  });

  it("datasetUpload", async function () {
    const dataset: DatasetVersion = await project.datasets.uploadFile(
      "jss-eval-sample-dataset",
      "1",
      "./samples_folder/sample_data_evaluation.jsonl",
    );
  });

  it("getDefault", async function () {
    const defaultConnection = await project.connections.getDefault("AzureOpenAI");
  });

  it("exceptions", async function () {
    try {
      const result = await project.connections.list();
    } catch (e) {
      if (isRestError(e)) {
        console.log(`Status code: ${e.code}`);
        console.log(e.message);
      } else {
        console.error(e);
      }
    }
  });
});
