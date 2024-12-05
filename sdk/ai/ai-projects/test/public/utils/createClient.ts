// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Recorder,
  RecorderStartOptions,
  VitestTestContext,
} from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { AIProjectsClient } from "../../../src/index.js";
import { ClientOptions } from "@azure-rest/core-client";
import { createHttpHeaders, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";

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
  AZURE_AI_PROJECTS_CONNECTION_STRING: `Sanitized.api.azureml.ms;00000000-0000-0000-0000-000000000000;00000;00000`
};

const recorderEnvSetup: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  sanitizerOptions: {
    generalSanitizers: [
      { regex: true, target: "(%2F|/)?subscriptions(%2F|/)([-\\w\\._\\(\\)]+)", value: replaceableVariables.SUBSCRIPTION_ID, groupForReplace: "3" },
      { regex: true, target: "(%2F|/)?resource[gG]roups(%2F|/)([-\\w\\._\\(\\)]+)", value: replaceableVariables.RESOURCE_GROUP_NAME, groupForReplace: "3"  },
      { regex: true, target: "/workspaces/([-\\w\\._\\(\\)]+)", value: replaceableVariables.WORKSPACE_NAME, groupForReplace: "1"  },
      { regex: true, target: "/userAssignedIdentities/([-\\w\\._\\(\\)]+)", value: replaceableVariables.GENERIC_STRING, groupForReplace: "1"  },
      { regex: true, target: "/components/([-\\w\\._\\(\\)]+)", value: replaceableVariables.GENERIC_STRING, groupForReplace: "1"  }, 
      { regex: true, target: "/vaults/([-\\w\\._\\(\\)]+)", value: replaceableVariables.GENERIC_STRING, groupForReplace: "1"  },
      { regex: true, target: "(azureml|http|https):\\/\\/([^\\/]+)", value: replaceableVariables.ENDPOINT, groupForReplace: "2"  },
    ],
    bodyKeySanitizers: [
      { jsonPath: "properties.ConnectionString", value: "InstrumentationKey=00000000-0000-0000-0000-000000000000;IngestionEndpoint=https://region.applicationinsights.azure.com/;LiveEndpoint=https://region.livediagnostics.monitor.azure.com/;ApplicationId=00000000-0000-0000-0000-000000000000"},
      { jsonPath: "properties.credentials.key", value: replaceableVariables.API_KEY },
    ]
  },
  removeCentralSanitizers: ["AZSDK3430", "AZSDK3493"]
};

/**
 * creates the recorder and reads the environment variables from the `.env` file.
 * Should be called first in the test suite to make sure environment variables are
 * read before they are being used.
 */
export async function createRecorder(
  context: VitestTestContext,
): Promise<Recorder> {
  const recorder = new Recorder(context);
  await recorder.start(recorderEnvSetup);
  return recorder;
}

export function createProjectsClient(
  recorder?: Recorder,
  options?: ClientOptions,
): AIProjectsClient {
  const credential = createTestCredential();
  const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "";
  return AIProjectsClient.fromConnectionString(
    connectionString,
    credential,
    recorder ? recorder.configureClientOptions(options ?? {}) : options
  );
}

export function createMockProjectsClient(responseFn: (request:PipelineRequest) => Partial<PipelineResponse>): AIProjectsClient {
  const options: ClientOptions = { additionalPolicies: [] };
        options.additionalPolicies?.push({
            policy: {
                name: "RequestMockPolicy",
                sendRequest:(async (req) => {
                  const response = responseFn(req);
                  return { headers: createHttpHeaders(), status: 200, request: req, ...response } as PipelineResponse;
                })
            },
            position: "perCall"
        });
  const credential = createTestCredential();
  const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "";
  return AIProjectsClient.fromConnectionString(connectionString, credential, options);
}
