// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { SchemaRegistryClient } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";

export type Format = "Avro" | "json" | "custom";

function getFQNSVarName(format: Format): string {
  return `SCHEMAREGISTRY_${format.toUpperCase()}_FULLY_QUALIFIED_NAMESPACE`;
}

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "azuretenantid",
    [getFQNSVarName("Avro")]: "https://endpoint",
    [getFQNSVarName("json")]: "https://endpoint",
    [getFQNSVarName("custom")]: "https://endpoint",
    SCHEMA_REGISTRY_GROUP: "group-1",
  },
};

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
