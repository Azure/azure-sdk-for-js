// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient, type Client, type PathUncheckedResponse } from "@azure-rest/core-client";
import type { KeyCredential, TokenCredential } from "@azure/core-auth";
import { delay } from "@azure/core-util";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "url";
import path from "node:path";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const modelLabel = "projectModel";
const Projects = {
  Conversation: "CLUScriptDeployed",
  Orchestration: "OrchestrationScriptDeployed",
  QnA: "QnaScriptDeployed",
};
const projectPath = path.join(__dirname, "project");

type ProjectKind = keyof typeof Projects;

async function getProject(project: ProjectKind): Promise<Record<string, any>> {
  return JSON.parse(await readFile(path.join(projectPath, `${Projects[project]}.json`), "utf-8"));
}

function buildRequestBasePath(type: ProjectKind): string {
  return type === "QnA" ? "/query-knowledgebases" : "/authoring/analyze-conversations";
}

function createRestError(response: PathUncheckedResponse): Error {
  return new Error(`HTTP ${response.status}: ${JSON.stringify(response.body, null, 2)}`);
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
  type: ProjectKind,
  authoringClient: Client,
  inputs: {
    deploymentName?: string;
  } = {},
): Promise<{
  deploymentName: string;
  projectName: string;
}> {
  const project = await getProject(type);
  const projectName: string | undefined =
    project?.metadata?.projectName || project?.Metadata?.ProjectName;
  if (!projectName) {
    throw new Error("Project name not found");
  }
  const { deploymentName = "production" } = inputs;
  const basePath = `${buildRequestBasePath(type)}/projects/${projectName}`;
  const projectMetadata = await authoringClient.path(`${basePath}`).get();
  if (Number.parseInt(projectMetadata.status) >= 400) {
    const importTask = await authoringClient.pathUnchecked(`${basePath}/:import`).post({
      body: project,
      ...(type === "QnA" ? { queryParameters: { format: "json" } } : {}),
    });
    await processResponse(importTask, authoringClient);
  }
  if (type !== "QnA") {
    const modelMetadata = await authoringClient.path(`${basePath}/models/${modelLabel}`).get();
    if (Number.parseInt(modelMetadata.status) >= 400) {
      const trainTask = await authoringClient.pathUnchecked(`${basePath}/:train`).post({
        body: {
          trainingMode: "standard",
          modelLabel,
          evaluationOptions: {
            kind: "percentage",
            testingSplitPercentage: 30,
            trainingSplitPercentage: 70,
          },
        },
      });
      await processResponse(trainTask, authoringClient);
    }
  }
  const deploymentMetadata = await authoringClient
    .path(`${basePath}/deployments/${deploymentName}`)
    .get();
  if (Number.parseInt(deploymentMetadata.status) >= 400) {
    const deployTask = await authoringClient.path(`${basePath}/deployments/${deploymentName}`).put({
      ...(type !== "QnA"
        ? {
            body: {
              trainedModelLabel: modelLabel,
            },
          }
        : {}),
    });
    await processResponse(deployTask, authoringClient);
  }
  return {
    deploymentName,
    projectName,
  };
}

export interface Output {
  deploymentName: string;
  projectName: string;
}

export async function deployProjects(
  endpoint: string,
  cred: TokenCredential | KeyCredential,
): Promise<{
  conversation: Output;
  qna: Output;
  orchestration: Output;
}> {
  const authoringClient = getClient(endpoint + "/language", cred, {
    apiVersion: "2023-04-01",
    credentials: {
      scopes: ["https://cognitiveservices.azure.com/.default"],
      apiKeyHeaderName: "Ocp-Apim-Subscription-Key",
    },
  });
  const { deploymentName: convDeploymentName, projectName: convProjectName } = await deployProject(
    "Conversation",
    authoringClient,
    { deploymentName: "production" },
  );
  const { deploymentName: qnaDeploymentName, projectName: qnaProjectName } = await deployProject(
    "QnA",
    authoringClient,
  );
  const { deploymentName: orchDeploymentName, projectName: orchProjectName } = await deployProject(
    "Orchestration",
    authoringClient,
    { deploymentName: "staging" },
  );
  return {
    conversation: {
      deploymentName: convDeploymentName,

      projectName: convProjectName,
    },
    qna: {
      deploymentName: qnaDeploymentName,
      projectName: qnaProjectName,
    },
    orchestration: {
      deploymentName: orchDeploymentName,
      projectName: orchProjectName,
    },
  };
}
