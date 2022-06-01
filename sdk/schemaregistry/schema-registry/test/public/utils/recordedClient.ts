// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTestCredential } from "@azure-tools/test-credential";
import { SchemaRegistryClient } from "../../../src";
import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "azuretenantid",
    SCHEMA_REGISTRY_ENDPOINT: "https://endpoint",
    SCHEMA_REGISTRY_GROUP: "group-1",
  },
};

export function createRecordedClient(recorder: Recorder): SchemaRegistryClient {
  const credential = createTestCredential();
  const client = new SchemaRegistryClient(
    assertEnvironmentVariable("SCHEMA_REGISTRY_ENDPOINT"),
    credential,
    recorder.configureClientOptions({})
  );
  return client;
}
