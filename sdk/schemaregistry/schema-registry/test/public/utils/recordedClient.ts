// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTestCredential } from "@azure-tools/test-credential";
import { SchemaRegistryClient } from "../../../src";
import { Recorder, RecorderStartOptions, env } from "@azure-tools/test-recorder-new";

export const startOptions: RecorderStartOptions = {
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
  if (!env.SCHEMA_REGISTRY_ENDPOINT) throw new Error("SCHEMA_REGISTRY_ENDPOINT is not defined");
  const client = new SchemaRegistryClient(env.SCHEMA_REGISTRY_ENDPOINT, credential);
  recorder.configureClient(client["client"]);
  return client;
}
