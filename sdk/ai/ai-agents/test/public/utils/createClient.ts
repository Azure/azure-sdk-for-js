// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RecorderStartOptions, VitestTestContext } from "@azure-tools/test-recorder";
import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { AgentsClient } from "../../../src/index.js";
import type { ClientOptions } from "@azure-rest/core-client";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";

const replaceableVariables: Record<string, string> = {
  GENERIC_STRING: "Sanitized",
  ENDPOINT: "Sanitized.azure.com",
  SUBSCRIPTION_ID: "00000000-0000-0000-0000-000000000000",
  RESOURCE_GROUP_NAME: "00000",
  WORKSPACE_NAME: "00000",
  DATASET_NAME: "00000",
  TENANT_ID: "00000000-0000-0000-0000-000000000000",
  USER_OBJECT_ID: "00000000-0000-0000-0000-000000000000",
  API_KEY: "00000000000000000000000000000000000000000000000000000000000000000000",
  PROJECT_NAME: "00000",
  AZURE_BING_CONNECTION_ID: "00000000-0000-0000-0000-000000000000",
  PROJECT_ENDPOINT: `https://Sanitized.azure.com/api/projects/00000`,
  MCP_SERVER_URL: "https://Sanitized.azure.com/Azure/azure-rest-api-specs",
  MCP_SERVER_LABEL: "github",
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
      {
        regex: true,
        target: "/projects/([-\\w\\._\\(\\)]+)(?=/|$)",
        value: replaceableVariables.PROJECT_NAME,
        groupForReplace: "1",
      },
    ],
    bodyKeySanitizers: [
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
  return recorder;
}

export function createProjectsClient(recorder?: Recorder, options?: ClientOptions): AgentsClient {
  const credential = createTestCredential();
  const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "";
  return new AgentsClient(
    projectEndpoint,
    credential,
    recorder ? recorder.configureClientOptions(options ?? {}) : options,
  );
}

export function createMockProjectsClient(
  responseFn: (request: PipelineRequest) => Partial<PipelineResponse>,
): AgentsClient {
  const options: ClientOptions = { additionalPolicies: [] };
  options.additionalPolicies?.push({
    policy: {
      name: "RequestMockPolicy",
      sendRequest: async (req) => {
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
  const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "";
  return new AgentsClient(projectEndpoint, credential, options);
}
