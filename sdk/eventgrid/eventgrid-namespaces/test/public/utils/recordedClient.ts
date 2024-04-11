// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Test } from "mocha";

import {
  assertEnvironmentVariable,
  Recorder,
  RecorderStartOptions,
} from "@azure-tools/test-recorder";

import { EventGridClient as EventGridNamespacesClient } from "../../../src";
import { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import { ClientSecretCredential } from "@azure/identity";
import { AdditionalPolicyConfig } from "@azure/core-client";

export interface RecordedV2Client {
  client: EventGridNamespacesClient;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  EVENT_GRID_NAMESPACES_ENDPOINT: "https://endpoint",
  EVENT_GRID_NAMESPACES_KEY: "api_key",
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export async function createRecordedClient(
  currentTest: Test | undefined,
  endpointEnv: string,
  apiKeyEnv: string,
  azureKeyCredentialMode: boolean = true,
  options: {
    additionalPolicies?: AdditionalPolicyConfig[];
  } = {},
): Promise<RecordedV2Client> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderOptions);

  if (azureKeyCredentialMode) {
    return {
      client: new EventGridNamespacesClient(
        assertEnvironmentVariable(endpointEnv),
        new AzureKeyCredential(assertEnvironmentVariable(apiKeyEnv)),
        recorder.configureClientOptions({
          additionalPolicies: options.additionalPolicies,
        }),
      ),
      recorder,
    };
  } else {
    const tokenCredential: TokenCredential = new ClientSecretCredential(
      assertEnvironmentVariable("AZURE_TENANT_ID"),
      assertEnvironmentVariable("AZURE_CLIENT_ID"),
      assertEnvironmentVariable("AZURE_CLIENT_SECRET"),
    );
    return {
      client: new EventGridNamespacesClient(
        assertEnvironmentVariable(endpointEnv),
        tokenCredential,
        recorder.configureClientOptions({
          additionalPolicies: options.additionalPolicies,
        }),
      ),
      recorder,
    };
  }
}
