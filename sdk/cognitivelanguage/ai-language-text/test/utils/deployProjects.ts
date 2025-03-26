// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerClient } from "@azure/storage-blob";
import { BlobServiceClient } from "@azure/storage-blob";
import type { TokenCredential } from "@azure/core-auth";
import {
  type Client,
  createRestError,
  getClient,
  type PathUncheckedResponse,
} from "@azure-rest/core-client";
import { delay } from "@azure/core-util";
import * as unzipper from "unzipper";
import { readdir, readFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const Projects = {
  CustomSingleLabelClassification: "singleLabelClassification",
  CustomMultiLabelClassification: "multiLabelClassification",
  CustomEntityRecognition: "entityRecognition",
};
const projectPath = path.join(__dirname, "project");

type ProjectKind = keyof typeof Projects;

async function getProject(project: ProjectKind): Promise<Record<string, any>> {
  return JSON.parse(await readFile(path.join(projectPath, `${Projects[project]}.json`), "utf-8"));
}

const storageInputContainerName = "documents";
const language = "en-us";
const languageAPIVersion = "2024-11-15-preview";
const modelLabel = "projectModel";

async function uploadDocumentsToStorage(
  dirName: string,
  containerClient: ContainerClient,
): Promise<void> {
  const fileNames = await readdir(dirName);
  for (const file of fileNames) {
    if (file.endsWith(".txt")) {
      const blob = containerClient.getBlockBlobClient(file);
      const filePath = path.join(dirName, file);
      await blob.uploadFile(filePath);
    }
  }
  rm(dirName, { recursive: true, force: true });
}

function getFileName(projectKind: ProjectKind): string {
  switch (projectKind) {
    case "CustomSingleLabelClassification":
      return "WebOfScience";
    case "CustomMultiLabelClassification":
      return "MoviesSummary";
    case "CustomEntityRecognition":
      return "LoanAgreements";
  }
}

async function getAssetsforProject(projectKind: ProjectKind): Promise<{
  assets: Record<string, any>;
  fileName: string;
}> {
  return { assets: await getProject(projectKind), fileName: getFileName(projectKind) };
}

async function poll(
  response: PathUncheckedResponse,
  client: Client,
): Promise<PathUncheckedResponse> {
  const pollingUrl = response.headers["operation-location"];
  if (!pollingUrl) {
    throw new Error("Polling URL not found");
  }
  while (true) {
    const res = await client.pathUnchecked(pollingUrl).get();
    if (Number.parseInt(res.status) >= 400) {
      throw createRestError(res);
    }
    const status = res.body?.status;
    if (status === "succeeded") {
      return res;
    }
    if (status === "failed") {
      throw new Error(`Operation failed: ${JSON.stringify(res.body, null, 2)}`);
    }
    await delay(30000);
  }
}

async function processResponse(response: PathUncheckedResponse, client: Client): Promise<void> {
  if (Number.parseInt(response.status) >= 400) {
    throw createRestError(response);
  } else {
    await poll(response, client);
  }
}

export async function deployProject(
  client: Client,
  containerClient: ContainerClient,
  projectKind: ProjectKind,
  projectName: string,
  deploymentName: string,
): Promise<void> {
  const basePath = `/authoring/analyze-text/projects/${projectName}`;

  const projectMetadata = await client.path(basePath).get();
  if (Number.parseInt(projectMetadata.status) >= 400) {
    const { assets, fileName } = await getAssetsforProject(projectKind);
    const dirName = path.join(projectPath, fileName);
    const stream = await unzipper.Open.file(dirName.concat(".zip"));
    await stream.extract({ path: projectPath });
    await uploadDocumentsToStorage(dirName, containerClient);
    const importTask = await client.pathUnchecked(`${basePath}/:import`).post({
      body: {
        metadata: {
          projectKind,
          storageInputContainerName,
          projectName,
          language,
          multilingual: false,
          settings: {},
        },
        projectFileVersion: languageAPIVersion,
        stringIndexType: "Utf16CodeUnit",
        assets,
      },
    });
    await processResponse(importTask, client);
  }

  const modelMetadata = await client.pathUnchecked(`${basePath}/models/${modelLabel}`).get();
  if (Number.parseInt(modelMetadata.status) >= 400) {
    const trainTask = await client.path(`${basePath}/:train`).post({
      body: {
        modelLabel,
        evaluationOptions: {
          kind: "percentage",
          testingSplitPercentage: 30,
          trainingSplitPercentage: 70,
        },
      } as any,
    });
    await processResponse(trainTask, client);
  }

  const deployMetadata = await client
    .pathUnchecked(`${basePath}/deployments/${deploymentName}`)
    .get();
  if (Number.parseInt(deployMetadata.status) >= 400) {
    const deployTask = await client.pathUnchecked(`${basePath}/deployments/${deploymentName}`).put({
      body: {
        trainedModelLabel: modelLabel,
      },
    });
    await processResponse(deployTask, client);
  }
}

export interface Output {
  deploymentName: string;
  projectName: string;
}

export async function deployProjects(
  languageEndpoint: string,
  storageEndpoint: string,
  cred: TokenCredential,
): Promise<{
  singleLabelClassification: Output;
  multiLabelClassification: Output;
  entityRecognition: Output;
}> {
  const client = getClient(languageEndpoint + "/language", cred, {
    apiVersion: "2023-04-01",
    credentials: {
      scopes: ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: "Ocp-Apim-Subscription-Key",
    },
  });
  const containerClient = new BlobServiceClient(storageEndpoint, cred).getContainerClient(
    storageInputContainerName,
  );
  const singleLabelClassification: Output = {
    projectName: "WebOfScience",
    deploymentName: "WebOfScienceDeployment",
  };
  const multiLabelClassification: Output = {
    projectName: "MoviesSummary",
    deploymentName: "MoviesSummaryDeployment",
  };
  const entityRecognition: Output = {
    projectName: "LoanAgreements",
    deploymentName: "LoanAgreementsDeployment",
  };
  await Promise.all([
    deployProject(
      client,
      containerClient,
      "CustomSingleLabelClassification",
      singleLabelClassification.projectName,
      singleLabelClassification.deploymentName,
    ),
    deployProject(
      client,
      containerClient,
      "CustomMultiLabelClassification",
      multiLabelClassification.projectName,
      multiLabelClassification.deploymentName,
    ),
    deployProject(
      client,
      containerClient,
      "CustomEntityRecognition",
      entityRecognition.projectName,
      entityRecognition.deploymentName,
    ),
  ]);
  return {
    singleLabelClassification,
    multiLabelClassification,
    entityRecognition,
  };
}
