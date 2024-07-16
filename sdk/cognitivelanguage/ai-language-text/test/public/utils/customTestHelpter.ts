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
import { readdir, rm } from "fs/promises";
import { createTestCredential } from "@azure-tools/test-credential";

const pathName = path.join(
  __dirname.split("ai-language-text")[0],
  "ai-language-text",
  "test",
  "public",
  "utils",
);
const storageInputContainerName = "documents";
const language = "en-us";
const languageAPIVersion = "2022-05-01";
const modelLabel = "projectModel";
const trainParam: TextAnalysisAuthoringTrainBodyParam = {
  body: {
    modelLabel,
    trainingConfigVersion: languageAPIVersion,
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
  const tokenCredential = createTestCredential();
  // Get documents containers
  const blobServiceClient = new BlobServiceClient(
    assertEnvironmentVariable("STORAGE_ENDPOINT"),
    tokenCredential,
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
  rm(dirName, { recursive: true, force: true });
}

async function getAssetsforProject(
  projectKind:
    | "CustomEntityRecognition"
    | "CustomSingleLabelClassification"
    | "CustomMultiLabelClassification",
): Promise<{
  assets:
    | ExportedCustomSingleLabelClassificationProjectAssets
    | ExportedCustomMultiLabelClassificationProjectAssets
    | ExportedCustomEntityRecognitionProjectAssets;
  fileName: string;
}> {
  switch (projectKind) {
    case "CustomSingleLabelClassification":
      return { assets: customSingleLabelAssets, fileName: "WebOfScience" };

    case "CustomMultiLabelClassification":
      return { assets: customMultiLabelAssets, fileName: "MoviesSummary" };

    case "CustomEntityRecognition":
      return { assets: customEntityAssets, fileName: "LoanAgreements" };
  }
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
  deploymentName: string,
): Promise<void> {
  const { assets, fileName } = await getAssetsforProject(projectKind);
  const dirName = path.join(pathName, fileName);
  await decompress(dirName.concat(".zip"), pathName);
  await uploadDocumentsToStorage(dirName);

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
        projectFileVersion: languageAPIVersion,
        stringIndexType: "Utf16CodeUnit",
        assets,
      },
    });
  await polling(client, importTask);

  // Start training
  const trainTask = await client
    .path("/authoring/analyze-text/projects/{projectName}/:train", projectName)
    .post(trainParam);
  await polling(client, trainTask);

  // Deploy model
  const deployTask = await client
    .path(
      "/authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}",
      projectName,
      deploymentName,
    )
    .put(deployParam);
  await polling(client, deployTask);
}
