// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { SchemaRegistryClient } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "azuretenantid",
    SCHEMA_REGISTRY_ENDPOINT: "https://endpoint",
    SCHEMA_REGISTRY_GROUP: "group-1",
  },
};

export type Format = "Avro" | "json" | "custom";

function getFQNSVarName(format: Format): string {
  return `SCHEMAREGISTRY_${format.toUpperCase()}_FULLY_QUALIFIED_NAMESPACE`;
}

export function createRecordedClient(inputs: {
  recorder: Recorder;
  format: Format;
}): SchemaRegistryClient {
  const { format, recorder } = inputs;
  const credential = createTestCredential();
  const client = new SchemaRegistryClient(
    assertEnvironmentVariable(getFQNSVarName(format)),
    credential,
    recorder.configureClientOptions({})
  );
  return client;
}
