// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  Recorder,
  RecorderStartOptions,
  assertEnvironmentVariable,
} from "@azure-tools/test-recorder";
import { KnownSchemaFormats, SchemaRegistryClient } from "../../../src";
import { createTestCredential } from "@azure-tools/test-credential";

export type Format = keyof typeof KnownSchemaFormats;

function getFQNSVarName(format: Format): string {
  return `SCHEMAREGISTRY_${format.toUpperCase()}_FULLY_QUALIFIED_NAMESPACE`;
}

export const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: {
    AZURE_CLIENT_ID: "azure_client_id",
    AZURE_CLIENT_SECRET: "azure_client_secret",
    AZURE_TENANT_ID: "azuretenantid",
    [getFQNSVarName(KnownSchemaFormats.Avro)]: "https://endpoint",
    [getFQNSVarName(KnownSchemaFormats.Json)]: "https://endpoint",
    [getFQNSVarName(KnownSchemaFormats.Custom)]: "https://endpoint",
    SCHEMA_REGISTRY_GROUP: "group-1",
  },
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK4001", // uri name is not a secret and is replaced using envSetupForPlayback
  ],
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
    recorder.configureClientOptions({}),
  );
  return client;
}
