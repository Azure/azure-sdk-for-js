// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { AIProjectClient, AIProjectClientOptionalParams } from "../../../src/index.js";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import OpenAI from "openai";
import { getBearerTokenProvider } from "@azure/identity";

type WaitForJobTarget = "trainingStarted" | "paused" | "running";
interface FineTuningJobStatus {
  status: string;
}
type JobStatusPredicate = (job: FineTuningJobStatus) => Promise<boolean | void>;

const replaceableVariables: Record<string, string> = {
  GENERIC_STRING: "Sanitized",
  ENDPOINT: "Sanitized.azure.com",
  DEPLOYMENT_NAME: "DeepSeek-V3",
  AZURE_AI_PROJECT_ENDPOINT: "https://Sanitized.azure.com/api/projects/test-project",
  PROJECT_ENDPOINT: "https://Sanitized.azure.com/api/projects/test-project",
  OPENAI_PROJECT_ENDPOINT: "https://Sanitized.azure.com/api/projects/test-project/openai",
  AZURE_STORAGE_CONNECTION_NAME: "00000",
  DEPLOYMENT_GPT_MODEL: "gpt-4o",
  EMBEDDING_DEPLOYMENT_NAME: "text-embedding-3-large",
  IMAGE_EMBEDDING_DEPLOYMENT_NAME: "Cohere-embed-v3-english",
  EVALUATION_DEPLOYMENT_NAME: "gpt-4o-mini",
  SUBSCRIPTION_ID: "00000000-0000-0000-0000-000000000000",
  RESOURCE_GROUP_NAME: "00000",
  WORKSPACE_NAME: "00000",
  DATASET_NAME: "00000",
  TENANT_ID: "00000000-0000-0000-0000-000000000000",
  USER_OBJECT_ID: "00000000-0000-0000-0000-000000000000",
  API_KEY: "00000000000000000000000000000000000000000000000000000000000000000000",
  AZURE_AI_PROJECTS_CONNECTION_STRING: `Sanitized.azure.com;00000000-0000-0000-0000-000000000000;00000;00000`,
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  sanitizerOptions: {
    generalSanitizers: [
      {
        regex: true,
        target: "(%2F|/)?subscriptions(%2F|/)([-\\w\\._\\(\\)]+)",
        value: replaceableVariables.SUBSCRIPTION_ID,
        groupForReplace: "3",
      },
      {
        regex: true,
        target: "(%2F|/)?resource[gG]roups(%2F|/)([-\\w\\._\\(\\)]+)",
        value: replaceableVariables.RESOURCE_GROUP_NAME,
        groupForReplace: "3",
      },
      {
        regex: true,
        target: "/workspaces/([-\\w\\._\\(\\)]+)",
        value: replaceableVariables.WORKSPACE_NAME,
        groupForReplace: "1",
      },
      {
        regex: true,
        target: "/userAssignedIdentities/([-\\w\\._\\(\\)]+)",
        value: replaceableVariables.GENERIC_STRING,
        groupForReplace: "1",
      },
      {
        regex: true,
        target: "/components/([-\\w\\._\\(\\)]+)",
        value: replaceableVariables.GENERIC_STRING,
        groupForReplace: "1",
      },
      {
        regex: true,
        target: "/vaults/([-\\w\\._\\(\\)]+)",
        value: replaceableVariables.GENERIC_STRING,
        groupForReplace: "1",
      },
      {
        regex: true,
        target: "(azureml|http|https):\\/\\/([^\\/]+)",
        value: replaceableVariables.ENDPOINT,
        groupForReplace: "2",
      },
    ],
    bodyKeySanitizers: [
      {
        jsonPath: "properties.ConnectionString",
        value:
          "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://region.applicationinsights.azure.com/;LiveEndpoint=https://region.livediagnostics.monitor.azure.com/;ApplicationId=00000000-0000-0000-0000-000000000000",
      },
      { jsonPath: "properties.credentials.key", value: replaceableVariables.API_KEY },
    ],
  },
  removeCentralSanitizers: ["AZSDK3430", "AZSDK3493"],
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(context: VitestTestContext): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  await recorder.addSanitizers(
    {
      uriSanitizers: [
        {
          regex: true,
          target: "(.*)&blockid=(?<block_id_value>.*)",
          groupForReplace: "block_id_value",
          value: "sanitized_blockid",
        },
      ],
    },
    ["record", "playback"],
  );
  return recorder;
}

export async function createOpenAI(): Promise<OpenAI> {
  const credential = createTestCredential();
  const projectEndpoint = process.env["OPENAI_PROJECT_ENDPOINT"] || "";

  const scope = "https://ai.azure.com/.default";
  const azureADTokenProvider = await getBearerTokenProvider(credential, scope);

  return new OpenAI({
    apiKey: azureADTokenProvider,
    baseURL: projectEndpoint,
    defaultQuery: { "api-version": "2025-05-15-preview" },
    defaultHeaders: { "accept-encoding": "deflate" },
    dangerouslyAllowBrowser: true,
  });
}

export async function waitForFoundryOpenAIJob(
  client: OpenAI,
  jobId: string,
  target: WaitForJobTarget,
  {
    timeoutMs = 24 * 60 * 60_000, // 24 hours default; bump higher for busy regions/large jobs
    pollMs = 60_000, // poll every 1 minute
  }: { timeoutMs?: number; pollMs?: number } = {},
): Promise<void> {
  // Target-specific predicates
  const predicates: Record<WaitForJobTarget, JobStatusPredicate> = {
    trainingStarted: async (job) => {
      if (job.status === "trainingStarted") return true;
      return false;
    },
    paused: async (job) => {
      if (job.status === "paused") return true;
      return false;
    },
    running: async (job) => {
      if (job.status === "running") return true;
      return false;
    },
  };
  if (!predicates[target]) {
    throw new Error(
      `Unsupported target '${target}'. Use 'trainingStarted' | 'paused' | 'running'.`,
    );
  }

  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const job = await client.fineTuning.jobs.retrieve(jobId);
    console.log(`[waitForJob] job=${jobId} status=${job.status} target=${target}`);
    if (await predicates[target](job)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }

  throw new Error(
    `Timed out after ${Math.round(timeoutMs / 1000)}s waiting for '${target}' on job ${jobId}.`,
  );
}

export function createProjectsClient(
  recorder?: Recorder,
  options?: AIProjectClientOptionalParams,
): AIProjectClient {
  const credential = createTestCredential();
  const endpoint =
    process.env["PROJECT_ENDPOINT"] || replaceableVariables.AZURE_AI_PROJECT_ENDPOINT;
  return new AIProjectClient(
    endpoint,
    credential,
    recorder ? recorder.configureClientOptions(options ?? {}) : options,
  );
}

export function createMockProjectsClient(
  responseFn: (request: PipelineRequest) => Partial<PipelineResponse>,
): AIProjectClient {
  const options: AIProjectClientOptionalParams = { additionalPolicies: [] };
  options.additionalPolicies?.push({
    policy: {
      name: "RequestMockPolicy",
      sendRequest: async (req: PipelineRequest) => {
        const response = responseFn(req);
        return {
          headers: createHttpHeaders(),
          status: 200,
          request: req,
          ...response,
        } as PipelineResponse;
      },
    },
    position: "perCall",
  });
  const credential = createTestCredential();
  const endpoint = process.env["PROJECT_ENDPOINT"] || "";
  return new AIProjectClient(endpoint, credential, options);
}
