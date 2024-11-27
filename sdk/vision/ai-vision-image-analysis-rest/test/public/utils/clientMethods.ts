// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import "./env.js";
import type { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import type { ImageAnalysisClient } from "../../../src/index.js";
import importedCreateClient from "../../../src/index.js";

export async function createClient(
  recorder: Recorder,
  credential: AzureKeyCredential | TokenCredential,
): Promise<ImageAnalysisClient> {
  const endpoint = assertEnvironmentVariable("VISION_ENDPOINT");
  return importedCreateClient(endpoint, credential, recorder.configureClientOptions({}));
}
