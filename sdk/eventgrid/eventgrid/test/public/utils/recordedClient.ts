// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Test } from "mocha";

import {
  assertEnvironmentVariable,
  Recorder,
  RecorderStartOptions,
} from "@azure-tools/test-recorder";

import { EventGridPublisherClient, InputSchema, EventGridClient } from "../../../src";
import { AzureKeyCredential } from "@azure/core-auth";
import { AdditionalPolicyConfig } from "@azure/core-client";
import { FindReplaceSanitizer } from "@azure-tools/test-recorder/types/src/utils/utils";

export interface RecordedClient<T extends InputSchema> {
  client: EventGridPublisherClient<T>;
  recorder: Recorder;
}

export interface RecordedV2Client {
  client: EventGridClient;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  EVENT_GRID_EVENT_GRID_SCHEMA_API_KEY: "api_key",
  EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT: "https://endpoint/api/events",
  EVENT_GRID_CLOUD_EVENT_SCHEMA_API_KEY: "api_key",
  EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT: "https://endpoint/api/events",
  EVENT_GRID_CUSTOM_SCHEMA_API_KEY: "api_key",
  EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT: "https://endpoint/api/events",
  EVENT_GRID_V2_ENDPOINT: "https://endpoint",
  EVENT_GRID_V2_KEY: "api_key",
};

/**
 * In some tests the endpoints appear without the /api/events suffix
 * so make sure to sanitize them in this case as well (it doesn't get
 * covered automatically by envSetupForPlayback).
 */
const suffixlessEndpointSanitizer = (endpointEnv: string): FindReplaceSanitizer => ({
  target: removeApiEventsSuffix(assertEnvironmentVariable(endpointEnv)),
  value: "https://endpoint",
});

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback,
};

export async function createRecordedClient<T extends InputSchema>(
  currentTest: Test | undefined,
  endpointEnv: string,
  eventSchema: T,
  apiKeyEnv: string,
  options: {
    removeApiEventsSuffixBool?: boolean;
    additionalPolicies?: AdditionalPolicyConfig[];
  } = {}
): Promise<RecordedClient<T>> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderOptions);
  await recorder.addSanitizers({
    generalSanitizers: [
      suffixlessEndpointSanitizer("EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT"),
      suffixlessEndpointSanitizer("EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT"),
      suffixlessEndpointSanitizer("EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT"),
    ],
  });

  return {
    client: new EventGridPublisherClient(
      options.removeApiEventsSuffixBool
        ? removeApiEventsSuffix(assertEnvironmentVariable(endpointEnv))
        : assertEnvironmentVariable(endpointEnv),
      eventSchema,
      new AzureKeyCredential(assertEnvironmentVariable(apiKeyEnv)),
      recorder.configureClientOptions({
        additionalPolicies: options.additionalPolicies,
      })
    ),
    recorder,
  };
}

export async function createRecordedV2Client(
  currentTest: Test | undefined,
  endpointEnv: string,
  apiKeyEnv: string,
  options: {
    additionalPolicies?: AdditionalPolicyConfig[];
  } = {}
): Promise<RecordedV2Client> {
  const recorder = new Recorder(currentTest);
  await recorder.start(recorderOptions);

  return {
    client: new EventGridClient(
      assertEnvironmentVariable(endpointEnv),
      new AzureKeyCredential(assertEnvironmentVariable(apiKeyEnv)),
      recorder.configureClientOptions({
        additionalPolicies: options.additionalPolicies,
      })
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
