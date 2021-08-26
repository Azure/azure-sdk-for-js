// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import * as dotenv from "dotenv";

import { env, Recorder, record, RecorderEnvironmentSetup } from "@azure-tools/test-recorder";
import { isNode } from "./testUtils";

import { EventGridPublisherClient, InputSchema } from "../../../src";
import { KeyCredential } from "@azure/core-auth";

if (isNode) {
  dotenv.config();
}

export interface RecordedClient<T extends InputSchema> {
  client: EventGridPublisherClient<T>;
  recorder: Recorder;
}

const replaceableVariables: { [k: string]: string } = {
  EVENT_GRID_EVENT_GRID_SCHEMA_API_KEY: "api_key",
  EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT: "https://endpoint/api/events",
  EVENT_GRID_CLOUD_EVENT_SCHEMA_API_KEY: "api_key",
  EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT: "https://endpoint/api/events",
  EVENT_GRID_CUSTOM_SCHEMA_API_KEY: "api_key",
  EVENT_GRID_CUSTOM_SCHEMA_ENDPOINT: "https://endpoint/api/events"
};

export const testEnv = new Proxy(replaceableVariables, {
  get: (target, key: string) => {
    return env[key] || target[key];
  }
});

export const environmentSetup: RecorderEnvironmentSetup = {
  replaceableVariables,
  customizationsOnRecordings: [
    (recording: string): string =>
      recording.replace(/"aeg-sas-key"\s?:\s?"[^"]*"/g, `"aeg-sas-key":"aeg-sas-key"`),
    (recording: string): string =>
      recording.replace(/"aeg-sas-token"\s?:\s?"[^"]*"/g, `"aeg-sas-token":"aeg-sas-token"`),
    // If we put EVENT_GRID_EVENT_GRID_SCHEMA_ENDPOINT (or similar) in replaceableVariables above,
    // it will not capture the endpoint string used with nock, which will be expanded to
    // https://<endpoint>:443/ and therefore will not match, so we have to do
    // this instead.
    (recording: string): string => {
      const replaced = recording.replace("endpoint:443", "endpoint");
      return replaced;
    }
  ],
  queryParametersToSkip: []
};

export function createRecordedClient<T extends InputSchema>(
  context: Context,
  endpoint: string,
  eventSchema: T,
  credential: KeyCredential
): RecordedClient<T> {
  const recorder = record(context, environmentSetup);

  return {
    client: new EventGridPublisherClient(endpoint, eventSchema, credential),
    recorder
  };
}
