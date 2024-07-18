// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import "./env";
import { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import importedCreateClient, { ImageAnalysisClient } from "../../../src/index";

export async function createClient(recorder: Recorder, credential: AzureKeyCredential | TokenCredential): Promise<ImageAnalysisClient> {
  const endpoint = assertEnvironmentVariable("VISION_ENDPOINT");
  return importedCreateClient(endpoint, credential, recorder.configureClientOptions({}));
}
