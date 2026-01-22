// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "../../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { EnvironmentVariableNames, assertEnvironmentVariable } from "./envVars.js";
import type { Recorder } from "@azure-tools/test-recorder";
import type { PlanetaryComputerProClientOptionalParams } from "../../../src/api/index.js";

export interface TestContext {
  client: PlanetaryComputerProClient;
  endpoint: string;
  collectionId: string;
  itemId: string;
}

/**
 * Creates a test client with recorder support
 * @param recorder - The test recorder instance
 * @param options - Optional client configuration
 * @returns A configured PlanetaryComputerProClient
 */
export function createTestClient(
  recorder: Recorder,
  options?: PlanetaryComputerProClientOptionalParams,
): PlanetaryComputerProClient {
  const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
  const credential = createTestCredential();

  // Wrap the options with recorder configuration to enable recording
  const clientOptions = recorder.configureClientOptions(options || {});

  // For DPG clients, we pass the credential directly
  return new PlanetaryComputerProClient(endpoint, credential, clientOptions);
}

export function getTestContext(recorder: Recorder): TestContext {
  const endpoint = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ENDPOINT);
  const collectionId = assertEnvironmentVariable(
    EnvironmentVariableNames.PLANETARYCOMPUTER_COLLECTION_ID,
  );
  const itemId = assertEnvironmentVariable(EnvironmentVariableNames.PLANETARYCOMPUTER_ITEM_ID);

  return {
    client: createTestClient(recorder),
    endpoint,
    collectionId,
    itemId,
  };
}
