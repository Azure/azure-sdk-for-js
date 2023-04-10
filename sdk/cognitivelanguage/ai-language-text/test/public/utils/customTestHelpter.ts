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
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
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

let dir: string;
const pathName = path.join(
  __dirname.split("ai-language-text")[0],
  "ai-language-text",
  "test",
  "public",
  "utils"
);
const storageInputContainerName = "documents";
const language = "en-us";
const trainingConfigVersion = "2022-05-01";
const modelLabel = "projectModel";
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
const deployParam: TextAnalysisAuthoringDeployProjectParameters = {
  body: {
    trainedModelLabel: modelLabel,
  },
};

async function createStorageBlob(): Promise<ContainerClient> {
  /* Return a container client */
  const defaultAzureCredential = new DefaultAzureCredential();
  // Get documents containers
  const blobServiceClient = new BlobServiceClient(
    assertEnvironmentVariable("STORAGE_ENDPOINT"),
    defaultAzureCredential
  );
  return blobServiceClient.getContainerClient(storageInputContainerName);
}

async function uploadDocumentsToStorage(dirName: string): Promise<void> {
  const fileNames = await readdir(dirName);
  const client = await createStorageBlob();
  for (const file of fileNames) {
    if (file.endsWith(".txt")) {
      const blob = client.getBlockBlobClient(file);
      const filePath = path.join(dirName, file);
      await blob.uploadFile(filePath);
    }
  }
}

async function getAssetsforProject(
  projectKind:
    | "CustomEntityRecognition"
    | "CustomSingleLabelClassification"
    | "CustomMultiLabelClassification"
): Promise<
  | ExportedCustomSingleLabelClassificationProjectAssets
  | ExportedCustomMultiLabelClassificationProjectAssets
  | ExportedCustomEntityRecognitionProjectAssets
> {
  let assets:
    | ExportedCustomSingleLabelClassificationProjectAssets
    | ExportedCustomMultiLabelClassificationProjectAssets
    | ExportedCustomEntityRecognitionProjectAssets;
  let files: string;
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

  dir = path.join(pathName, files);
  return assets;
}

async function polling(client: TextAuthoringClient, project: any) {
  const poller = getLongRunningPoller(client, project);
  await poller.pollUntilDone();
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
  const assets = await getAssetsforProject(projectKind);
  await decompress(dir.concat(".zip"), pathName);
  await uploadDocumentsToStorage(dir);

  const createProjectOptions: CreateProjectOptions = {
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
        metadata: createProjectOptions,
        projectFileVersion: "2022-05-01",
        stringIndexType: "Utf16CodeUnit",
        assets,
      },
    });
  await polling(client, importTask);
  logger.info("Project created", projectName);

  // Start training
  const trainTask = await client
    .path("/authoring/analyze-text/projects/{projectName}/:train", projectName)
    .post(trainParam);
  await polling(client, trainTask);
  logger.info("Training finished");

  // Deploy model
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
  const deleteTask = await client
    .path("/authoring/analyze-text/projects/{projectName}", projectName)
    .delete();
  await polling(client, deleteTask);
  rm(dir, { recursive: true, force: true });
}
