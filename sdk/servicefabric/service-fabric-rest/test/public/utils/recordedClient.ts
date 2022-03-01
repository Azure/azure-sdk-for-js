// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "./env";

import ServiceFabric, { ServiceFabricLike } from "../../../src";

import { Recorder } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";

const replaceableVariables: { [k: string]: string } = {
  ENDPOINT: "endpoint",
  AZURE_CLIENT_ID: "azure_client_id",
  AZURE_CLIENT_SECRET: "azure_client_secret",
  AZURE_TENANT_ID: "88888888-8888-8888-8888-888888888888",
};

export async function createClient(recorder: Recorder): Promise<ServiceFabricLike> {
  await recorder.start({ envSetupForPlayback: replaceableVariables });
  const credential = createTestCredential();
  return ServiceFabric(credential, recorder.configureClientOptions({}));
}
