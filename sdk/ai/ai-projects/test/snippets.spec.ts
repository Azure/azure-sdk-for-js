// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VitestTestContext } from "@azure-tools/test-recorder";
import { AIProjectClient, DatasetVersion } from "../src/index.js";
import type {
  AzureAISearchIndex,
  Connection,
  DatasetVersionUnion,
  ModelDeployment,
} from "../src/index.js";
import { isRestError } from "@azure/core-rest-pipeline";
import { createProjectsClient } from "./public/utils/createClient.js";
import { DefaultAzureCredential } from "@azure/identity";
import { beforeEach, it, describe } from "vitest";
import { RestError } from "@azure/core-rest-pipeline";
import * as path from "path";
import * as fs from "fs";

describe("snippets", function () {
  let project: AIProjectClient;
  let deploymentName: string = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
  const filePath = "";

  beforeEach(async function (context: VitestTestContext) {
    project = createProjectsClient();
  });

  it("setup", async function () {
    const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";
    const client = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  });

  it("openAI", async function () {
    const openAIClient = await project.getOpenAIClient();
    const response = await openAIClient.responses.create({
      model: deploymentName,
      input: "What is the size of France in square miles?",
    });
    console.log("response = ", JSON.stringify(response, null, 2));
  });

  it("agents", async function () {
    const openAIClient = await project.getOpenAIClient();
    const agent = await project.agents.createVersion("my-agent-basic", {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant that answers general questions",
    });
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);
    const conversation = await openAIClient.conversations.create({
      items: [
        { type: "message", role: "user", content: "What is the size of France in square miles?" },
      ],
    });
    console.log(`Created conversation with initial user message (id: ${conversation.id})`);

    // Generate response using the agent
    console.log("\nGenerating response...");
    const response = await openAIClient.responses.create(
      {
        conversation: conversation.id,
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    console.log(`Response output: ${response.output_text}`);

    // Add a second user message to the conversation
    console.log("\nAdding a second user message to the conversation...");
    await openAIClient.conversations.items.create(conversation.id, {
      items: [{ type: "message", role: "user", content: "And what is the capital city?" }],
    });
    console.log("Added a second user message to the conversation");

    // Generate second response
    console.log("\nGenerating second response...");
    const response2 = await openAIClient.responses.create(
      {
        conversation: conversation.id,
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    console.log(`Response output: ${response2.output_text}`);

    // Clean up
    console.log("\nCleaning up resources...");
    await openAIClient.conversations.delete(conversation.id);
    console.log("Conversation deleted");

    await project.agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
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

  it("files", async function () {
    const openAIClient = await project.getOpenAIClient();
    console.log("Uploading file");
    const created = await openAIClient.files.create({
      file: fs.createReadStream(filePath),
      purpose: "fine-tune",
    });
    console.log(`Uploaded file with ID: ${created.id}`);
    const uploadedFile = await openAIClient.files.retrieve(created.id);
    console.log("Processed file metadata:\n", JSON.stringify(uploadedFile, null, 2));

    console.log(`Retrieving file content with ID: ${uploadedFile.id}`);
    const contentResponse = await openAIClient.files.content(uploadedFile.id);
    const buf = Buffer.from(await contentResponse.arrayBuffer());
    console.log(buf.toString("utf-8"));

    // 4) List all files
    console.log("Listing all files:");
    const filesList = await openAIClient.files.list();
    for (const f of filesList.data ?? []) {
      console.log(JSON.stringify(f));
    }

    // 5) Delete the file
    console.log(`Deleting file with ID: ${uploadedFile.id}`);
    const deleted = await openAIClient.files.delete(uploadedFile.id);
    console.log(
      `Successfully deleted file: ${deleted?.id || uploadedFile.id}, deleted=${String(
        deleted?.deleted ?? true,
      )}`,
    );
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
