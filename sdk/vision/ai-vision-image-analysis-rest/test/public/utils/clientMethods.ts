// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import "./env";
import type { AzureKeyCredential, TokenCredential } from "@azure/core-auth";
import type { ImageAnalysisClient } from "../../../src/index";
import importedCreateClient from "../../../src/index";

export async function createClient(
  recorder: Recorder,
  credential: AzureKeyCredential | TokenCredential,
): Promise<ImageAnalysisClient> {
  const endpoint = assertEnvironmentVariable("VISION_ENDPOINT");
  return importedCreateClient(endpoint, credential, recorder.configureClientOptions({}));
}
