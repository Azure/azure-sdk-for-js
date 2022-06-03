// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure-tools/test-recorder";
import ServiceFabric, { ServiceFabricClient } from "../../../src";

const replaceableVariables: { [k: string]: string } = {
  SERVICE_FABRIC_ENDPOINT: "http://host.docker.internal:19080",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

export async function createClient(recorder: Recorder): Promise<ServiceFabricClient> {
  await recorder.start({ envSetupForPlayback: replaceableVariables });
  return ServiceFabric(
    env.SERVICE_FABRIC_ENDPOINT ?? "",
    recorder.configureClientOptions({
      retryOptions: { maxRetries: 0, maxRetryDelayInMs: 100 },
      allowInsecureConnection: true,
    })
  );
}
