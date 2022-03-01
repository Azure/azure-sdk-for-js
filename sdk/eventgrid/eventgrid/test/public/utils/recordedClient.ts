// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Test } from "mocha";

import {
  assertEnvironmentVariable,
  Recorder,
  RecorderStartOptions,
} from "@azure-tools/test-recorder";

import { EventGridPublisherClient, InputSchema } from "../../../src";
import { AzureKeyCredential } from "@azure/core-auth";

export interface RecordedClient<T extends InputSchema> {
  client: EventGridPublisherClient<T>;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  EVENT_GRID_EVENT_GRID_SCHEMA_API_KEY: "api_key",
  EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT: "https://endpoint/api/events",
  EVENT_GRID_CLOUD_EVENT_SCHEMA_API_KEY: "api_key",
  EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT: "https://endpoint/api/events",
  EVENT_GRID_CUSTOM_SCHEMA_API_KEY: "api_key",
  EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT: "https://endpoint/api/events",
};

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export async function createRecordedClient<T extends InputSchema>(
  currentTest: Test | undefined,
  endpointEnv: string,
  eventSchema: T,
  apiKeyEnv: string,
  removeApiEventsSuffixBool: boolean = false
): Promise<RecordedClient<T>> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderOptions);
  return {
    client: new EventGridPublisherClient(
      removeApiEventsSuffixBool
        ? removeApiEventsSuffix(assertEnvironmentVariable(endpointEnv))
        : assertEnvironmentVariable(endpointEnv),
      eventSchema,
      new AzureKeyCredential(assertEnvironmentVariable(apiKeyEnv)),
      recorder.configureClientOptions({})
    ),
    recorder,
  };
}

function removeApiEventsSuffix(endpoint: string): string {
  const suffix = "/api/events";

  if (!endpoint.endsWith(suffix)) {
    throw new Error(`${endpoint} does not end with ${suffix}`);
  }

  return endpoint.substring(0, endpoint.length - suffix.length);
}
