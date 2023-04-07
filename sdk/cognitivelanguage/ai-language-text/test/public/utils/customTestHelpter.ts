// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  TextAnalysisAuthoringDeployProjectParameters,
  TextAnalysisAuthoringTrainBodyParam,
  getLongRunningPoller,
  CreateProjectOptions,
  TextAuthoringClient,
  ExportedCustomSingleLabelClassificationProjectAssets,
  ExportedCustomMultiLabelClassificationProjectAssets,
  ExportedCustomEntityRecognitionProjectAssets,
} from "@azure/ai-language-textauthoring";
import { BlobServiceClient, ContainerClient, RestError } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import path from "path";
import decompress from "decompress";
import {
  customEntityAssets,
  customMultiLabelAssets,
  customSingleLabelAssets,
} from "../customTestsAssets";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { logger } from "../../../src/logger";
import { readdir, rm } from "fs/promises";

let files: string;
const storageInputContainerName = "documents";
const language = "en-us";
const trainingConfigVersion = "2022-05-01";
async function createStorageBlob(): Promise<ContainerClient> {
  /* Return a container client */
  const defaultAzureCredential = new DefaultAzureCredential();
  // Get documents containers
  const blobServiceClient = new BlobServiceClient(
    assertEnvironmentVariable("STORAGE_ENDPOINT") || "string",
    defaultAzureCredential
  );
  return blobServiceClient.getContainerClient(storageInputContainerName);
}

async function uploadDocuments(fileName: string): Promise<void> {
  // Unpack zip files and upload to blob
  const pathName = path.join(
    __dirname.split("ai-language-text")[0],
    "ai-language-text",
    "test",
    "public",
    "utils"
  );
  await decompress(path.join(pathName, `${fileName}.zip`), pathName);
  const dir = path.join(pathName, fileName);
  const fileNames = await readdir(dir);

  const client = await createStorageBlob();
  for (const file of fileNames) {
    if (file.endsWith(".txt")) {
      const blob = client.getBlockBlobClient(file);
      const filePath = path.join(dir, file);
      await blob.uploadFile(filePath);
    }
  }
}

async function polling(client: TextAuthoringClient, project: any) {
  try {
    const poller = getLongRunningPoller(client, project);
    await poller.pollUntilDone();
  } catch (error) {
    logger.info("Error encountered", error);
    throw new RestError(`Poller encountered error here ${error}`);
  }
}

export async function createCustomTestProject(
  client: TextAuthoringClient,
  projectKind:
    | "CustomEntityRecognition"
    | "CustomSingleLabelClassification"
    | "CustomMultiLabelClassification",
  projectName: string,
  deploymentName: string
): Promise<void> {
  let assets:
    | ExportedCustomSingleLabelClassificationProjectAssets
    | ExportedCustomMultiLabelClassificationProjectAssets
    | ExportedCustomEntityRecognitionProjectAssets;
  switch (projectKind) {
    case "CustomSingleLabelClassification":
      assets = customSingleLabelAssets;
      files = "WebOfScience";
      break;

    case "CustomMultiLabelClassification":
      assets = customMultiLabelAssets;
      files = "MoviesSummary";
      break;

    case "CustomEntityRecognition":
      assets = customEntityAssets;
      files = "LoanAgreements";
      break;
  }
  const modelLabel = "projectModel";
  await uploadDocuments(files);
  logger.info("Finish uploading documents to storage");

  const options: CreateProjectOptions = {
    projectKind,
    storageInputContainerName,
    projectName,
    language,
    multilingual: false,
    settings: {},
  };

  // Create a project
  const importTask = await client
    .path("/authoring/analyze-text/projects/{projectName}/:import", projectName)
    .post({
      body: {
        metadata: options,
        projectFileVersion: "2022-05-01",
        stringIndexType: "Utf16CodeUnit",
        assets,
      },
    });
  await polling(client, importTask);
  logger.info("Project created", projectName);

  // Start training
  const trainParam: TextAnalysisAuthoringTrainBodyParam = {
    body: {
      modelLabel,
      trainingConfigVersion,
      evaluationOptions: {
        kind: "percentage",
        testingSplitPercentage: 30,
        trainingSplitPercentage: 70,
      },
    },
  };
  const trainTask = await client
    .path("/authoring/analyze-text/projects/{projectName}/:train", projectName)
    .post(trainParam);
  await polling(client, trainTask);
  logger.info("Training finished");

  // Deploy model
  const deployParam: TextAnalysisAuthoringDeployProjectParameters = {
    body: {
      trainedModelLabel: modelLabel,
    },
  };
  const deployTask = await client
    .path(
      "/authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}",
      projectName,
      deploymentName
    )
    .put(deployParam);
  await polling(client, deployTask);
  logger.info("Model deployment finished");
}

export async function cleanupCustomTestResource(
  client: TextAuthoringClient,
  projectName: string
): Promise<void> {
  // Delete project
  const deleteTask = await client
    .path("/authoring/analyze-text/projects/{projectName}", projectName)
    .delete();
  await polling(client, deleteTask);
  // Remove folder
  const pathName = path.join(
    __dirname.split("ai-language-text")[0],
    "ai-language-text",
    "test",
    "public",
    "utils"
  );

  const dir = path.join(pathName, files);
  rm(dir, { recursive: true, force: true });
}
