// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import ServiceFabric, { ServiceFabricLike } from "../../../src";
// import { promises as fs } from "fs";
// import { DefaultAzureCredential } from "@azure/identity";
import { Recorder } from "@azure-tools/test-recorder";

const replaceableVariables: { [k: string]: string } = {
  SERVICE_FABRIC_ENDPOINT: "endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

export async function createClient(recorder: Recorder): Promise<ServiceFabricLike> {
  await recorder.start({ envSetupForPlayback: replaceableVariables });
  return ServiceFabric(
    "http://host.docker.internal:19080",
    recorder.configureClientOptions({
      retryOptions: { maxRetries: 0, maxRetryDelayInMs: 100 },
      allowInsecureConnection: true,
    })
  );
}
