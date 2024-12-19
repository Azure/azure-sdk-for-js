// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  TextAnalysisAuthoringDeployProjectParameters,
  TextAnalysisAuthoringTrainBodyParam,
  CreateProjectOptions,
  TextAuthoringClient,
  ExportedCustomSingleLabelClassificationProjectAssets,
  ExportedCustomMultiLabelClassificationProjectAssets,
  ExportedCustomEntityRecognitionProjectAssets,
} from "@azure/ai-language-textauthoring";
import { getLongRunningPoller } from "@azure/ai-language-textauthoring";
import type { ContainerClient } from "@azure/storage-blob";
import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import path from "node:path";
import * as unzipper from "unzipper";
import {
  customEntityAssets,
  customMultiLabelAssets,
  customSingleLabelAssets,
} from "../customTestsAssets.js";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { readdir, rm } from "node:fs/promises";
import { pathName } from "./pathUtils.js";

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
  const defaultAzureCredential = new DefaultAzureCredential();
  // Get documents containers
  const blobServiceClient = new BlobServiceClient(
    assertEnvironmentVariable("STORAGE_ENDPOINT"),
    defaultAzureCredential,
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

async function polling(client: TextAuthoringClient, project: any): Promise<void> {
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
  const stream = await unzipper.Open.file(dirName.concat(".zip"));
  await stream.extract({ path: pathName });
  return;

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
