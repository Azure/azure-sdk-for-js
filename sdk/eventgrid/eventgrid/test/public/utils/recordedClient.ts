// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Test } from "mocha";

import {
  assertEnvironmentVariable,
  Recorder,
  RecorderStartOptions,
} from "@azure-tools/test-recorder";

import { EventGridPublisherClient, InputSchema } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";
import { AdditionalPolicyConfig } from "@azure/core-client";
import { FindReplaceSanitizer } from "@azure-tools/test-recorder/types/src/utils/utils";

export interface RecordedClient<T extends InputSchema> {
  client: EventGridPublisherClient<T>;
  recorder: Recorder;
}

const envSetupForPlayback: { [k: string]: string } = {
  EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT: "https://endpoint/api/events",
  EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT: "https://endpoint/api/events",
  EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT: "https://endpoint/api/events",
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
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
    "AZSDK4001",
  ],
};

export async function createRecordedClient<T extends InputSchema>(
  currentTest: Test | undefined,
  endpointEnv: string,
  eventSchema: T,
  options: {
    removeApiEventsSuffixBool?: boolean;
    additionalPolicies?: AdditionalPolicyConfig[];
  } = {},
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
      createTestCredential(),
      recorder.configureClientOptions({
        additionalPolicies: options.additionalPolicies,
      }),
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
